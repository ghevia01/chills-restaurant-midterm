import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./dropdown-button.css";

const DropdownButton = ({
  className,
  icon,
  dropdownOptions,
  onOptionClick,
  ariaLabel,
}) => {
  // State to keep track of whether the dropdown menu is visible or not
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Ref to the dropdown container
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to close the dropdown menu when the user clicks outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    // Add the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove the event listener from the document when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle the dropdown option click
  const handleItemClick = (item, e) => {
    e.stopPropagation();
    onOptionClick(item);
  };

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <button
        className={`dropdown-button ${className}`}
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        aria-label={ariaLabel}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      <div className={`dropdown-menu ${isMenuVisible ? "show" : ""}`}>
        <ul>
        {dropdownOptions.map((item, index) => (
            <li key={index} onClick={(e) => handleItemClick(item, e)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownButton;
