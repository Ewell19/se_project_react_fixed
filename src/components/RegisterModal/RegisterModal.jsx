import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultAvatarUrl, presetAvatarUrls } from "../../utils/constants";
import useForm from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
  errorMessage,
}) {
  const { values, handleChange, resetForm, setValue } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: defaultAvatarUrl,
  });
  const isSubmitDisabled =
    !values.email.trim() ||
    !values.password.trim() ||
    !values.name.trim() ||
    values.password.length < 6;

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      avatar: values.avatar.trim() || defaultAvatarUrl,
      email: values.email,
      password: values.password,
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
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          id="register-password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          minLength="6"
          required
        />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          id="register-name"
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
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
          name="avatar"
          className="modal__input"
          placeholder="https://..."
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

export default RegisterModal;
