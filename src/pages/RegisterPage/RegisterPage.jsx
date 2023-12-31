import React from "react";
import { useNavigate } from "react-router-dom";

import { sendUserRegisterData } from "../../services/authService";

import logoImg from "../../assets/chillsrestaurant-no-background.jpeg"

import RegisterForm from "../../components/Forms/RegisterForm/RegisterForm";

import "../RegisterPage/register-page.css";

const RegisterPage = () => {
  // Get login function from AuthProvider

  // Get navigate function
  const navigate = useNavigate();

  // Function to handle login
  const handleRegister = async (registerData) => {
    try {
      let newUser = {
        employeeId: "",
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        // dob: registerData.dob,
        email: registerData.email,
        password: registerData.password,
        role: "",
      };
      // Send login data to the server.
      const { result, username } = await sendUserRegisterData(newUser);

      // If response is successful, navigate to login page.
      if (result === "success") {
        console.log(username);
        navigate("/login", { replace: true });
        return true;
      }
      // Handle unsuccessful registration.
      return false;
    } catch (error) {
      // Handle errors.
      console.error("Failed to register:", error);
      return false;
    }
  };

  return (
    <div className="register-page">
      <div className="login-logo">
        <img
          src={logoImg}
          alt="Logo"
        />
      </div>
      <main>
        <RegisterForm onRegisterAttempt={handleRegister} />
      </main>
    </div>
  );
};

export default RegisterPage;
