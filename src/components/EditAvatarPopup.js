import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({ avatar: avatarRef.current.value });
  };

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        ref={avatarRef}
        id="avatar-link"
        className="popup__field popup__field_avatar-link"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error avatar-link-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
