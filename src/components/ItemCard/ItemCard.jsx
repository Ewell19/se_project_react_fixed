import "./ItemCard.css";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({
  item,
  onCardClick,
  onCardLike,
  onShowDeleteConfirm,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [imageError, setImageError] = useState(false);

  const owner = typeof item.owner === "object" ? item.owner?._id : item.owner;
  const isOwn = owner === currentUser?._id;

  const isLiked = item.likes?.some((id) => {
    const likedId = typeof id === "object" ? id?._id : id;
    return likedId === currentUser?._id;
  });

  const shouldShowActiveLike = Boolean(isLiked) && isLoggedIn;

  const itemLikeButtonClassName = `card__like-button ${
    shouldShowActiveLike ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      return;
    }

    onCardLike({ id: item._id, isLiked: Boolean(isLiked) });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    if (!onShowDeleteConfirm) {
      return;
    }

    onShowDeleteConfirm(item._id);
  };

  const imageSrc = item.link || item.imageUrl;

  return (
    <li className={`card`}>
      <div className="card__top-row">
        <h2 className="card__name">{item.name}</h2>
        <div className="card__actions">
          {isOwn && onShowDeleteConfirm && (
            <button
              type="button"
              className="card__delete-button"
              onClick={handleDelete}
              aria-label="delete"
            />
          )}
          {isLoggedIn && (
            <button
              type="button"
              className={itemLikeButtonClassName}
              onClick={handleLike}
              aria-label="like"
              aria-pressed={shouldShowActiveLike}
            />
          )}
        </div>
      </div>
      {imageError ? (
        <div className="card__image-error" onClick={handleCardClick}>
          Image not found
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={item.name}
          className="card__image"
          onClick={handleCardClick}
          onError={handleImageError}
        />
      )}
    </li>
  );
}

export default ItemCard;
