import React from "react";
import { Link } from "react-router-dom";

import "./sidebar-nav-styles.css";

const SidebarNav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/dashboard/menu" className="nav-link">
            Menu
          </Link>
        </li>
        <li className="nav-list-item">
          <Link to="/dashboard/new-order" className="nav-link">
            New Order
          </Link>
        </li>
        <li className="nav-list-item">
          <Link to="/dashboard/view-orders" className="nav-link">
            View Orders
          </Link>
        </li>
        <li className="nav-list-item">
          <Link to="/dashboard/process-payments" className="nav-link">
            Process Payments
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
