import React from "react";
import { useNavigate } from "react-router-dom";

import { sendUserRegisterData } from "../../services/authService";

import RegisterForm from "../../components/Forms/RegisterForm/RegisterForm";

import "../RegisterPage/register-page.css";

const RegisterPage = () => {
  // Get login function from AuthProvider
  const { register } = useAuth();

  // Get navigate function
  const navigate = useNavigate();

  // Function to handle login
  const handleRegister = async (registerData) => {
    try {
      let newUser = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        // dob: registerData.dob,
        email: registerData.email,
        password: registerData.password,
      };
      // Send login data to the server.
      const { result, username } = await sendUserRegisterData(newUser);

      // If response is successful, navigate to login page.
      if (response.result === "success") {
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
      <RegisterForm onRegisterAttempt={handleRegister} />
    </div>
  );
};

export default RegisterPage;
