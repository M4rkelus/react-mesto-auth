import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";

import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {
  // Popup states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  // Card states
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  // User data states
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  // Authorization states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);

  const infoTooltipMessage = isSucceeded
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  const navigate = useNavigate();

  // Handlers
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleRemovePlaceClick = () => setIsRemovePlacePopupOpen(true);
  const handleImageClick = (data) => setSelectedCard({ isOpen: true, ...data });

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRemovePlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ isOpen: false });
  };

  const handleUpdateUser = (data) =>
    api
      .editUserData(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.error(`Что-то пошло не так: (${err})`));

  const handleUpdateAvatar = (data) =>
    api
      .editUserAvatar(data.avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((err) => console.error(`Что-то пошло не так: (${err})`));

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        )
      )
      .catch((err) => console.error(`Что-то пошло не так: (${err})`));
  };

  const handleCardDelete = (card) =>
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.error(`Что-то пошло не так: (${err})`));

  const handleAddPlaceSubmit = (card) =>
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Что-то пошло не так: (${err})`));

  // Authorization submit handlers
  const handleRegisterSubmit = (email, password) =>
    auth
      .register(email, password)
      .then(() => {
        setIsSucceeded(true);
        setIsInfoTooltipPopupOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSucceeded(false);
        setIsInfoTooltipPopupOpen(true);
        console.error(`Некорректно заполнено одно из полей: (${err})`);
      });

  const handleLoginSubmit = (email, password) =>
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUserEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setIsSucceeded(false);
        setIsInfoTooltipPopupOpen(true);
        console.error(`Пользователь с email не найден : (${err})`);
      });

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUserEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => console.error(`Токен не соответствует: (${err})`));
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([user, initialCards]) => {
          setCurrentUser(user);
          setCards(initialCards);
        })
        .catch((err) => console.error(`Что-то пошло не так: (${err})`));
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            email={currentUserEmail}
            onSignOut={handleSignOut}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
              <Route
                exact
                path="/"
                element={
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onRemovePlace={handleRemovePlaceClick}
                    onCardImage={handleImageClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                }
              />
            </Route>
            <Route
              exact
              path="/sign-up"
              element={<Register onRegister={handleRegisterSubmit} />}
            />
            <Route
              exact
              path="/sign-in"
              element={<Login onLogin={handleLoginSubmit} />}
            />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="delete-confirm"
            title="Вы уверены?"
            isOpen={isRemovePlacePopupOpen}
            onClose={closeAllPopups}
            buttonText="Да"
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSucceeded={isSucceeded}
            message={infoTooltipMessage}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
