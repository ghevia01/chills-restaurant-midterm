import React, { useState, useEffect, useMemo } from "react";

import TabNavigation from "../../UI/TabNavigation/TabNavigation";
import OrdersList from "../../Layouts/OrdersList/OrdersList";

import { getOrders } from "../../../services/orderServices";

import "./view-orders-section.css";

// Object to store the fetch status
const FETCH_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Array of menu tabs
const orderTabs = [
  "All",
  "Pending",
  "In Progress",
  "Pending Payment",
  "Completed",
  "Canceled",
];

const ViewOrdersSection = () => {

  // State to keep track of the fetch status
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.PENDING);

  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(orderTabs[0]);

  // State to store fetched orders
  const [orders, setOrders] = useState([]);

  // State to keep track of errors
  const [error, setError] = useState(null);

  // Fetch menu items when the component mounts 
  useEffect(() => {
    // Variable to keep track of whether the component is mounted or not
    let isMounted = true;

    setFetchStatus(FETCH_STATUS.PENDING);

    // Function to fetch the orders
    const fetchOrders = async () => {
      setFetchStatus(FETCH_STATUS.PENDING);

      try {
        // Call the getOrders function from the orderServices module
        const { result, data: fetchedOrders, message } = await getOrders();

        // If the component is not mounted, do not update the state
        if (!isMounted) return;

        // If the result is success, update the orders state and fetchStatus state
        if (result === "success" && fetchedOrders && fetchedOrders.length > 0) {
          setOrders(fetchedOrders.orders);
          setFetchStatus(FETCH_STATUS.SUCCESS);
        } else {
          // If the result is not success, set the error state and fetchStatus state
          setError(message || 'No orders found.');
          setFetchStatus(FETCH_STATUS.ERROR);
        }
      } catch (err) {
        if (!isMounted) return;

        // Set the error state and fetchStatus state
        setError(err.message || 'Failed to fetch orders.');
        setFetchStatus(FETCH_STATUS.ERROR);
      }
    };

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Filter the items based on the selected tab
  const filteredOrders = useMemo(() => {
    return selectedTab === "All"
      ? orders.sort((a, b) => {
        // Get the index of the categories in the menuTabs array
        const indexA = orderTabs.indexOf(a.status);
        const indexB = orderTabs.indexOf(b.status);

        // Sort based on the index (this will sort the products based on the order of the categories in the menuTabs array)
        return indexA - indexB;
      })
      : orders.filter((order) => order.status === selectedTab);
  }, [orders, selectedTab]);

  // Early return for pending state
  if (fetchStatus === FETCH_STATUS.PENDING) {
    return <div>Loading...</div>;
  }

  // Early return for error state
  if (fetchStatus === FETCH_STATUS.ERROR) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <section className="orders-section">
      {/* Pass the menuTabs array to the TabNavigation componentca and handle the tab click */}
      <TabNavigation tabs={orderTabs} onTabClick={handleTabClick} />
      <div className="category-text-container">
        <h2>
          Category: <span className="category-text">{selectedTab}</span>
        </h2>
      </div>
      {/* Pass the filteredItems array to the MenuItemsList component */}
      <OrdersList orders={filteredOrders} />
    </section>
  );
};

export default ViewOrdersSection;
