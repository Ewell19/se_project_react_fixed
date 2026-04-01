import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  const userName = "Adam Ewell";

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <img src={avatar} alt={userName} className="sidebar__avatar" />
        <h2 className="sidebar__name">{userName}</h2>
      </div>
    </aside>
  );
}

export default SideBar;
