import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  errorMessage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isSubmitDisabled = !email.trim() || !password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
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
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
