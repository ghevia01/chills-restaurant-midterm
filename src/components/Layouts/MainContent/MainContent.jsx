import React from "react";

import "./main-content-styles.css";

const MainContent = ({ children }) => {
  return <section className="main-content-container">{children}</section>;
};

export default MainContent;
