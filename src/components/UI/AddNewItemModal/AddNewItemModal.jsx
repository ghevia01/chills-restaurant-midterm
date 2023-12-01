import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ResultModal from "../ResultModal/ResultModal";
import "./add-new-item-modal.css";

// Schema for edit fields validation
const menuItemSchema = Yup.object({
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
    result: "",
    resultMessageHeader: "",
    resultMessage: "",
    showResult: false,
  });

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      price: "",
      description: "",
      category: "Appetizers",
      availability: "Available",
    },
    validationSchema: menuItemSchema,
    onSubmit: async (values) => {
      try {
        const response = await onCreate(convertToFormData(values));
        handleUpdateResponse(response.result);
      } catch (error) {
        console.error("Error adding the new item:", error);
        handleUpdateResponse("unexpected");
      }
    },
  });

  const convertToFormData = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image" || value) {
        formData.append(key, value);
      }
    });
    return formData;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) =>
        formik.setFieldValue("image", event.target.result);
      reader.readAsBinaryString(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateResponse = (result) => {
    const messages = {
      success: [
        "Item Added Successfully!",
        `${formik.values.name} was successfully added to the menu!`,
      ],
      failed: [
        "Error adding item",
        "There was an error while adding the item to the menu, please try again.",
      ],
      unexpected: [
        "An unexpected error occurred",
        "There was an unexpected error while adding the item to the menu, please try again.",
      ],
    };

    const [header, message] = messages[result] || [
      "Unknown Error",
      "An unknown error occurred.",
    ];
    setModalState({
      ...modalState,
      showResult: true,
      result,
      resultMessageHeader: header,
      resultMessage: message,
    });
  };

  const FieldWithError = ({ name, type = "text", label, as }) => (
    <>
      <label className="item-label">
        {label}
        {as === "textarea" ? (
          <textarea
            name={name}
            className="edit-field"
            {...formik.getFieldProps(name)}
          />
        ) : (
          <input
            name={name}
            type={type}
            className="edit-field"
            {...formik.getFieldProps(name)}
          />
        )}
      </label>
      {formik.touched[name] && formik.errors[name] && (
        <div className="edit-field-error-msg">{formik.errors[name]}</div>
      )}
    </>
  );

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
            <FieldWithError name="name" label="Name:" />
            <FieldWithError name="price" label="Price:" />
            <FieldWithError
              name="description"
              label="Description:"
              as="textarea"
            />
            <FieldWithError name="category" label="Category:" as="select" />
            <FieldWithError
              name="availability"
              label="Availability:"
              as="select"
            />
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
          messageHeader={modalState.resultMessageHeader}
          message={modalState.resultMessage}
          onClose={() => setModalState({ ...modalState, showResult: false })}
        />
      </div>
    </div>
  );
};

export default AddNewItemModal;
