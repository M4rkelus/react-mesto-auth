const ImagePopup = ({ onClose, card }) => {
  return (
    <div className={`popup popup_preview ${card.isOpen && "popup_opened"}`}>
      <div className="popup__wrapper">
        <figure className="popup__figure">
          <img className="popup__img" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button
          onClick={onClose}
          className="popup__close-btn"
          type="button"
        ></button>
      </div>
    </div>
  );
};

export default ImagePopup;
