import React from "react";

import "./menu-item-card-styles.css";

const MenuItemCard = ({ item, isOrdering, onAddToOrder }) => {

  // Use base64-encoded image if provided, otherwise use placeholder.
  // const imageSrc = image
  //   ? `data:image/jpeg;base64,${image}`
  //   : "placeholder-image-url";

  // Function to handle add to order on button click
  const handleAddToOrder = () => {
    if (onAddToOrder) {
      onAddToOrder(item);
    }
  };
  
  return (
    <div className="menu-item-card">
      <div className="item-img-container">
        <img src={item.image} alt="Menu Item" />
      </div>
      <div className="item-info-container">
        <div className="item-name-price-container">
          <h3 className="item-name">{item.name}</h3>
          <span className="item-price">{`$${item.price}`}</span>
        </div>
        <div className="item-description-container">
          <p>{item.description}</p>
        </div>
      </div>
      {isOrdering && (
        <div className="order-button-container">
          <button className="order-button" onClick={handleAddToOrder}>Add</button>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
