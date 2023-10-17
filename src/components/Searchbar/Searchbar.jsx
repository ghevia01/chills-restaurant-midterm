import React from "react";

import "./searchbar-styles.css";

const Searchbar = () => {
  return (
    <div className="searchbar-container">
      <input className="searchbar" type="text" placeholder="Search. . ." />
    </div>
  );
};

export default Searchbar;
