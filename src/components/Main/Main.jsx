import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  const weatherType = weatherData?.weather || "cold";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData?.temperature ?? "--"}°F / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter(
              (item) => item.weather.toLowerCase() === weatherType.toLowerCase()
            )
            .map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
