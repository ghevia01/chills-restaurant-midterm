import React, { useState, useEffect } from "react";

import TabNavigation from "../../UI/TabNavigation/TabNavigation";
import OrdersList from "../../Layouts/OrdersList/OrdersList";
import { getOrders } from "../../../services/OrderServices";

import "./view-orders-section.css";

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
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(orderTabs[0]);

   // State to keep track of the selected tab and orders
   const [orders, setOrders] = useState([]); // Initialize orders as an empty array
   const [isLoading, setIsLoading] = useState(true); // Track loading state
   const [error, setError] = useState(null); // Track error state

   useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const fetchedOrders = await getOrders();
        // Assuming that `getOrders` returns an object with an `orders` array
        if (fetchedOrders && fetchedOrders.orders && fetchedOrders.orders.length > 0) {
          setOrders(fetchedOrders.orders);
        } else {
          // Handle the empty orders case
          setOrders([]);
          setError('No orders found.');
        }
        setIsLoading(false);
      } catch (err) {
        // If an error occurs, you would want to log or handle it here
        setError(err.message || 'Failed to fetch orders.');
        setIsLoading(false);
      }
    };
  
    fetchOrders();
    // The empty dependency array means this effect will only run once on component mount
  }, []);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Filter the items based on the selected tab
  const filteredOrders =
    selectedTab === "All"
      ? [orders].sort((a, b) => {
          // Get the index of the categories in the menuTabs array
          const indexA = orderTabs.indexOf(a.status);
          const indexB = orderTabs.indexOf(b.status);

          // Sort based on the index (this will sort the products based on the order of the categories in the menuTabs array)
          return indexA - indexB;
        })
      : orders.filter((order) => order.status === selectedTab);

      if (isLoading) {
        return <div>Loading...</div>; // Or some loading indicator
      }
    
      if (error) {
        return <div>Error: {error}</div>; // Render error message
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
      <OrdersList orders={filteredOrders} />
    </section>
  );
};

export default ViewOrdersSection;
