import { useState, useEffect } from "react";

// Custom hook to get the current date and time
export const useLiveDateTime = () => {
  // State variable to store the current date and time
  const [liveDateTime, setLiveDateTime] = useState(new Date());

  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => setLiveDateTime(new Date()), 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return liveDateTime;
};
