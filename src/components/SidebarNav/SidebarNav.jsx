import React from "react";
import { Link } from "react-router-dom";

import "./sidebar-nav-styles.css";

const SidebarNav = () => {
  return (
    <nav className="sidebar-nav-container">
      <ul className="sidebar-nav-list">
        <li className="sidebar-nav-list-item">
          <Link to="/dashboard/menu" className="sidebar-nav-link">
            Menu
          </Link>
        </li>
        <li className="sidebar-nav-list-item">
          <Link to="/dashboard/orders" className="sidebar-nav-link">
            Orders
          </Link>
        </li>
        <li className="sidebar-nav-list-item">
          <Link to="/dashboard/payment" className="sidebar-nav-link">
            Payment
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
