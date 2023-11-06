import React, { useState } from 'react';

import MenuSection from '../MenuSection/MenuSection';
import OrderTab from '../../Layouts/OrderTab/OrderTab';

import "./new-order-section-styles.css";

const NewOrderSection = () => {

    // State to store the orders
    const [orders, setOrders] = useState([]);

    // Function to handle adding new items to the order
    const handleAddToOrder = (menuItem) => {
        const existingOrder = orders.find(order => order.id === menuItem.id);
        if (existingOrder) {
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === menuItem.id ? { ...order, quantity: order.quantity + 1 } : order
                )
            );
        } else {
            setOrders(prevOrders => [...prevOrders, { ...menuItem, quantity: 1 }]);
        }
    };

    // Function to handle incrementing the quantity of an order
    const handleIncrement = (orderId) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, quantity: order.quantity + 1 } : order
            )
        );
    };

    // Function to handle decrementing the quantity of an order
    const handleDecrement = (orderId) => {
        setOrders(prevOrders =>
            prevOrders
                .map(order =>
                    order.id === orderId ? { ...order, quantity: order.quantity - 1 } : order
                )
                .filter(order => order.quantity > 0)
        );
    };

    // Function to handle clearing the orders
    const handleClearOrder = () => {
        setOrders([]);
    };

    // Function to handle clearing the orders
    const handleSubmitOrder = () => {
        setOrders([]);
    };


    return (
        <section className="create-orders-section">
            <div className="menu-wrapper">
                <MenuSection isOrdering={true} onAddToOrder={handleAddToOrder} />
            </div>
            <div className="order-tab-wrapper">
                <OrderTab
                    orders={orders}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onClearOrder={handleClearOrder}
                    onSubmitOrder={handleSubmitOrder}
                />
            </div>
        </section>
    );
};

export default NewOrderSection;
