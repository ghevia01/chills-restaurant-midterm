import React from "react";
import PropTypes from 'prop-types';
import "./order-card-styles.css";

const OrderCard = ({ order: { number, submitTime, owner, status, items, notes }}) => {
  return (
    <div className="order-card">
      <header className="order-card-header">
        <span>{`Order #${number}`}</span>
        <span>{`Time: ${submitTime}`}</span>
        <span>{`Owner: ${owner}`}</span>
        <span>{`Status: ${status}`}</span>
      </header>
      <section className="order-items-container">
        {items.map((item, index) => (
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
        ))}
      </section>
      <footer className="order-card-notes">
        <span>{`Notes: ${notes}`}</span>
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
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    notes: PropTypes.string
  }).isRequired
};

export default OrderCard;
