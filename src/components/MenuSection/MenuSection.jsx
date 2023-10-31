import React, { useState } from "react";

import TabNavigation from "../TabNavigation/TabNavigation";
import Searchbar from "../Searchbar/Searchbar";
import MenuList from "../MenuList/MenuList";

import hamburgerImg from "../../assets/hamburger.jpg";
import pepperoniPizzaImg from "../../assets/pepperoni-pizza.jpg";
import friesImg from "../../assets/french-fries.jpg";

import "./menu-section-styles.css";

// Array of menu tabs
const menuTabs = [
  "All",
  "Appetizers",
  "Entrees",
  "Sides",
  "Desserts",
  "Beverages",
];

const menuItems = [
  {
    name: "Mozzarella Sticks",
    price: 5.99,
    category: "Appetizers",
    description:
      "A classic appetizer made with breaded mozzarella cheese served with marinara sauce.",
    image: null,
  },
  {
    name: "Hamburger",
    price: 8.99,
    category: "Entrees",
    description:
      "A classic hamburger made with our house blend of beef, served with lettuce, tomato, and onion and melted cheese.",
    image: hamburgerImg,
  },
  {
    name: "Pepperoni Pizza",
    price: 14.99,
    category: "Entrees",
    description:
      "A classic pizza topped with tomato sauce, mozzarella cheese, and pepperoni.",
    image: pepperoniPizzaImg,
  },
  {
    name: "French Fries",
    price: 3.99,
    category: "Sides",
    description: "A side of crispy french fries.",
    image: friesImg,
  },
  {
    name: "Tiramisu",
    price: 5.99,
    category: "Desserts",
    description:
      "A classic Italian dessert made with ladyfingers, mascarpone, and espresso.",
    image: null,
  },
  {
    name: "Coca-Cola",
    price: 2.99,
    category: "Beverages",
    description: "A can of Coca-Cola.",
    image: null,
  },
];

const MenuSection = () => {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(menuTabs[0]);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Filter the items based on the selected tab
  const filteredItems =
    selectedTab === "All"
      ? menuItems.sort((a, b) => {
          // Get the index of the categories in the menuTabs array
          const indexA = menuTabs.indexOf(a.category);
          const indexB = menuTabs.indexOf(b.category);

          // Sort based on the index (this will sort the products based on the order of the categories in the menuTabs array)
          return indexA - indexB;
        })
      : menuItems.filter((item) => item.category === selectedTab);

  return (
    <section className="menu-section">
      {/* Pass the menuTabs array to the TabNavigation componentca and handle the tab click */}
      <TabNavigation tabs={menuTabs} onTabClick={handleTabClick} />
      <Searchbar />
      <div className="category-text-container">
        <h2>
          Category: <span className="category-text">{selectedTab}</span>
        </h2>
      </div>
      {/* Pass the filtered items array to the ProductsList component */}
      <MenuList items={filteredItems} />
    </section>
  );
};

export default MenuSection;
