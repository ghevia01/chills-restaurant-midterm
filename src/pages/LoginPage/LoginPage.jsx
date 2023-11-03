import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { sendUserLoginData } from "../../services/authService";

import LoginForm from "../../components/Forms/LoginForm/LoginForm";

import "./login-page-styles.css";

const LoginPage = () => {

  // Get login function from AuthProvider
  const { login } = useAuth();

  // Get navigate function
  const navigate = useNavigate();


  // Function to handle login
  const handleLogin = async (loginData) => {
    try {
      // Send login data to the server.

      const { result, role } = await sendUserLoginData(loginData);

      // If response is successful, login and navigate to dashboard.
      if (result === "success") {
        login(role);
        navigate('/dashboard', { replace: true });
        return true;
      }
      // Handle unsuccessful login.
      return false;
    } catch (error) {
      // Handle errors.
      console.error("Failed to login:", error);
      return false;
    }
  };

  return (
    <div className="login-page">
      <main>
        <LoginForm onLoginAttempt={handleLogin} />
      </main>
    </div>
  );
};

export default LoginPage;
