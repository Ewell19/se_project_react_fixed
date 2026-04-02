import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { defaultAvatarUrl, presetAvatarUrls } from "../../utils/constants";
import useForm from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onUpdateProfile, errorMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, setValue } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || defaultAvatarUrl,
      });
    }
  }, [currentUser, isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      name: values.name,
      avatar: values.avatar.trim() || defaultAvatarUrl,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name
        <input
          id="edit-name"
          type="text"
          name="name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label htmlFor="edit-avatar" className="modal__label">
        Personal photo URL
        <input
          id="edit-avatar"
          type="url"
          name="avatar"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      <button
        type="button"
        className="modal__avatar-default-btn"
        onClick={() => setValue("avatar", defaultAvatarUrl)}
      >
        Use default weather avatar
      </button>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Or choose a weather avatar</legend>
        <div className="modal__avatar-options">
          {presetAvatarUrls.map((url) => (
            <button
              key={url}
              type="button"
              className={`modal__avatar-option ${
                values.avatar === url ? "modal__avatar-option_selected" : ""
              }`}
              onClick={() => setValue("avatar", url)}
              aria-label="Choose avatar"
            >
              <img
                src={url}
                alt="Avatar option"
                className="modal__avatar-image"
              />
            </button>
          ))}
        </div>
      </fieldset>

      {values.avatar && (
        <div className="modal__avatar-preview">
          <span className="modal__avatar-preview-label">Preview</span>
          <img
            src={values.avatar}
            alt="Selected avatar"
            className="modal__avatar-preview-image"
          />
        </div>
      )}
    </ModalWithForm>
  );
}

export default EditProfileModal;
