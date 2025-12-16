import { useEffect, useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  name,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [itemName, setItemName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");

  useEffect(() => {
    if (!isOpen) return;

    // Lock background scroll
    document.body.classList.add("modal-open");

    // Focus first interactive element
    const closeBtn = document.querySelector(".modal__close");
    closeBtn?.focus();

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim whitespace from URL
    const trimmedUrl = imageUrl.trim();

    // Validate URL format
    try {
      new URL(trimmedUrl);
    } catch {
      alert("Please enter a valid URL (starting with http:// or https://)");
      return;
    }

    const formData = {
      name: itemName,
      link: trimmedUrl,
      weather: weather,
    };
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form
    setItemName("");
    setImageUrl("");
    setWeather("hot");
    onClose();
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form" name={name} onSubmit={handleSubmit}>
          <div className="modal__input-group">
            <label htmlFor="item-name" className="modal__label">
              Item name
            </label>
            <input
              id="item-name"
              type="text"
              className="modal__input"
              placeholder="Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="modal__input-group">
            <label htmlFor="image-url" className="modal__label">
              Image URL
            </label>
            <input
              id="image-url"
              type="url"
              className="modal__input"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select weather</legend>
            <div className="modal__radio-group">
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  checked={weather === "hot"}
                  onChange={(e) => setWeather(e.target.value)}
                  className="modal__radio-input"
                />
                Hot
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  checked={weather === "warm"}
                  onChange={(e) => setWeather(e.target.value)}
                  className="modal__radio-input"
                />
                Warm
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  checked={weather === "cold"}
                  onChange={(e) => setWeather(e.target.value)}
                  className="modal__radio-input"
                />
                Cold
              </label>
            </div>
          </fieldset>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
