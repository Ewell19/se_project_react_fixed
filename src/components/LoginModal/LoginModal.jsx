import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  errorMessage,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const isSubmitDisabled = !values.email.trim() || !values.password.trim();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      switchText="or Sign Up"
      onSwitch={onSwitchToRegister}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
