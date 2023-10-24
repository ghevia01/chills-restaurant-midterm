import React from "react";

import "./sidebar-styles.css";

const Sidebar = ({ children }) => {
  return <div className="sidebar-container">{children}</div>;
};

export default Sidebar;
