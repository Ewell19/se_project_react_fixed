import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { defaultClothingItems } from "../../utils/clothingItems";
import api from "../../utils/api";
import { authorize, checkToken, register } from "../../utils/auth";
import { getWeather } from "../../utils/weatherApi";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalError, setModalError] = useState("");
  const [isUsingStarterItems, setIsUsingStarterItems] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getErrorMessage = (err, fallbackMessage) => {
    if (err instanceof Error && err.message) {
      return err.message;
    }

    return fallbackMessage;
  };

  const handleAddClick = () => {
    setModalError("");
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setModalError("");
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setModalError("");
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setModalError("");
    setActiveModal("edit-profile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setModalError("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = (formData) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    api
      .addItem(formData, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [...prevItems, newItem]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = (id, shouldCloseModal = true) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return Promise.resolve();
    }

    return api
      .deleteItem(id, token)
      .then(() => {
        setClothingItems((items) => items.filter((item) => item._id !== id));
        if (shouldCloseModal) {
          handleCloseModal();
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const handleShowDeleteConfirm = (itemId) => {
    setActiveModal("");
    setSelectedCard(null);
    setItemIdToDelete(itemId);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!itemIdToDelete) return;

    setIsDeleting(true);
    handleDeleteItem(itemIdToDelete, false)
      .then(() => {
        setShowDeleteConfirm(false);
        setItemIdToDelete(null);
        setIsDeleting(false);
      })
      .catch(() => {
        setIsDeleting(false);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemIdToDelete(null);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    if (!isLiked) {
      api
        .addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch((err) => console.log(err));
      return;
    }

    api
      .removeCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    setModalError("");

    return authorize({ email, password })
      .then((res) => {
        if (!res.token) {
          throw new Error("No token in response");
        }

        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        setModalError(
          getErrorMessage(
            err,
            "Unable to log in. Please check your credentials.",
          ),
        );
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setModalError("");

    register({ name, avatar, email, password })
      .then(() => authorize({ email, password }))
      .then((res) => {
        if (!res.token) {
          throw new Error("No token in response");
        }

        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        setModalError(
          getErrorMessage(err, "Unable to create your account right now."),
        );
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    setModalError("");

    api
      .updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        setModalError(
          getErrorMessage(err, "Unable to update profile. Please try again."),
        );
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setWeatherData({
          temperature: 75,
          weather: "warm",
          city: "Location",
        });
      });
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((items) => {
        setClothingItems(items);
        setIsUsingStarterItems(false);
      })
      .catch((err) => {
        console.error("Error fetching clothing items:", err);
        setClothingItems(defaultClothingItems);
        setIsUsingStarterItems(true);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            onAddClick={handleAddClick}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            currentTemperatureUnit={currentTemperatureUnit}
            onToggleSwitchChange={handleToggleSwitchChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onShowDeleteConfirm={handleShowDeleteConfirm}
                  isLoggedIn={isLoggedIn}
                  isUsingStarterItems={isUsingStarterItems}
                  currentTemperatureUnit={currentTemperatureUnit}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    items={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onShowDeleteConfirm={handleShowDeleteConfirm}
                    onEditProfile={handleEditProfileClick}
                    onSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn}
                    onAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onAddItem={handleAddItem}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setModalError("");
            setActiveModal("register");
          }}
          errorMessage={modalError}
        />

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setModalError("");
            setActiveModal("login");
          }}
          errorMessage={modalError}
        />

        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={handleCloseModal}
          onUpdateProfile={handleUpdateProfile}
          errorMessage={modalError}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          card={selectedCard}
          onShowDeleteConfirm={handleShowDeleteConfirm}
        />

        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
