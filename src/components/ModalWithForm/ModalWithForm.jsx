import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  name,
  isOpen,
  onClose,
  onSubmit,
  errorMessage,
  switchText,
  onSwitch,
  isSubmitDisabled = false,
}) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("modal-open");

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
    onSubmit(e);
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
          {children}
          {errorMessage && <p className="modal__error">{errorMessage}</p>}
          <div className="modal__footer">
            <button
              className="modal__submit"
              type="submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            {onSwitch && switchText && (
              <button
                type="button"
                className="modal__switch-button"
                onClick={onSwitch}
              >
                {switchText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
