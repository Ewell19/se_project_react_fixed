import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
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

  const firstLetter = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="profile">
      <section className="profile__sidebar">
        <div className="profile__user">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
            />
          ) : (
            <div className="profile__avatar-placeholder">{firstLetter}</div>
          )}
          <h2 className="profile__name">{currentUser?.name}</h2>
        </div>

        <button
          className="profile__button"
          type="button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button className="profile__button" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </section>

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
