import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  items,
  onCardClick,
  onCardLike,
  onShowDeleteConfirm,
  onEditProfile,
  onSignOut,
  isLoggedIn,
  onAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const profileItems = items.filter((item) => {
    const owner = typeof item.owner === "object" ? item.owner?._id : item.owner;
    return owner === currentUser?._id;
  });

  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      <ClothesSection
        items={profileItems}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onShowDeleteConfirm={onShowDeleteConfirm}
        isLoggedIn={isLoggedIn}
        onAddClick={onAddClick}
      />
    </main>
  );
}

export default Profile;
