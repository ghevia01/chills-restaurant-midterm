import React from "react";
import "./confirmation-modal.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-backdrop">
      <div className="confirmation-modal">
        <div className="confirmation-modal-content">
          <div className="confirmation-modal-header">
            <h3>Confirm</h3>
          </div>
          <div className="confirmation-modal-body">
            <p>{message}</p>
          </div>
          <div className="confirmation-modal-actions">
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="confirm-button"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
