import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
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
      <p className="weather-card__temp">{weatherData?.temperature}°F</p>
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
