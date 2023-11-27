import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";

// New context object to provide the auth data to all components
const AuthContext = createContext();

// Custom hook to quickly access the auth data instead of using useContext(AuthContext) everywhere
export const useAuth = () => useContext(AuthContext);

// Define and export the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to hold the auth status and user details
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [tokenInSession, setToken] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  // const secret = process.env.REACT_APP_JWT_SECRET;

  // Hook to get access to the page navigation history object
  const navigate = useNavigate();

  // Function to set Axios headers
  const setUpAxiosHeaders = (token) => {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // Function to remove Axios headers
  const tearDownAxiosHeaders = () => {
    delete API.defaults.headers.common["Authorization"];
  };

  // Function to log in the user and set user details from the JWT
  const login = (token, user) => {
    try {
      setToken(token);
      setUserDetails(user); // Set the user details in the state
      setIsLoggedIn(true); // Update the login status
      setUserRole(user.role); // Assuming the role is included in the JWT payload
      setUpAxiosHeaders(token); // Set up Axios headers
    } catch (error) {
      console.error("Failed to decode token:", error);
      // Handle the invalid token case, perhaps by showing an error message to the user
    }
  };

  // Function to log out the user and clear user details
  const logout = () => {
    setIsLoggedIn(false); // Update the login status
    setUserRole(null); // Clear the user role
    setToken(null); // Clear the token
    setUserDetails(null); // Clear the user details
    tearDownAxiosHeaders(); // Remove Axios headers
    // Optionally, instruct the browser to remove the HttpOnly cookie by making a logout request to the server
    navigate('/login');
  };

  // Value object to pass to the context provider
  const value = {
    isLoggedIn,
    userRole,
    userDetails,
    tokenInSession,
    login,
    logout,
  };

  // Render and pass the value to the context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
