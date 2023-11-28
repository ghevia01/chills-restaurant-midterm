import React from "react";
import "./result-modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const ResultModal = ({ isOpen, result, messageHeader, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="result-modal-backdrop">
      <div className="result-modal">
        <div className="result-modal-content">
          <div className="result-modal-header">
            <div className="result-modal-icon">
              {result === "success" ? (
                <FontAwesomeIcon className="success-icon" icon={faCheck} />
              ) : (
                <FontAwesomeIcon className="failed-icon"  icon={faTimes} />
              )}
            </div>
            <h3>{messageHeader}</h3>
          </div>
          <div className="result-modal-body">
            <p>{message}</p>
          </div>
          <div className="result-modal-actions">
            <button
              className={result === "success" ? "success-button" : "ok-button"}
              onClick={onClose}
            >
              {result === "success" ? "Great!" : "OK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
