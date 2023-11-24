import React, { useState, useEffect, useMemo } from "react";

import TabNavigation from "../../UI/TabNavigation/TabNavigation";
import OrdersList from "../../Layouts/OrdersList/OrdersList";

import { getOrders } from "../../../services/orderServices";

import "./view-orders-section.css";

// const fetchedOrders = [
//   {
//     number: 1,
//     submitTime: "2:00 PM",
//     owner: "John Doe",
//     status: "Pending",
//     items: [
//       { id: 1, name: "Hamburger", quantity: 1 },
//       { id: 2, name: "Fries", quantity: 1 },
//       { id: 3, name: "Coke", quantity: 1 },
//     ],
//     notes: "No onions on the burger.",
//   },
//   {
//     number: 2,
//     submitTime: "3:00 PM",
//     owner: "Jane Doe",
//     status: "In Progress",
//     items: [
//       { id: 1, name: "Hamburger", quantity: 1 },
//       { id: 2, name: "Fries", quantity: 3 },
//       { id: 3, name: "Coke", quantity: 1 },
//     ],
//     notes: "",
//   },
// ];

const ViewOrdersSection = () => {
  // State to keep track of the fetch status
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.PENDING);

  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(orderTabs[0]);

  // State to store fetched orders
  const [orders, setOrders] = useState([]);

  // Update the menuItems state when the fetchedMenuItems state changes
  useEffect(() => {
    if (fetchStatus === API_FETCH_STATUS.SUCCESS) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders, fetchStatus]);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Filter the items based on the selected tab
  const filteredOrders = useMemo(() => {
    return selectedTab === "ALL"
      ? [orders].sort((a, b) => {
          // Get the index of the categories in the menuTabs array
          const indexA = orderTabs.indexOf(a.status);
          const indexB = orderTabs.indexOf(b.status);
          // Sort based on the index (this will sort the products based on the order of the categories in the menuTabs array)
          return indexA - indexB;
        })
      : orders.filter((order) => order.status === selectedTab);
  }, [orders, selectedTab]);

  // Early return for pending state
  if (fetchStatus === API_FETCH_STATUS.PENDING) {
    return <div>Loading...</div>;
  }

  // Early return for error state
  if (fetchStatus === API_FETCH_STATUS.ERROR) {
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
