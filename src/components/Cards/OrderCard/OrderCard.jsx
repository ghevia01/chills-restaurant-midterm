import React from "react";
import PropTypes from 'prop-types';
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
        <span>{`Order #${number}`}</span>
        <span>{`Time: ${submitTime}`}</span>
        <span>{`Owner: ${owner}`}</span>
        <span>{`Status: ${status}`}</span>
      </header>
      <section className="order-items-container">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="order-card-item" key={index}>
              <span>{item.name}</span>
              <div className="quantity-control">
                <button 
                  className="item-button--increase" 
                  aria-label={`Increase the quantity of ${item.name}`}>
                  +
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="item-button--decrease" 
                  aria-label={`Decrease the quantity of ${item.name}`}>
                  -
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-items-message">No items in this order.</p>
        )}
      </section>
      <footer className="order-card-notes">
        <span>{`Notes: ${notes || 'None'}`}</span>
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
    notes: PropTypes.string
  }).isRequired
};

export default OrderCard;
