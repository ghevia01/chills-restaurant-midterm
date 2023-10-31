import React from "react";

import "./menu-item-card-styles.css";

const MenuItemCard = ({ item }) => {
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
    </div>
  );
};

export default MenuItemCard;
