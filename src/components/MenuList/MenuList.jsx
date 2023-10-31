import React from "react";

import MenuItemCard from "../MenuItemCard/MenuItemCard";

import "./menu-list-styles.css";

const MenuList = ({ items }) => {
  return (
    <section className="menu-list-container">
      {items.map((item, index) => (
        <MenuItemCard key={index} item={item} />
      ))}
    </section>
  );
};

export default MenuList;
