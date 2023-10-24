import React, { useState } from "react";

import "./tab-navigation-styles.css";

const TabNavigation = ({ tabs }) => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="tab-navigation-container">
      {/* Map over the tabs array and render a button for each tab */}
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${tab === activeTab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
