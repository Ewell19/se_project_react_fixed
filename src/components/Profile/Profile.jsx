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
  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      <ClothesSection
        items={items}
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
