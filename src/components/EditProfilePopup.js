import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        value={name ?? ""}
        onChange={handleNameChange}
        id="name-input"
        className="popup__field popup__field_value_name"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        value={description ?? ""}
        onChange={handleDescriptionChange}
        id="job-input"
        className="popup__field popup__field_value_job"
        type="text"
        name="job"
        placeholder="Профессиональная деятельность"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
