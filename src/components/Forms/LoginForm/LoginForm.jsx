import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormField from "../../UI/FormField/FormField";
import FormButton from "../../UI/FormButton/FormButton";

import "./login-form.css";

// -------------------------------------------------- Variables and Constants -------------------------------------------------->

// Default login form state data
const defaultLoginData = {
  employeeId: "",
  password: "",
};

// Validation schema for formik
const loginValidationSchema = Yup.object({
  employeeId: Yup.string().required("Enter a valid employee ID."),
  password: Yup.string().required("Enter a valid password."),
});

// ---------------------------------------------------- LoginForm Component ---------------------------------------------------->

const LoginForm = ({ onLoginAttempt }) => {

  // Formik hook, for handling form state, validation and submission.
  const formik = useFormik({
    initialValues: defaultLoginData,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  // -------------------------------------------------- Form Handlers -------------------------------------------------->

  // Function to handle form submission
  const handleFormSubmit = async (values) => {
      const success = await onLoginAttempt(values);
      if (!success) {
        // Handle unsuccessful login (e.g., show an error message to the user).
      }
  };

  // --------------------------------------------------      JSX      -------------------------------------------------->
  return (
    <div className="login-form">
      <header className="login-header">
        <h1>Welcome back!</h1>
      </header>
      <form
        onSubmit={formik.handleSubmit}
      >
        <FormField
          label="Employee Id"
          type="text"
          name="employeeId"
          value={formik.values.employeeId}
          onChange={formik.handleChange}
          aria-label="Enter employee Id"
          errors={formik.errors}
          touched={formik.touched}
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          aria-label="Enter password"
          errors={formik.errors}
          touched={formik.touched}
        />

        <FormButton
          className="form-btn"
          type="submit"
          name="loginBtn"
          text="Sign in"
        />

        <ul className="login-aux-links">
          <li className="register-text">
            {`Don't have an account yet? `}
            <Link to="/register" className="link">
              Sign up
            </Link>
          </li>

          <li className="access-help-text">
            <Link to="/login" className="link">
              Can't access your account?
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

// Setting PropTypes for the LoginForm component
LoginForm.propTypes = {
  onLoginAttempt: PropTypes.func.isRequired,
};

export default LoginForm;
