import { apiKey, latitude, longitude } from "./constants";

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

export const getWeather = () => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  return fetch(weatherApi)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      return parseWeatherData(data);
    });
};

const parseWeatherData = (data) => {
  const temperature = Math.round(data.main.temp);
  const weather = getWeatherCondition(temperature);
  const city = data.name;

  // Determine if it's day or night based on sunrise/sunset times
  const currentTime = Date.now() / 1000;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const isDay = currentTime >= sunrise && currentTime < sunset;

  return {
    temperature,
    weather,
    city,
    isDay,
  };
};
