import "./DeleteConfirmModal.css";

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  errorMessage,
}) {
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div
        className="modal__content modal__content_type_confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          disabled={isLoading}
        ></button>
        <h2 className="confirm-modal__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="confirm-modal__subtitle">This action is irreversible.</p>
        {errorMessage && <p className="confirm-modal__error">{errorMessage}</p>}
        <div className="confirm-modal__actions">
          <button
            type="button"
            className="confirm-modal__confirm-btn"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            disabled={isLoading}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="confirm-modal__cancel-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
