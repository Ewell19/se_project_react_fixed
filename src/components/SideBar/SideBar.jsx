import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const firstLetter = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <aside className="profile__sidebar sidebar">
      <div className="profile__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser?.name || "User avatar"}
            className="profile__avatar"
          />
        ) : (
          <div className="profile__avatar-placeholder">{firstLetter}</div>
        )}
        <h2 className="profile__name">{currentUser?.name || "User"}</h2>
      </div>

      <button className="profile__button" type="button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="profile__button" type="button" onClick={onSignOut}>
        Sign out
      </button>
    </aside>
  );
}

export default SideBar;
