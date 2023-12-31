import React from "react";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormField from "../../UI/FormField/FormField";
import FormButton from "../../UI/FormButton/FormButton";

import "./register-form.css";

// -------------------------------------------------- Variables and Constants -------------------------------------------------->

// Default login form state data
const defaultRegisterData = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  password: "",
  rePassword: "",
};

// Error messages for form validation
const errorMessages = {
  firstName:
    "First name must have at least 2 characters and contain only letters.",
  lastName:
    "Last name must have at least 2 characters and contain only letters.",
  dob: "Date of birth is required.",
  email: "Invalid email address.",
  password:
    "Password must contain at least 8 characters, one uppercase and lowercase letter, one number and one special character.",
  rePassword: "Passwords do not match.",
};

// Regular expressions for form validation
const regExpressions = {
  firstNameRegex: /^[A-Za-z]{2,}$/,
  lastNameRegex: /^[A-Za-z]{2,}$/,
  emailRegex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
};

// Validation schema for formik
const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(regExpressions.firstNameRegex, errorMessages.firstName)
    .required("First name is required"),

  lastName: Yup.string()
    .matches(regExpressions.lastNameRegex, errorMessages.lastName)
    .required("Last name is required"),

  dob: Yup.string().required("Date of birth is required"),

  email: Yup.string()
    .matches(regExpressions.emailRegex, errorMessages.email)
    .required("Email is required"),

  password: Yup.string()
    .matches(regExpressions.passwordRegex, errorMessages.password)
    .required("Password is required"),

  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], errorMessages.rePassword)
    .required("Password confirmation is required"),
});

// ---------------------------------------------------- LoginForm Component ---------------------------------------------------->

const RegisterForm = ({ onRegisterAttempt }) => {
  // Formik hook, for handling form state, validation and submission.
  const formik = useFormik({
    initialValues: defaultRegisterData,
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  // -------------------------------------------------- Form Handlers -------------------------------------------------->

  // Function to handle form submission
  const handleFormSubmit = async (values) => {
    if (typeof onRegisterAttempt === 'function') {
      const success = await onRegisterAttempt(values);
      if (!success) {
        // Handle unsuccessful register
      }
    } else {
      console.error('onRegisterAttempt is not a function');
      // Handle the error appropriately
    }
  };

  // --------------------------------------------------      JSX      -------------------------------------------------->
  return (
    <div className="register-form">
      <header className="register-header">
        <h1>Create Account</h1>
      </header>
      <form onSubmit={formik.handleSubmit}>
        <div className="field-row">
          <FormField
            label="First Name"
            className=""
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder="Enter first name"
            aria-label="Enter first name"
            errors={formik.errors}
            touched={formik.touched}
          />

          <FormField
            label="Last Name"
            className=""
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            placeholder="Enter last name"
            aria-label="Enter last name"
            errors={formik.errors}
            touched={formik.touched}
          />
        </div>

        <div className="field-row">
          <FormField
            label="Date of Birth"
            className="register-field"
            type="date"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            placeholder="Enter date of birth"
            aria-label="Enter date of birth"
            errors={formik.errors}
            touched={formik.touched}
          />

          <FormField
            label="Email"
            className="register-field"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter email"
            aria-label="Enter email"
            errors={formik.errors}
            touched={formik.touched}
          />
        </div>

        <div className="field-row">
          <FormField
            label="Password"
            className="register-field"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter password"
            aria-label="Enter password"
            errors={formik.errors}
            touched={formik.touched}
          />

          <FormField
            label="Confirm Password"
            className="register-field"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            placeholder="Confirm password"
            aria-label="Confirm password"
            errors={formik.errors}
            touched={formik.touched}
          />
        </div>

        <FormButton
          className="form-btn register-btn"
          type="submit"
          name="loginBtn"
          text="Create Account"
        />

        <ul className="register-aux-links">
          <li className="login-text">
            {`Already have an account? `}
            <Link to="/login" className="link">
              Login
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterForm;
