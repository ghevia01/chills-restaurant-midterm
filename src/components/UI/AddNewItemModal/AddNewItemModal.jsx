import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ResultModal from "../ResultModal/ResultModal";
import "./add-new-item-modal.css";

const itemInitialValues = {
  image: "",
  name: "",
  price: "",
  description: "",
  category: "Appetizers",
  availability: "Available",
};

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
  const [uploadedImage, setUploadedImage] = useState(null);
  const [modalState, setModalState] = useState({
    showConfirmation: false,
    showResult: false,
    result: "",
    messageHeader: "",
    message: "",
  });
  
  const formik = useFormik({
    initialValues: itemInitialValues,
    validationSchema: menuItemSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        const response = await onCreate(formData);
        handleUpdateResponse(response.result);
      } catch (error) {
        console.error("Error adding the new item:", error);
        handleUpdateResponse("unexpected");
      }
    },
  });

  const handleUpdateResponse = useCallback(
    (updateResult) => {
      setModalState({
        showResult: true,
        result: updateResult,
        messageHeader:
          updateResult === "success"
            ? "Item Added Successfully!"
            : updateResult === "failed"
            ? "Error adding item"
            : "An unexpected error occurred",
        message:
          updateResult === "success"
            ? `${formik.values.name} was successfully added to the menu!`
            : "There was an error while adding the item to the menu, please try again.",
      });
    },
    [formik.values.name]
  );



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  const renderFormField = (fieldType, name, label, options) => {
    return (
      <label className="item-label">
        {label}
        {fieldType === "input" ? (
          <input
            name={name}
            type="text"
            className="edit-field"
            onChange={formik.handleChange}
            value={formik.values[name]}
          />
        ) : fieldType === "textarea" ? (
          <textarea
            name={name}
            className="edit-field"
            onChange={formik.handleChange}
            value={formik.values[name]}
          />
        ) : (
          <select
            name={name}
            className="edit-field"
            onChange={formik.handleChange}
            value={formik.values[name]}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {formik.touched[name] && formik.errors[name] && (
          <div className="edit-field-error-msg">{formik.errors[name]}</div>
        )}
      </label>
    );
  };

  return (
    <div className="menu-item-modal">
      <div className="modal-content">
        <form className="item-modal-form" onSubmit={formik.handleSubmit}>
          <div className="modal-header">
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt={formik.values.name}
                className="item-modal-image"
              />
            )}
            <label htmlFor="image-upload" className="image-upload-label">
              Change Image
            </label>
            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="item-modal-details">
            {renderFormField("input", "name", "Name:")}
            {renderFormField("input", "price", "Price:")}
            {renderFormField("textarea", "description", "Description:")}
            {renderFormField("select", "category", "Category:", [
              "Appetizers",
              "Entrees",
              "Sides",
              "Desserts",
              "Beverages",
            ])}
            {renderFormField("select", "availability", "Availability:", [
              "Available",
              "Unavailable",
            ])}
          </div>
          <div className="item-modal-actions">
            <button
              className="modal-action-button modal-cancel-button"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="modal-action-button modal-save-button"
              type="button"
              onClick={() =>
                setModalState({ ...modalState, showConfirmation: true })
              }
            >
              Add New Item
            </button>
          </div>
        </form>
        <ConfirmationModal
          isOpen={modalState.showConfirmation}
          onCancel={() =>
            setModalState({ ...modalState, showConfirmation: false })
          }
          onConfirm={formik.handleSubmit}
          message="Are you sure you want to save these changes?"
        />
        <ResultModal
          isOpen={modalState.showResult}
          result={modalState.result}
          messageHeader={modalState.messageHeader}
          message={modalState.message}
          onClose={() => setModalState({ ...modalState, showResult: false })}
        />
      </div>
    </div>
  );
};

export default AddNewItemModal;
