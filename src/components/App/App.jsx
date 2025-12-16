import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = (formData) => {
    const newItem = {
      _id: clothingItems.length + 1,
      name: formData.name,
      link: formData.link,
      weather: formData.weather,
    };
    setClothingItems([...clothingItems, newItem]);
  };

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        // Set default weather data if API fails
        setWeatherData({
          temperature: 75,
          weather: "warm",
          city: "Location",
        });
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header onAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        onSubmit={handleAddItem}
      ></ModalWithForm>
      <ItemModal
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
