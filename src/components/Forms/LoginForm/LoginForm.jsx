import React from "react";
import { useFormik } from "formik";
import { sendUserLoginData } from "../../../services/authService";

import * as Yup from "yup";

import InputField from "../../UI/InputField/InputField";
import Button from "../../UI/Button/Button";

import "./login-form-styles.css";

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

const LoginForm = () => {
  // Formik hook, for handling form state, validation and submission.
  const formik = useFormik({
    initialValues: defaultLoginData,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  // -------------------------------------------------- Form Handlers -------------------------------------------------->

  // Function for handling form submission
  const handleFormSubmit = async (values) => {
    // Send form data to backend
    const { result, data, message } = await sendUserLoginData(values);

    if (result === "success") {
      console.log(`successful login, ${JSON.stringify(data)}`);
      // TODO: Add code to log the user in
    } else {
      console.log(`unsuccessful login, ${message}`);
      // TODO: Add code to display error message
    }

    // Reset form after submission (This is to be removed when the form is connected to the backend)
    formik.resetForm();
  };

  // --------------------------------------------------      JSX      -------------------------------------------------->
  return (
    <form
      className="login-form"
      onSubmit={formik.handleSubmit}
    >
      <InputField
        label="Employee ID"
        className=""
        type="text"
        name="employeeId"
        value={formik.values.employeeId}
        onChange={formik.handleChange}
        placeholder="Enter employee ID"
        aria-label="Enter employee ID"
        errors={formik.errors}
        touched={formik.touched}
      />

      <InputField
        label="Password"
        className=""
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Enter password"
        aria-label="Enter password"
        errors={formik.errors}
        touched={formik.touched}
      />

      <Button
        className="form-btn"
        type="submit"
        name="loginBtn"
        text="Sign in"
      />
    </form>
  );
};

export default LoginForm;
