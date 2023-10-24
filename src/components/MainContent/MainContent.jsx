import React from "react";

import "./main-content-styles.css";

const MainContent = ({ children }) => {
  return <div className="main-content-container">{children}</div>;
};

export default MainContent;
