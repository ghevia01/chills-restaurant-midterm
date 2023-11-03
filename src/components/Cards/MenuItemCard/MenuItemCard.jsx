import React from "react";

import "./menu-item-card-styles.css";


const MenuItemCard = ({ item }) => {
  
  // Assume 'item.image' is a base64 encoded string of the image
  const imageSrc = item.image
    ? `data:image/jpeg;base64,${item.image}`
    : "placeholder-image-url";

  return (
    <div className="menu-item-card">
      <div className="item-img-container">
        <img src={imageSrc} alt="Menu Item" />
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
    </div>
  );
};

export default MenuItemCard;
