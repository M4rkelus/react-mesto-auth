import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [values, setValues] = useState({});
  const currentUser = useContext(CurrentUserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  };

  useEffect(() => {
    setValues({ name: currentUser.name, description: currentUser.about });
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
        value={values.name ?? ""}
        onChange={handleChange}
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
        value={values.description ?? ""}
        onChange={handleChange}
        id="job-input"
        className="popup__field popup__field_value_job"
        type="text"
        name="description"
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
