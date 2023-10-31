import React from "react";

import "./order-card-styles.css";

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <span>{`Order #${order.number}`}</span>
        <span>{`Time: ${order.submitTime}`}</span>
        <span>{`Owner: ${order.owner}`}</span>
        <span>{`Status: ${order.status}`}</span>
      </div>
      <div className="order-items-container">
        {order.items.map((item, index) => (
          <span>
            {item.name} {item.quantity}
          </span>
        ))}
      </div>
      <div className="order-notes-container">
        <span>{`Notes: ${order.notes}.`}</span>
      </div>
    </div>
  );
};

export default OrderCard;
