import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardImage,
  onCardLike,
  onCardDelete,
  cards,
}) => {
  const {
    name: userName,
    about: userDescription,
    avatar: userAvatar,
  } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-btn"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar-img" src={userAvatar} alt="Ава" />
        </button>
        <div className="profile__info">
          <button
            className="profile__edit-btn"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements" aria-label="Галерея">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardImage={onCardImage}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
