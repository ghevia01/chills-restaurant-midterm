import React from "react";

import MenuItemCard from "../../Cards/MenuItemCard/MenuItemCard";

import "./menu-list.css";

const MenuList = ({ items, isOrdering, onAddToOrder }) => {
  return (
    <section className="menu-list-container">
      {items.map(item => (
        <MenuItemCard key={item.id} item={item} isOrdering={isOrdering}
          onAddToOrder={onAddToOrder} />
      ))}
    </section>
  );
};

export default MenuList;
