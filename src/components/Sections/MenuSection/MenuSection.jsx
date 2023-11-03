import React, { useEffect, useState } from "react";

import MenuList from "../../../components/Layouts/MenuList/MenuList";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import TabNavigation from "../../../components/UI/TabNavigation/TabNavigation";


import { getMenuItemData } from "../../../services/foodService";
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


const MenuSection = () => {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(menuTabs[0]);

  // State to store fetched menu items
  const [menuItems, setMenuItems] = useState([]);

  // State to keep track of loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch menu items when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getMenuItemData();
        if (response.result === "success") {
          setMenuItems(response.data); // Assuming the response.data contains the array of menu items
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {isLoading ? (
        <p>Loading menu items...</p>
      ) : error ? (
        <p>Error fetching menu items: {error}</p>
      ) : (
        <>
          <TabNavigation tabs={menuTabs} onTabClick={handleTabClick} />
          <Searchbar />
          <div className="category-text-container">
            <h2>
              Category: <span className="category-text">{selectedTab}</span>
            </h2>
          </div>
          <MenuList items={filteredItems} />
        </>
      )}
    </section>
  );
};

export default MenuSection;
