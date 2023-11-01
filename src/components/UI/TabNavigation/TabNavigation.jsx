import React, { useState } from "react";

import "./tab-navigation-styles.css";

const TabNavigation = ({ tabs, onTabClick }) => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Function to handle the tab selection
  const handleTabSelection = (tab) => {

    // Set the local state for styling
    setActiveTab(tab);

    // Inform the parent component about the clicked tab
    onTabClick(tab);
  };

  return (
    <div className="tabs-container">
      
      {/* Map over the tabs array and render a button for each tab */}
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${tab === activeTab ? "active" : ""}`}
          onClick={() => handleTabSelection(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
