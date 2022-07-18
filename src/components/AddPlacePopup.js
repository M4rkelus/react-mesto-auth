import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link });
  };

  useEffect(() => {
    setName("");
    setLink("");
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
        value={name ?? ""}
        onChange={handleNameChange}
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
        value={link ?? ""}
        onChange={handleLinkChange}
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
