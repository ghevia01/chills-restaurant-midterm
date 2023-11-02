import React, { useState, createContext, useContext } from "react";

// New context object to provide the auth data to all components
const AuthContext = createContext();


// Custom hook to quickly access the auth data instead of using useContext(AuthContext) everywhere
export const useAuth = () => {
    return useContext(AuthContext);
};

// PDefine and export the AuthProvider component
export const AuthProvider = ({ children }) => {

    // State to hold the auth status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");

    // Set the auth status to true
    const login = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
    }

    const logout = (role) => {
        setIsLoggedIn(false);
        setUserRole(null);
    }

    // Value object to pass to the context provider
    const value = {
        isLoggedIn,
        userRole,
        login,
        logout
    };

    // Render and pass the value to the context provider
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
