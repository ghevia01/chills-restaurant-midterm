import React, { useEffect, useState, useMemo } from "react";

import MenuList from "../../../components/Layouts/MenuList/MenuList";
import Searchbar from "../../../components/UI/Searchbar/Searchbar";
import TabNavigation from "../../../components/UI/TabNavigation/TabNavigation";

import { getMenuItemData } from "../../../services/foodService";

import "./menu-section.css";

// Object to store the fetch status
const FETCH_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Array of menu tabs
const menuTabs = [
  "All",
  "Appetizers",
  "Entrees",
  "Sides",
  "Desserts",
  "Beverages",
];

const MenuSection = ({ isOrdering, onAddToOrder }) => {

  // State to keep track of the fetch status
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.PENDING);

  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(menuTabs[0]);

  // State to store fetched menu items
  const [menuItems, setMenuItems] = useState([]);

  // State to keep track of errors
  const [error, setError] = useState(null);

  // Fetch menu items when the component mounts 
  useEffect(() => {
    // Variable to keep track of whether the component is mounted or not
    let isMounted = true;

    setFetchStatus(FETCH_STATUS.PENDING);

    const fetchData = async () => {
      try {
        // Call the getMenuItemData function from the foodService module
        const { result, data, message } = await getMenuItemData();

        // If the component is not mounted, do not update the state
        if (!isMounted) return;

        // If the result is success, update the menuItems state and fetchStatus state
        if (result === "success") {
          setMenuItems(data);
          setFetchStatus(FETCH_STATUS.SUCCESS);
        } else {
          // If the result is not success, set the error state and fetchStatus state
          setError(message);
          setFetchStatus(FETCH_STATUS.ERROR);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message);
        setFetchStatus(FETCH_STATUS.ERROR);
      }
    };

    // Execute the fetchData function
    fetchData();

    return () => {
      // When the component unmounts, set the isMounted variable to false
      isMounted = false;
    }
  }, []);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Filter the items based on the selected tab
  const filteredItems = useMemo(() => {
    return selectedTab === "All"
      ? menuItems.sort((a, b) => {
        // Get the index of the categories in the menuTabs array
        const indexA = menuTabs.indexOf(a.category);
        const indexB = menuTabs.indexOf(b.category);

        // Sort based on the index (this will sort the products based on the order of the categories in the menuTabs array)
        return indexA - indexB;
      })
      : menuItems.filter((item) => item.category === selectedTab);
  }, [selectedTab, menuItems]);

  return (
    <section className="menu-section">
      {fetchStatus === FETCH_STATUS.PENDING && <p>Loading menu items...</p>}
      {fetchStatus === FETCH_STATUS.ERROR && <p>Error fetching menu items: {error}</p>}
      {fetchStatus === FETCH_STATUS.SUCCESS && (
        <>
          <TabNavigation tabs={menuTabs} onTabClick={handleTabClick} />
          <Searchbar />
          <div className="category-text-container">
            <h2>
              Category: <span className="category-text">{selectedTab}</span>
            </h2>
          </div>
          <MenuList items={filteredItems} isOrdering={isOrdering} onAddToOrder={onAddToOrder} />
        </>
      )}
    </section>
  );
};

export default MenuSection;
