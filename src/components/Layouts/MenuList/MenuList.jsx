import React from "react";

import MenuItemCard from "../../Cards/MenuItemCard/MenuItemCard";

import "./menu-list.css";

const MenuList = ({ menuItems, isOrdering, onAddToOrder }) => {
  return (
    <section className="menu-list-container">
      {menuItems.map(menuItem => (
        <MenuItemCard key={menuItem.id} item={menuItem} isOrdering={isOrdering}
          onAddToOrder={onAddToOrder} />
      ))}
    </section>
  );
};

export default MenuList;
