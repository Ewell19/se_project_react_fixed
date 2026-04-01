import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );
  return (
    <label className="toggle-switch" aria-label="Toggle temperature unit">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span
        className={`toggle-switch__label toggle-switch__label_f ${
          currentTemperatureUnit === "F" ? "toggle-switch__label_active" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__label toggle-switch__label_c ${
          currentTemperatureUnit === "C" ? "toggle-switch__label_active" : ""
        }`}
      >
        C
      </span>
      <span className="toggle-switch__circle" />
    </label>
  );
}

export default ToggleSwitch;
