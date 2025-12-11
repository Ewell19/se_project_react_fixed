import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ onAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Loading..."}
      </p>
      <button className="header__add-clothes-btn" onClick={onAddClick}>
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__user-name">Adam Ewell</p>
        <img src={avatar} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
