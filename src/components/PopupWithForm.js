const PopupWithForm = ({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
}) => {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_${name}`}
          name={`${name}-form`}
        >
          {children}
          <input
            className="popup__save-btn"
            type="submit"
            name="submit"
            value={buttonText}
          />
        </form>
        <button
          onClick={onClose}
          className="popup__close-btn popup__close-btn_profile"
          type="button"
        ></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
