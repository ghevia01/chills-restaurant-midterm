import React, { useState } from "react";
import PropTypes from "prop-types";
import "./order-card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPenToSquare,
  faCircleXmark,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const OrderCard = ({ order }) => {
  const { number, submitTime, owner, status, items = [], notes } = order; // Default items to an empty array if undefined

  // State to keep track of the edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Function to toggle the edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="order-card">
      <header className="order-card-header">
        <span>{`Order #${number}`}</span>
        <span>{`Time: ${submitTime}`}</span>
        <span>{`Owner: ${owner}`}</span>
        <span>{`Status: ${status}`}</span>
        <FontAwesomeIcon
          className={isEditMode ? "cancel-icon" : "edit-icon"}
          icon={isEditMode ? faCircleXmark : faPenToSquare}
          onClick={toggleEditMode}
        />
      </header>
      <section className="order-items-container">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="item">
              {isEditMode && (
                <FontAwesomeIcon className="trash-icon" icon={faTrashCan} />
              )}
              <span className="item-name">{item.name}</span>
              <div
                className={`item-quantity-controls ${
                  isEditMode ? "edit-mode" : ""
                }`}
              >
                {isEditMode && (
                  <button className="quantity-btn minus-btn">-</button>
                )}
                <span className="item-quantity-total">x{item.quantity}</span>
                {isEditMode && (
                  <button className="quantity-btn plus-btn">+</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="empty-items-message">No items in this order.</p>
        )}
      </section>
      <footer className="order-card-notes">
        <span>{`Notes: ${notes || "None"}`}</span>
      </footer>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.number.isRequired,
    submitTime: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    notes: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
