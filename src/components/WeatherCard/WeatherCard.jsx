import "./WeatherCard.css";

function WeatherCard({ weatherData, currentTemperatureUnit }) {
  const temperatureInFahrenheit = weatherData?.temperature;
  const displayedTemperature =
    typeof temperatureInFahrenheit === "number"
      ? currentTemperatureUnit === "F"
        ? temperatureInFahrenheit
        : Math.round(((temperatureInFahrenheit - 32) * 5) / 9)
      : "--";

  const getWeatherClassName = () => {
    if (!weatherData) return "";

    const { weather, isDay } = weatherData;
    const timeOfDay = isDay ? "day" : "night";

    // Map weather conditions to background images/styles
    const weatherTypes = {
      hot: "sunny",
      warm: "cloudy",
      cold: "snowy",
    };

    return `weather-card_type_${weatherTypes[weather]}_${timeOfDay}`;
  };

  return (
    <section className={`weather-card ${getWeatherClassName()}`}>
      <p className="weather-card__temp">
        {displayedTemperature}°{currentTemperatureUnit}
      </p>
      <p className="weather-card__condition">
        {weatherData?.weather &&
          weatherData.weather.charAt(0).toUpperCase() +
            weatherData.weather.slice(1)}
        {weatherData?.isDay !== undefined &&
          ` • ${weatherData.isDay ? "Day" : "Night"}`}
      </p>
    </section>
  );
}

export default WeatherCard;
