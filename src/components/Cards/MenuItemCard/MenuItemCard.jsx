import React from "react";

import "./menu-item-card.css";

const MenuItemCard = ({ item, isOrdering, onAddToOrder, onMenuItemClick }) => {
  // Destructure the item object
  const { name, description, price, image } = item;

  // Function to handle add to order on button click
  const handleAddToOrder = (e) => {
    // Prevent the event from bubbling up to the card click event
    e.stopPropagation();
    if (onAddToOrder) {
      onAddToOrder(item);
    }
  };

  // Function to handle card click event to open the modal
  const handleCardClick = (e) => {
    // Prevent the event from bubbling up to the card click event
    e.stopPropagation();
    if (!isOrdering && onMenuItemClick) {
      onMenuItemClick(item);
    }
  };

  return (
    <div className="menu-item-card" onClick={handleCardClick}>
      <div className="item-img-container">
        <img src={`data:image/jpeg;base64,${image}`} alt={name} />
      </div>
      <div className="item-info-container">
        <div className="item-name-price-container">
          <h3 className="item-name">{name}</h3>
          <span className="item-price">{`$${price}`}</span>
        </div>
        <div className="item-description-container">
          <p>{description}</p>
        </div>
      </div>
      {isOrdering && (
        <div className="order-button-container">
          <button className="order-button" onClick={handleAddToOrder}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
