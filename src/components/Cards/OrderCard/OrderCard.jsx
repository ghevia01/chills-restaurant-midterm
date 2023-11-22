import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";

import { updateOrder } from "../../../services/updateOrderService";
import { orderStatusOptions } from "../../../constants/orderStatusOptions";
import { employees } from "../../../constants/employees";

import PropTypes from "prop-types";
import "./order-card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPenToSquare,
  faCircleXmark,
  faTrashCan,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const OrderCard = ({
  order: { number, submitTime, owner, status, items = [], notes },
}) => {
  // Hook to get the user role
  const { userRole } = useAuth();
  const isUserAdmin = true;

  // States to keep track of the items, owner, and status
  const [initialOrder, setInitialOrder] = useState({
    owner,
    status,
    items,
    notes,
  });
  const [orderItems, setOrderItems] = useState([...items]);
  const [orderOwner, setOrderOwner] = useState(owner);
  const [orderStatus, setOrderStatus] = useState(status);

  // State to keep track of the edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // State to keep track of the save message
  const [saveMessage, setSaveMessage] = useState("");

  // Function to toggle the edit mode
  const enableEditMode = () => {
    if (true) {
      setInitialOrder({
        owner: orderOwner,
        status: orderStatus,
        items: orderItems,
        notes,
      });
    }
    setIsEditMode(true);
  };

  // Function to cancel the edit
  const cancelEdit = () => {
    setOrderOwner(initialOrder.owner);
    setOrderStatus(initialOrder.status);
    setOrderItems([...initialOrder.items]);
    setIsEditMode(false);
  };

  // Function to handle changing the status
  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleOwnerChange = (e) => {
    setOrderOwner(e.target.value);
  };

  // Function to handle removing an item
  const handleRemoveItem = (itemIndex) => {
    const updatedItems = orderItems.filter((_, index) => index !== itemIndex);
    setOrderItems(updatedItems);
  };

  // Function to increase the quantity of an item
  const increaseItemQuantity = (itemIndex) => {
    const newItems = [...orderItems];
    newItems[itemIndex].quantity += 1;
    setOrderItems(newItems);
  };

  // Function to decrease the quantity of an item
  const decreaseItemQuantity = (itemIndex) => {
    const newItems = [...orderItems];
    if (newItems[itemIndex].quantity > 1) {
      newItems[itemIndex].quantity -= 1;
      setOrderItems(newItems);
    }
  };

  // Function to handle saving the order
  const handleSave = async () => {
    const updatedOrder = {
      number,
      owner: orderOwner,
      status: orderStatus,
      items: orderItems,
    };

    try {
      const { result, message } = await updateOrder(updatedOrder);
      if (result === "success") {
        console.log("Order updated successfully!");
      } else {
        console.error("There was a problem updating the order:", message);
        // cancelEdit();
      }
    } catch (error) {
      console.error("There was a problem updating the order:", error);
      // cancelEdit();
    }

    setIsEditMode(false);
  };

  return (
    <div className="order-card">
      <header className="order-card-header">
        <span>
          <span className="bold-text">Order </span>#{number}
        </span>
        <span>
          <span className="bold-text">Time: </span>
          {submitTime}
        </span>
        <div className="owner-wrapper">
          <span className="bold-text">Owner: </span>
          {isUserAdmin && isEditMode ? (
            <select
              className="edit-select"
              value={orderOwner}
              onChange={handleOwnerChange}
            >
              {employees.map((employee) => (
                <option key={employee.employeeId} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </select>
          ) : (
            <span>{orderOwner}</span>
          )}
        </div>
        <div className="status-wrapper">
          <span className="bold-text">Status: </span>
          {isEditMode ? (
            <select
              className="edit-select"
              value={orderStatus}
              onChange={handleStatusChange}
            >
              {orderStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <span>{orderStatus}</span>
          )}
        </div>
        <FontAwesomeIcon
          className={isEditMode ? "cancel-icon" : "edit-icon"}
          icon={isEditMode ? faCircleXmark : faPenToSquare}
          onClick={isEditMode ? cancelEdit : enableEditMode}
        />
      </header>
      <section className="order-items-wrapper">
        <div className="order-items-text bold-text">Order Items:</div>
        <div className="order-items">
          {orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <div key={item.id} className="item">
                {isEditMode && (
                  <FontAwesomeIcon
                    className="trash-icon"
                    icon={faTrashCan}
                    onClick={() => handleRemoveItem(index)}
                  />
                )}
                <span className="item-name">{item.name}</span>
                <div
                  className={`item-quantity-controls ${
                    isEditMode ? "edit-mode" : ""
                  }`}
                >
                  {isEditMode && (
                    <FontAwesomeIcon
                      className="quantity-btn plus-icon"
                      icon={faMinus}
                      onClick={() => decreaseItemQuantity(index)}
                    />
                  )}
                  <span className="item-quantity-total">x{item.quantity}</span>
                  {isEditMode && (
                    <FontAwesomeIcon
                      className="quantity-btn minus-icon"
                      icon={faPlus}
                      onClick={() => increaseItemQuantity(index)}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="empty-items-message">No items in this order.</p>
          )}
        </div>
      </section>
      <footer className="order-card-footer">
        <p>
          <span className="bold-text">Notes: </span>
          {`${notes || "None"}`}
        </p>
        {isEditMode && (
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        )}
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
