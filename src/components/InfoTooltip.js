import React from "react";

const InfoTooltip = ({ isOpen, onClose, isSucceeded, message }) => {
  return (
    <div className={`popup popup_tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__info">
        <div
          className={`popup__tooltip-img ${
            isSucceeded
              ? "popup__tooltip-img_success"
              : "popup__tooltip-img_failure"
          }`}
        ></div>
        <p className="popup__tooltip-message">{message}</p>
        <button
          onClick={onClose}
          className="popup__close-btn"
          type="button"
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
