import React from "react";

import "./sidebar-nav-styles.css";

const SidebarNav = () => {
  return (
    <nav className="sidebar-nav-container">
      <ul className="sidebar-nav-list">
        <li className="sidebar-nav-list-item">Menu</li>
        <li className="sidebar-nav-list-item">Orders</li>
        <li className="sidebar-nav-list-item">Payment</li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
