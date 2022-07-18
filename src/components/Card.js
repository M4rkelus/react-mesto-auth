import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardImage, onCardLike, onCardDelete }) => {
  const { _id: userId } = useContext(CurrentUserContext);

  const isOwn = card.owner._id === userId;
  const isLiked = card.likes.some((item) => item._id === userId);

  const cardDeleteButtonClassName = `card__delete-btn ${
    isOwn ? "card__delete-btn_visible" : "card__delete-btn_hidden"
  }`;
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked && "card__like-btn_active"
  }`;

  const handleImageClick = () => onCardImage(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <article className="card">
      <img
        onClick={handleImageClick}
        className="card__img"
        src={card.link}
        alt={card.name}
      />
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
      ></button>
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-grp">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Мне это любо"
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;
