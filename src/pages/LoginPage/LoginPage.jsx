import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { sendUserLoginData } from "../../services/authService";
import logoImg from "../../assets/chillsrestaurant-no-background.jpeg"

import LoginForm from "../../components/Forms/LoginForm/LoginForm";

import "./login-page.css";

const LoginPage = () => {
  const { login } = useAuth(); // Get the login function from AuthProvider
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Function to handle login
  const handleLogin = async (loginData) => {
    // It's typically better to handle token removal after a failed login attempt or logout
    // However, if you want to ensure no tokens are stored before starting the login process, you might keep it here

    try {
      const response = await sendUserLoginData(loginData);
      // If response is successful, use the login function and navigate to the dashboard
      if (response.result === "success") {
        // Assuming response.data contains the JWT token, and the role is part of the decoded token
        login(response.data.token, response.data.role); // Update this line to pass the token
        navigate("/dashboard", { replace: true });
        return true;
      } else {
        // Handle unsuccessful login by showing an error message to the user
        // For instance, set an error state and display it in the UI
        return false;
      }
    } catch (error) {
      // Handle errors by showing an error message to the user
      console.error("Failed to login:", error);
      return false;
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img
          src={logoImg}
          alt="Logo"
        />
      </div>
      <main>
        <LoginForm onLoginAttempt={handleLogin} />
      </main>
    </div>
  );
};

export default LoginPage;
