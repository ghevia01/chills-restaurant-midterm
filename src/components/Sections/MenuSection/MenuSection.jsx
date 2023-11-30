import React, { useEffect, useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import { useAuth } from "../../../contexts/AuthProvider";

import MenuList from "../../../components/Layouts/MenuList/MenuList";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import TabNavigation from "../../../components/UI/TabNavigation/TabNavigation";
import AddNewItemModal from "../../../components/UI/AddNewItemModal/AddNewItemModal";
import MenuItemModal from "../../../components/UI/MenuItemModal/MenuItemModal";

import { API_FETCH_STATUS } from "../../../constants/apiFetchStatus";
import { menuTabs } from "../../../constants/menuTabs";
import {
  sortByIndex as sortByCategory,
  sortByName,
} from "../../../utils/sortingFunctions";

import {
  getMenuItemData,
  updateMenuItem,
  addNewMenuItem,
  removeMenuItem,
} from "../../../services/menuItemsServices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./menu-section.css";

const MenuSection = ({ isOrdering, onAddToOrder }) => {
  // Hook to get the user role
  const { userRole } = useAuth();
  const isUserManager = userRole === "MANAGER";

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
  const [isItemModalOpen, setisItemModalOpen] = useState(false);

  // State to store the add item modal open/close state
  const [isAddItemModalOpen, setisAddItemModalOpen] = useState(false);

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

  // Function to handle the add item click
  const handleAddItemClick = () => {
    setisAddItemModalOpen(true);
  };

  // Function to handle the menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    setisItemModalOpen(true);
  };

  // Function to handle the modal close
  const closeItemModal = () => {
    setisItemModalOpen(false);
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

  // Function to handle the item remove
  const handleRemoveItem = async (itemId) => {
    try {
      // Remove the item from the database
      await removeMenuItem(itemId);

      // Update the menuItems state
      const updatedMenuItems = menuItems.filter((item) => item.id !== itemId);
      setMenuItems(updatedMenuItems);

      // Close the modal if the removed item is the selected item
      if (selectedItem && selectedItem.id === itemId) {
        closeItemModal();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Function to handle the add item modal close
  const closeAddItemModal = () => {
    setisAddItemModalOpen(false);
  };

  const handleAddMenuItem = async (newMenuItem) => {
    try {
      const response = await addNewMenuItem(newMenuItem); // API call to add item
      if (response.data !== null ) {
        setMenuItems(response.data);
      }
      // Assuming `response` has a way to indicate success
      return { result: "success" };
    } catch (error) {
      console.error("Error adding the new item:", error);
      return { result: "failed" };
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
        {isUserManager && (
          <button className="add-item-button" onClick={handleAddItemClick}>
            <FontAwesomeIcon icon={faPlus} /> New Item
          </button>
        )}
      </div>
      {/* Pass the filteredItems array to the MenuList component */}
      <MenuList
        menuItems={filteredItems}
        isOrdering={isOrdering}
        onAddToOrder={onAddToOrder}
        onMenuItemClick={handleMenuItemClick}
      />

      {/* Render the AddNewItemModal component if the isAddItemModalOpen state is true */}
      {isAddItemModalOpen && (
        <AddNewItemModal
          onCreate={handleAddMenuItem}
          onClose={closeAddItemModal}
        />
      )}

      {/* Render the MenuItemModal component if the isModalOpen state is true */}
      {isItemModalOpen && (
        <MenuItemModal
          item={selectedItem}
          onSave={handleUpdateItem}
          onClose={closeItemModal}
          onRemove={handleRemoveItem}
        />
      )}
    </section>
  );
};

export default MenuSection;
