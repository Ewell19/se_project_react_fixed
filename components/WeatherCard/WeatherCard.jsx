import TShirt from "../../src/assets/T-shirt.svg";
import Shorts from "../../src/assets/Shorts.svg";
import Cap from "../../src/assets/Cap.svg";
import Sneakers from "../../src/assets/Sneakers.svg";

function WeatherCard() {
  return (
    <section className="card">
      <p className="card__text">Today is 75° F / You may want to wear:</p>
      <img src={TShirt} alt="T-shirt" className="WeatherCard__image" />
      <img src={Shorts} alt="Shorts" className="WeatherCard__image" />
      <img src={Cap} alt="Cap" className="WeatherCard__image" />
      <img src={Sneakers} alt="Sneakers" className="WeatherCard__image" />
    </section>
  );
}
export default WeatherCard;
