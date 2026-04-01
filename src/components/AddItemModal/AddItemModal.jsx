import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const weatherOptions = ["hot", "warm", "cold"];

function AddItemModal({ isOpen, onClose, onAddItem, errorMessage }) {
  const [itemName, setItemName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItem({
      name: itemName,
      link: imageUrl.trim(),
      weather,
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      <label htmlFor="item-name" className="modal__label">
        Item name
        <input
          id="item-name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          minLength="1"
          maxLength="30"
          required
        />
      </label>

      <label htmlFor="image-url" className="modal__label">
        Image URL
        <input
          id="image-url"
          type="url"
          className="modal__input"
          placeholder="https://..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select weather type:</legend>
        {weatherOptions.map((option) => (
          <label key={option} className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value={option}
              checked={weather === option}
              onChange={(e) => setWeather(e.target.value)}
              className="modal__radio-input"
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
