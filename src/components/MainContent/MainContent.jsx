import React from "react";

import "./main-content-styles.css";

const MainContent = ({ children }) => {
  return <main className="main-content-container">{children}</main>;
};

export default MainContent;
