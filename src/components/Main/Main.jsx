import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({
  weatherData,
  clothingItems,
  onCardClick,
  onCardLike,
  onShowDeleteConfirm,
  isLoggedIn,
  isUsingStarterItems,
  currentTemperatureUnit,
}) {
  const weatherType = weatherData?.weather || "cold";

  const getTempFallbackType = () => {
    const temp = weatherData?.temperature;

    if (typeof temp !== "number") {
      return "cold";
    }

    if (temp >= 86) {
      return "hot";
    }

    if (temp >= 66) {
      return "warm";
    }

    return "cold";
  };

  const cardsForCurrentWeather = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType.toLowerCase(),
  );

  const filteredCards =
    cardsForCurrentWeather.length > 0
      ? cardsForCurrentWeather
      : clothingItems.filter(
          (item) =>
            item.weather.toLowerCase() === getTempFallbackType().toLowerCase(),
        );

  const isUsingWeatherFallback = cardsForCurrentWeather.length === 0;
  const temperatureInFahrenheit = weatherData?.temperature;
  const displayedTemperature =
    typeof temperatureInFahrenheit === "number"
      ? currentTemperatureUnit === "F"
        ? temperatureInFahrenheit
        : Math.round(((temperatureInFahrenheit - 32) * 5) / 9)
      : "--";

  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />
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
        {isUsingWeatherFallback && (
          <p className="cards__note">
            No exact matches for this weather type yet. Showing
            temperature-based options.
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
