import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { defaultAvatarUrl, presetAvatarUrls } from "../../utils/constants";

function EditProfileModal({ isOpen, onClose, onUpdateProfile, errorMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || defaultAvatarUrl);
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar: avatar.trim() || defaultAvatarUrl });
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
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>

      <button
        type="button"
        className="modal__avatar-default-btn"
        onClick={() => setAvatar(defaultAvatarUrl)}
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
                avatar === url ? "modal__avatar-option_selected" : ""
              }`}
              onClick={() => setAvatar(url)}
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

      {avatar && (
        <div className="modal__avatar-preview">
          <span className="modal__avatar-preview-label">Preview</span>
          <img
            src={avatar}
            alt="Selected avatar"
            className="modal__avatar-preview-image"
          />
        </div>
      )}
    </ModalWithForm>
  );
}

export default EditProfileModal;
