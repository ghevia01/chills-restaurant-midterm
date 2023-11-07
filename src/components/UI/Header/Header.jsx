import React, { useState, useEffect } from "react";

import "./header.css";

const Header = () => {
  // Create a state variable for the current date/time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the current date/time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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

  // Render the header with the current date/time
  return (
    <header className="header-container">
      <div className="date-time">
        {formattedDate}, {formattedTime}
      </div>
    </header>
  );
};

export default Header;
