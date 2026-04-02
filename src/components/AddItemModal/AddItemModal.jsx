import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const weatherOptions = ["hot", "warm", "cold"];

function AddItemModal({ isOpen, onClose, onAddItem, errorMessage }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({
      name: values.name,
      link: values.imageUrl.trim(),
      weather: values.weather,
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
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
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
          name="imageUrl"
          className="modal__input"
          placeholder="https://..."
          value={values.imageUrl}
          onChange={handleChange}
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
              checked={values.weather === option}
              onChange={handleChange}
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
