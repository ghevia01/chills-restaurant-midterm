import React, { useEffect, useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";

import MenuList from "../../../components/Layouts/MenuList/MenuList";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import TabNavigation from "../../../components/UI/TabNavigation/TabNavigation";
import MenuItemModal from "../../../components/UI/MenuItemModal/MenuItemModal";

import { API_FETCH_STATUS } from "../../../constants/apiFetchStatus";
import { menuTabs } from "../../../constants/menuTabs";
import {
  sortByIndex as sortByCategory,
  sortByName,
} from "../../../utils/sortingFunctions";
import { getMenuItemData } from "../../../services/foodService";
import { updateMenuItem } from "../../../services/updateMenuItem";

import "./menu-section.css";

const MenuSection = ({ isOrdering, onAddToOrder }) => {
  // Hook to fetch menu items, returns an object with the fetch status, fetched data and error
  const {
    data: fetchedMenuItems,
    fetchStatus,
    error,
  } = useFetchData(getMenuItemData);

  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(menuTabs[0]);

  // State to store fetched menu items
  const [menuItems, setMenuItems] = useState([]);

  // State to store the selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // State to store the modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Function to handle the menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Function to handle the modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Function to handle the item update
  const handleUpdateItem = async (updatedItem) => {
    try {
      // Update the item in the database
      await updateMenuItem(updatedItem);

      // Update the menuItems state
      const updatedMenuItems = menuItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setMenuItems(updatedMenuItems);

      // Update the selectedItem state if the updated item is the selected item
      if (selectedItem && selectedItem.id === updatedItem.id) {
        setSelectedItem(updatedItem);
      }

    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Filter the items based on the selected tab
  const filteredItems =
    selectedTab === "All"
      ? [...menuItems]
      : menuItems.filter((item) => item.category === selectedTab);

  // Sort the items by category if the selected tab is "All"
  if (selectedTab === "All") {
    filteredItems.sort(sortByCategory(menuTabs));
  }

  // Sort the items by name
  filteredItems.sort(sortByName);

  // Early return for pending state
  if (fetchStatus === API_FETCH_STATUS.PENDING) {
    return <p>Loading...</p>;
  }

  // Early return for error state
  if (fetchStatus === API_FETCH_STATUS.ERROR) {
    return <p>{error}</p>;
  }

  return (
    <section className="menu-section">
      {/* Pass the menuTabs array to the TabNavigation component and handle the tab click */}
      <TabNavigation tabs={menuTabs} onTabClick={handleTabClick} />
      <Searchbar />
      <div className="category-text-container">
        <h2 className="category-header">
          Category: <span className="category-text">{selectedTab}</span>
        </h2>
      </div>
      {/* Pass the filteredItems array to the MenuList component */}
      <MenuList
        menuItems={filteredItems}
        isOrdering={isOrdering}
        onAddToOrder={onAddToOrder}
        onMenuItemClick={handleMenuItemClick}
      />
      {/* Render the MenuItemModal component if the isModalOpen state is true */}
      {isModalOpen && (
        <MenuItemModal
          item={selectedItem}
          onSave={handleUpdateItem}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default MenuSection;
