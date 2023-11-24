import React, { useState, useEffect } from "react";
import { useFetchData } from "../../../hooks/useFetchData";

import TabNavigation from "../../UI/TabNavigation/TabNavigation";
import OrdersList from "../../Layouts/OrdersList/OrdersList";

import { API_FETCH_STATUS } from "../../../constants/apiFetchStatus";
import { orderTabs } from "../../../constants/orderTabs";
import { sortByIndex as sortByStatus } from "../../../utils/sortingFunctions";
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
  // Hook to fetch menu items, returns an object with the fetch status, fetched data and error
  // const { data: fetchedOrders, fetchStatus, error } = useFetchData(getOrders);

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
  const filteredOrders =
    selectedTab === "All"
      ? [...orders]
      : orders.filter((order) => order.status === selectedTab);

  // Early return for pending state
  if (fetchStatus === API_FETCH_STATUS.PENDING) {
    return <div>Loading...</div>;
  // Sort the items by status if the selected tab is "All"
  if (selectedTab === "All") {
    filteredOrders.sort(sortByStatus(orderTabs));
  }

  // Early return for error state
  if (fetchStatus === API_FETCH_STATUS.ERROR) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="orders-section">
      {/* Pass the orderTabs array to the TabNavigation component and handle the tab click */}
      <TabNavigation tabs={orderTabs} onTabClick={handleTabClick} />
      <div className="category-text-container">
        <h2>
          Category: <span className="category-text">{selectedTab}</span>
        </h2>
      </div>
      {/* Pass the filteredItems array to the OrderList component */}
      <OrdersList orders={filteredOrders} />
    </section>
  );
};

export default ViewOrdersSection;
