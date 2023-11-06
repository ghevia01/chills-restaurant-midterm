import React from 'react';
import { useNavigate } from "react-router-dom";

// import { sendRegisterData } from "../../services/registerService";

import RegisterForm from "../../components/Forms/RegisterForm/RegisterForm";

import "../RegisterPage/register-page.css";

const RegisterPage = () => {

  // Get navigate function
  const navigate = useNavigate();

  // Function to handle login
  const handleRegister = async (registerData) => {
    try {
      // Send login data to the server.
      // const response = await sendRegisterData(registerData);

      // If response is successful, navigate to login page.
      // if (response.result === "success") {
      navigate('/login', { replace: true });
      return true;
      // }
      // Handle unsuccessful login.
      // return false;
    } catch (error) {
      // Handle errors.
      console.error("Failed to register:", error);
      return false;
    }
  };

  return (
    <div className="register-page">
        <RegisterForm onRegisterAttempt={handleRegister} />
    </div>
  );
};

export default RegisterPage;