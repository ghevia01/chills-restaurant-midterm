import React, { useEffect, useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";

import MenuList from "../../../components/Layouts/MenuList/MenuList";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import TabNavigation from "../../../components/UI/TabNavigation/TabNavigation";

import { API_FETCH_STATUS } from "../../../constants/apiFetchStatus";
import { menuTabs } from "../../../constants/menuTabs";
import { sortByIndex as sortByCategory, sortByName } from "../../../utils/sortingFunctions";
import { getMenuItemData } from "../../../services/foodService";

import "./menu-section.css";

const MenuSection = ({ isOrdering, onAddToOrder }) => {

  // Hook to fetch menu items, returns an object with the fetch status, fetched data and error
  const { data: fetchedMenuItems, fetchStatus, error } = useFetchData(getMenuItemData);

  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(menuTabs[0]);

  // State to store fetched menu items
  const [menuItems, setMenuItems] = useState([]);

  // Update the menuItems state when the fetchedMenuItems state changes
  useEffect(() => {
    if (fetchStatus === API_FETCH_STATUS.SUCCESS) {
      setMenuItems(fetchedMenuItems);
    }
  }, [fetchedMenuItems, fetchStatus]);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Filter the items based on the selected tab
  const filteredItems = () => {
    let filtered = selectedTab === "All"
      ? [...menuItems]
      : menuItems.filter(item => item.category === selectedTab);

    // Sort the items by category if the selected tab is "All"
    if (selectedTab === "All") {
      filtered.sort(sortByCategory(menuTabs));
    }
    
    // Sort the items by name
    filtered.sort(sortByName);

    return filtered;
  };

  // Early return for pending state
  if (fetchStatus === API_FETCH_STATUS.PENDING) {
    return <p>Loading...</p>;
  };

  // Early return for error state
  if (fetchStatus === API_FETCH_STATUS.ERROR) {
    return <p>{error}</p>;
  };

  return (
    <section className="menu-section">
      {/* Pass the menuTabs array to the TabNavigation component and handle the tab click */}
      <TabNavigation tabs={menuTabs} onTabClick={handleTabClick} />
      <Searchbar />
      <div className="category-text-container">
        <h2>
          Category: <span className="category-text">{selectedTab}</span>
        </h2>
      </div>
      {/* Pass the filteredItems array to the MenuList component */}
      <MenuList menuItems={filteredItems} isOrdering={isOrdering} onAddToOrder={onAddToOrder} />
    </section>
  );
};

export default MenuSection;
