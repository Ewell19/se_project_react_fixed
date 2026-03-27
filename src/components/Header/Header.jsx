import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  onAddClick,
  onLoginClick,
  onRegisterClick,
  weatherData,
  isLoggedIn,
  currentTemperatureUnit,
  onToggleSwitchChange,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const firstLetter = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Loading..."}
      </p>
      <div className="header__toggle-wrapper">
        <ToggleSwitch
          currentTemperatureUnit={currentTemperatureUnit}
          onToggleSwitchChange={onToggleSwitchChange}
        />
      </div>

      {isLoggedIn ? (
        <>
          <button className="header__add-clothes-btn" onClick={onAddClick}>
            + Add Clothes
          </button>
          <Link to="/profile" className="header__user-container">
            <p className="header__user-name">{currentUser?.name || "User"}</p>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser?.name || "Avatar"}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">{firstLetter}</div>
            )}
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            className="header__auth-btn"
            type="button"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
          <button
            className="header__auth-btn"
            type="button"
            onClick={onLoginClick}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
