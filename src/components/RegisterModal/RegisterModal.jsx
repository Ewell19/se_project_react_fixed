import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultAvatarUrl, presetAvatarUrls } from "../../utils/constants";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
  errorMessage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatarUrl);
  const isSubmitDisabled =
    !email.trim() || !password.trim() || !name.trim() || password.length < 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name,
      avatar: avatar.trim() || defaultAvatarUrl,
      email,
      password,
    });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      switchText="or Log in"
      onSwitch={onSwitchToLogin}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          id="register-email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          id="register-password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          id="register-name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
        <input
          id="register-avatar"
          type="url"
          className="modal__input"
          placeholder="https://..."
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

export default RegisterModal;
