import React from "react";
import { useLiveDateTime } from "../../../hooks/useLiveDateTime";
import { useAuth } from "../../../contexts/AuthProvider";

import DropdownButton from "../../UI/DropdownButton/DropdownButton";

import { faCircleQuestion, faUser } from "@fortawesome/free-solid-svg-icons";

import "./header-section.css";

const Header = () => {
  // Get the current date/time
  const currentDateTime = useLiveDateTime();

  // Get the logout function from the auth context
  const { logout } = useAuth();

  // Format the date to a string like: "Monday, July 5, 2021"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time to a string like: "10:30 AM"
  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Function to handle the dropdown option click
  const handleOptionClick = (option) => {
    if (option === "Logout") {
      logout(); 
    } 
  };

  return (
    <header className="header-container">
      <div className="date-time">
        {formattedDate}, {formattedTime}
      </div>
      <div className="header-buttons-container">
        <DropdownButton
          className="help-button"
          icon={faCircleQuestion}
          dropdownOptions={["Help", "About"]}
          onOptionClick={handleOptionClick}
          ariaLabel="Help Button"
        />
        <DropdownButton
          className="account-button"
          icon={faUser}
          dropdownOptions={["Profile", "Settings", "Logout"]}
          onOptionClick={handleOptionClick}
          ariaLabel="Account Button"
        />
      </div>
    </header>
  );
};

export default Header;
