
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";


import "./user-edit-modal.css";

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

// Schema for edit fields validation
const userSchema = Yup.object().shape({
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
});

const UserEditModal = ({ user, onClose, onSave }) => {
  // State to store the uploaded image
  const [uploadedImage, setUploadedImage] = useState(null);

  // Formik hook to handle the edit fields
  const formik = useFormik({
    initialValues: {
      id: user.id,
      image: user.image,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      // Create a new FormData object
      const formData = new FormData();
      const userData = { ...values };

      // Append image to FormData
      if (values.image) {
        formData.append("image", values.image);
      }

      // Append values to FormData
      for (const key in values) {
        formData.append(key, userData[key]);
      }

      // Call the onCreate function
      try {
        await onSave(formData, userData);
      } catch (error) {
        console.error("Error adding the new item:", error);
      }
    },
  });

  // Function to handle the close button click
  const handleCloseButtonClick = () => {
    formik.resetForm();
    onClose();
  };

  // Function to handle the image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imgFile);
      setUploadedImage(imageUrl);
      formik.setFieldValue("image", imgFile);
    }
  };

  return (
    <div className="user-modal">
      <div className="user-modal-content">
        <form className="user-modal-form" onSubmit={formik.handleSubmit}>
          <div className="user-modal-header">
            <img
              src={uploadedImage || formik.values.image}
              alt={`${formik.values.name}`}
              className="user-modal-image"
            />
            <label htmlFor="image-upload" className="image-upload-label">
              Change Image
            </label>
            <input
              id="image-upload"
              className="edit-image-upload"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="user-modal-details">
            <label className="field-label">
              First Name:
              <input
                name="firstName"
                className="edit-field"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <div className="edit-field-error-msg">
                {formik.errors.firstName && formik.touched.firstName
                  ? formik.errors.firstName
                  : ""}
              </div>
            </label>

            <label className="field-label">
              Last Name:
              <input
                name="lastName"
                className="edit-field"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              <div className="edit-field-error-msg">
                {formik.errors.lastName && formik.touched.lastName
                  ? formik.errors.lastName
                  : ""}
              </div>
            </label>

            <label className="field-label">
              Date of Birth
              <input
                type="date"
                name="dob"
                className="edit-field"
                value={formik.values.dob}
                onChange={formik.handleChange}
              />
              <div className="edit-field-error-msg">
                {formik.errors.dob && formik.touched.dob
                  ? formik.errors.dob
                  : ""}
              </div>
            </label>

            <label className="field-label">
              Email
              <input
                type="email"
                name="email"
                className="edit-field"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div className="edit-field-error-msg">
                {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : ""}
              </div>
            </label>

            <label className="field-label">
              Password
              <input
                type="password"
                name="password"
                className="edit-field"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="edit-field-error-msg">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : ""}
              </div>
            </label>

            <label className="field-label">
              Role:
              <select
                name="role"
                className="edit-field"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
                <option value="Customer">Customer</option>
              </select>
            </label>
          </div>

          <div className="item-modal-actions">
            <button
              className="modal-action-button modal-cancel-button"
              type="button"
              onClick={handleCloseButtonClick}
            >
              Close
            </button>
            <button
              type="submit"
              className="modal-action-button modal-save-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
