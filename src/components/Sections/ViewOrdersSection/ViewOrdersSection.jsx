import React, { useState } from "react";

import TabNavigation from "../../UI/TabNavigation/TabNavigation";
import OrdersList from "../../Layouts/OrdersList/OrdersList";

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

// Array of orders
const orders = [
  {
    number: 1,
    submitTime: "2:30 PM",
    owner: "John",
    status: "Pending",
    items: [
      {
        name: "Hamburger",
        quantity: 1,
      },
    ],
    notes: "No lettuce, no pickles, no tomatoes",
  },
  {
    number: 2,
    submitTime: "2:30 PM",
    owner: "John",
    status: "Pending Payment",
    items: [
      {
        name: "Hamburger",
        quantity: 1,
      },
    ],
    notes: "No lettuce, no pickles, no tomatoes",
  },
  {
    number: 3,
    submitTime: "2:30 PM",
    owner: "John",
    status: "In Progress",
    items: [
      {
        name: "Hamburger",
        quantity: 1,
      },
    ],
    notes: "No lettuce, no pickles, no tomatoes",
  },
];

const ViewOrdersSection = () => {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(orderTabs[0]);

  // Function to handle the tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Filter the items based on the selected tab
  const filteredOrders =
    selectedTab === "All"
      ? orders.sort((a, b) => {
          // Get the index of the categories in the menuTabs array
          const indexA = orderTabs.indexOf(a.status);
          const indexB = orderTabs.indexOf(b.status);

          // Sort based on the index (this will sort the products based on the order of the categories in the menuTabs array)
          return indexA - indexB;
        })
      : orders.filter((order) => order.status === selectedTab);

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
