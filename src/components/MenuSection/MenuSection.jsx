import React, { useState } from "react";

import TabNavigation from "../TabNavigation/TabNavigation";
import Searchbar from "../Searchbar/Searchbar";
import ProductsList from "../ProductsList/ProductsList";

import hamburger from "../../assets/hamburger.jpg";

import "./menu-section-styles.css";

// Array of menu tabs
const menuTabs = ["Appetizers", "Entrees", "Sides", "Desserts", "Beverages"];

const products = [
  {
    name: "Hamburger",
    price: 5.99,
    category: "Entrees",
    description: "A delicious hamburger!",
    image: hamburger,
  },
];

const MenuSection = () => {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(menuTabs[0]);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <section className="menu-section">
      <div className="nav-wrapper">
        {/* Pass the menuTabs array to the TabNavigation componentca and handle the tab click */}
        <TabNavigation tabs={menuTabs} onTabClick={handleTabClick} />
        <Searchbar />
      </div>
      <div className="category-text-container">
        <h2>
          Category: <span className="category-text">{selectedTab}</span>
        </h2>
      </div>
      {/* Pass the selected tab and the products array to the ProductsList component */}
      <ProductsList products={products} />
    </section>
  );
};

export default MenuSection;
