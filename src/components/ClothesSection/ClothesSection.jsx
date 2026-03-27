import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  items,
  onCardClick,
  onCardLike,
  onShowDeleteConfirm,
  isLoggedIn,
  onAddClick,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        {onAddClick && (
          <button
            className="clothes-section__add-btn"
            type="button"
            onClick={onAddClick}
          >
            + Add new
          </button>
        )}
      </div>
      <ul className="clothes-section__list">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onShowDeleteConfirm={onShowDeleteConfirm}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
