import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({
  weatherData,
  clothingItems,
  onCardClick,
  onCardLike,
  onShowDeleteConfirm,
  isLoggedIn,
  isUsingStarterItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredCards = clothingItems;
  const temperatureInFahrenheit = weatherData?.temperature;
  const displayedTemperature =
    typeof temperatureInFahrenheit === "number"
      ? currentTemperatureUnit === "F"
        ? temperatureInFahrenheit
        : Math.round(((temperatureInFahrenheit - 32) * 5) / 9)
      : "--";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayedTemperature}°{currentTemperatureUnit} / You may
          want to wear:
        </p>
        {isUsingStarterItems && (
          <p className="cards__note">
            No items were loaded from the database yet. Showing starter clothes.
          </p>
        )}
        <ul className="cards__list">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onShowDeleteConfirm={onShowDeleteConfirm}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
