import React from 'react';

import './order-tab-styles.css';

const OrderTab = ({ orders, onIncrement, onDecrement, onClearOrder, onSubmitOrder }) => {

    const subtotal = orders.reduce((acc, order) => acc + order.price * order.quantity, 0);
    const taxRate = 0.115;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    return (
        <div className="order-tab">
            <header className="order-header">
                <h2>Order</h2>
            </header>
            <div className="order-list">
                {orders.map(order => (
                    <div key={order.id} className="order-container">
                        <div className="order-item">
                            <div className="order-item-name">
                                <h3>{order.name}</h3>
                            </div>
                            <div className="quantity-controls">
                                <button onClick={() => onDecrement(order.id)}>-</button>
                                <span className='quantity-total'>x{order.quantity}</span>
                                <button onClick={() => onIncrement(order.id)}>+</button>
                            </div>
                            <div className="order-item-price">
                                ${order.price.toFixed(2)}
                            </div>
                        </div>
                        {order.details && (
                            <div className="order-item-details">
                                <p>{order.details}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="order-summary">
                <div className="summary-item">
                    <h4>Subtotal</h4>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <h4>Tax (11.5%)</h4>
                    <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <h4>Total</h4>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <div className="order-actions">
                <button className="clear-btn" onClick={onClearOrder}>Clear</button>
                <button className="submit-btn" onClick={onSubmitOrder}>Submit</button>
            </div>
        </div>
    );
};

export default OrderTab;
