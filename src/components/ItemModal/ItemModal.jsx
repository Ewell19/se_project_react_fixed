import { useContext, useEffect } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onShowDeleteConfirm }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!card) return null;

  const owner = typeof card.owner === "object" ? card.owner?._id : card.owner;
  const isOwn = owner === currentUser?._id;
  const imageSrc = card.link || card.imageUrl;
  const isStarterImage =
    typeof imageSrc === "string" && imageSrc.includes("practicum-content.s3");

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close modal__close_type_preview"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__image-wrapper">
          <img
            src={imageSrc}
            alt={card.name}
            className={`modal__image ${
              isStarterImage ? "modal__image_type_starter" : ""
            }`}
          />
        </div>
        <div className="modal__details">
          <div className="modal__text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={() => onShowDeleteConfirm(card._id)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
