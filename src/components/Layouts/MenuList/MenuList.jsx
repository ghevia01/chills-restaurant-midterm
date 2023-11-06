import React from "react";

import MenuItemCard from "../../Cards/MenuItemCard/MenuItemCard";

import "./menu-list-styles.css";

const MenuList = ({ items, isOrdering, onAddToOrder }) => {
  return (
    <section className="menu-list-container">
      {items.map((item, index) => (
        <MenuItemCard key={index} item={item} isOrdering={isOrdering}
        onAddToOrder={onAddToOrder} />
      ))}
    </section>
  );
};

export default MenuList;
