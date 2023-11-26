import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

import "./menu-item-modal.css";

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

const MenuItemModal = ({ item, onSave, onClose }) => {
  // State to store the item data
  const [isEditing, setIsEditing] = useState(false);

  // State to store the uploaded image
  const [uploadedImage, setUploadedImage] = useState(null);

  // State to store the confirmation modal visibility
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Formik hook to handle the edit fields
  const formik = useFormik({
    initialValues: {
      id: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      availability: item.availability,
    },
    validationSchema: menuItemSchema,
    onSubmit: async (values) => {
      try {
        await onSave(values);
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving item:", error);
      }
    },
    enableReinitialize: true,
  });

  // Function to handle the close button click
  const handleCloseButtonClick = () => {
    formik.resetForm();
    onClose();
  };

  // Function to handle edit button click
  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  // Function to handle the cancel button click
  const handleCancelButtonClick = () => {
    resetItemState();
  };

  // Function to handle the save button click
  const handleSaveAttempt = () => {
    setShowConfirmation(true);
  };

  // Function to handle the confirm button click in the confirmation modal
  const handleConfirmSave = () => {
    setShowConfirmation(false);
    formik.handleSubmit();
  };

  // Function to handle the cancel button click in the confirmation modal
  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  // Function to handle the image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];

      // Create a FileReader to convert the image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        // Update the uploadedImage state
        setUploadedImage(reader.result);

        // Update the image field value
        formik.setFieldValue("image", base64String);
      };

      // Read the image file
      reader.readAsDataURL(imgFile);
    }
  };

  // Function to reset the item state
  const resetItemState = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  return (
    <div className="menu-item-modal">
      <div className="modal-content">
        {isEditing ? (
          <form className="item-modal-form">
            <div className="modal-header">
              <img
                src={
                  uploadedImage ||
                  `data:image/jpeg;base64,${formik.values.image}`
                }
                alt={`${formik.values.name}`}
                className="item-modal-image"
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
                onClick={handleCancelButtonClick}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-action-button modal-save-button"
                onClick={handleSaveAttempt}
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="modal-header">
              <img
                src={uploadedImage || formik.values.image}
                alt={`${formik.values.name}`}
                className="item-modal-image"
              />
            </div>
            <div className="item-modal-details">
              <div className="item-modal-name-price">
                <h2 className="item-modal-name">{formik.values.name}</h2>
                <span className="item-modal-price">${formik.values.price}</span>
              </div>

              <div className="item-modal-description">
                <span className="item-label">Description: </span>
                <span className="item-text">{formik.values.description}</span>
              </div>

              <div className="item-modal-category">
                <span className="item-label">Category: </span>
                <span className="item-text">{formik.values.category}</span>
              </div>

              <div className="item-modal-availability">
                <span className="item-label">Availability: </span>
                <span className="item-text">{formik.values.availability}</span>
              </div>
            </div>

            <div className="item-modal-actions">
              <button
                className="modal-action-button modal-remove-button"
                onClick={() => {}}
              >
                Remove Item
              </button>
              <div className="buttons-wrapper">
                <button
                  className="modal-action-button modal-close-button"
                  onClick={handleCloseButtonClick}
                >
                  Close
                </button>
                <button
                  className="modal-action-button modal-edit-button"
                  onClick={handleEditButtonClick}
                >
                  Edit
                </button>
              </div>
            </div>
          </>
        )}
        <ConfirmationModal
          isOpen={showConfirmation}
          onCancel={handleCancelSave}
          onConfirm={handleConfirmSave}
          message="Are you sure you want to save these changes?"
        />
      </div>
    </div>
  );
};

export default MenuItemModal;
