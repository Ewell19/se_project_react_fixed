import "./ItemCard.css";
import { useState } from "react";

function ItemCard({ item, onCardClick }) {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {imageError ? (
        <div className="card__image-error" onClick={handleCardClick}>
          Image not found
        </div>
      ) : (
        <img
          src={item.link}
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
