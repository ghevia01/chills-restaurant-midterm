import React from "react";

import "./main-content.css";

const MainContent = ({ children }) => {
  return <section className="main-content-container">{children}</section>;
};

export default MainContent;
