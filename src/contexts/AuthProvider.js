import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUserDetails = sessionStorage.getItem("userDetails");

    if (storedToken && storedUserDetails) {
      setIsLoggedIn(true);
      setUserRole(JSON.parse(storedUserDetails).role);
      setUserDetails(JSON.parse(storedUserDetails));
      setUpAxiosHeaders(storedToken);
    }
  }, []);

  const setUpAxiosHeaders = (token) => {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const tearDownAxiosHeaders = () => {
    delete API.defaults.headers.common["Authorization"];
  };

  const login = (token, user) => {
    try {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userDetails", JSON.stringify(user));

      setIsLoggedIn(true);
      setUserRole(user.role);
      setUserDetails(user);
      setUpAxiosHeaders(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userDetails");

    setIsLoggedIn(false);
    setUserRole(null);
    setUserDetails(null);
    tearDownAxiosHeaders();
    navigate('/login');
  };

  const value = {
    isLoggedIn,
    userRole,
    userDetails,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
