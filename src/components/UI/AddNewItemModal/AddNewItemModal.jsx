import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ResultModal from "../ResultModal/ResultModal";

import "./add-new-item-modal.css";

const itemInitialValues = {
  image: null,
  name: "",
  price: "",
  description: "",
  category: "Appetizers",
  availability: "Available",
};

// Schema for edit fields validation
const menuItemSchema = Yup.object().shape({
  name: Yup.string()
    .max(40, "Name must be at most 40 characters long")
    .required("Name is required."),
  price: Yup.string()
    .matches(
      /^\d+\.\d{2}$/,
      "Price must be in the following format (e.g., 1.00, 12.99)"
    )
    .test(
      "is-not-zero",
      "Price cannot be zero",
      (value) => parseFloat(value) > 0
    )
    .max(6, "Price must be at most 6 characters long")
    .required("Price is required."),
  description: Yup.string()
    .max(100, "Description must be at most 100 characters long")
    .required("Description is required."),
});

const AddNewItemModal = ({ onClose, onCreate }) => {
  // State to store the uploaded image
  const [uploadedImage, setUploadedImage] = useState(null);

  // State to store the confirmation modal visibility
  const [showConfirmation, setShowConfirmation] = useState(false);

  // State to store uodate result, messages, and visibility
  const [result, setResult] = useState("");
  const [resultMessageHeader, setResultMessageHeader] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Formik hook to handle the edit fields
  const formik = useFormik({
    initialValues: itemInitialValues,
    validationSchema: menuItemSchema,
    onSubmit: async (values) => {
      // Create a new FormData object
      const formData = new FormData();

      // Append image to FormData
      if (values.image) {
        formData.append("image", values.image);
      }

      // Append other values to FormData
      for (const key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        }
      }

      // Call the onCreate function
      try {
        const { result } = await onCreate(formData);
        if (result === "success") {
          handleUpdateResponse(result);
        } else {
          handleUpdateResponse("failed");
        }
      } catch (error) {
        console.error("Error adding the new item:", error);
      }
    },
  });

  // Function to reset the item state
  const resetItemState = () => {
    formik.resetForm();
  };

  // Function to handle the close button click
  const handleCloseButtonClick = () => {
    formik.resetForm();
    onClose();
  };

  // Function to handle the save button click
  const handleSaveAttempt = () => {
    setShowConfirmation(true);
  };

  // Function to handle the confirm button click in the confirmation modal
  const handleConfirmSave = () => {
    setShowConfirmation(false);
    formik.handleSubmit();
    resetItemState();
  };

  // Function to handle the cancel button click in the confirmation modal
  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  // Function to handle the image change
const handleImageChange = e => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result); // Display the image preview
      formik.setFieldValue("image", reader.result); // Set the Base64 string
    };
    reader.readAsDataURL(file); // Converts the file to a Base64 string
  }
};




  // Function to handle the update response
  const handleUpdateResponse = (updateResult) => {
    if (updateResult === "success") {
      setResult(updateResult);
      setResultMessageHeader("Item Added Successfully!");
      setResultMessage(
        `${formik.values.name} was successfully added to the menu!`
      );
    } else if (updateResult === "failed") {
      setResult("failed");
      setResultMessageHeader("Error adding item");
      setResultMessage(
        `There was an error while adding the item to the menu, please try again.`
      );
    } else {
      setResult("unexpected");
      setResultMessageHeader("An unexpected error occurred");
      setResultMessage(
        `There was an unexpected error while adding the item to the menu, please try again.`
      );
    }

    setShowResult(true);
  };

  return (
    <div className="menu-item-modal">
      <div className="modal-content">
        <form className="item-modal-form" onSubmit={formik.handleSubmit}>
          <div className="modal-header">
            {uploadedImage && (
              <img
                src={uploadedImage || ""}
                alt={`${formik.values.name}`}
                className="item-modal-image"
              />
            )}
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
          <div className="item-modal-details">
            <div className="item-modal-name-price">
              <label className="item-label">
                Name:
                <input
                  name="name"
                  type="text"
                  className="edit-field"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <div className="edit-field-error-msg">
                  {formik.errors.name && formik.touched.name
                    ? formik.errors.name
                    : ""}
                </div>
              </label>
              <label className="item-label">
                Price:
                <input
                  name="price"
                  type="text"
                  className="edit-field"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                <div className="edit-field-error-msg">
                  {formik.errors.price && formik.touched.price
                    ? formik.errors.price
                    : ""}
                </div>
              </label>
            </div>

            <div className="item-modal-description">
              <label className="item-label">Description: </label>
              <div className="edit-field-wrapper">
                <textarea
                  name="description"
                  className="edit-field"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                <div className="edit-field-error-msg">
                  {formik.errors.description && formik.touched.description
                    ? formik.errors.description
                    : ""}
                </div>
              </div>
            </div>

            <div className="item-modal-category">
              <label className="item-label">Category: </label>
              <select
                name="category"
                className="edit-field"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                <option value="Appetizers">Appetizers</option>
                <option value="Entrees">Entrees</option>
                <option value="Sides">Sides</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <div className="item-modal-availability">
              <label className="item-label">Availability: </label>
              <select
                name="availability"
                className="edit-field"
                value={formik.values.availability}
                onChange={formik.handleChange}
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
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
              onClick={handleSaveAttempt}
            >
              Add New Item
            </button>
          </div>
        </form>

        <ConfirmationModal
          isOpen={showConfirmation}
          onCancel={handleCancelSave}
          onConfirm={handleConfirmSave}
          message="Are you sure you want to save these changes?"
        />
        <ResultModal
          isOpen={showResult}
          result={result}
          messageHeader={resultMessageHeader}
          message={resultMessage}
          onClose={() => setShowResult(false)}
        />
      </div>
    </div>
  );
};

export default AddNewItemModal;
