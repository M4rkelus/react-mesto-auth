import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name: values.name, link: values.link });
  };

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        value={values.name ?? ""}
        onChange={handleChange}
        id="card-name-input"
        className="popup__field popup__field_value_card-name"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error card-name-input-error"></span>
      <input
        value={values.link ?? ""}
        onChange={handleChange}
        id="link-input"
        className="popup__field popup__field_value_card-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
