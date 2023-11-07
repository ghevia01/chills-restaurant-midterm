import React, { useState } from 'react';

import MenuSection from '../MenuSection/MenuSection';
import OrderTab from '../../Layouts/OrderTab/OrderTab';

import "./new-order-section.css";

const NewOrderSection = () => {

    // State to store the orders
    const [orderItems, setOrderItems] = useState([]);

    // Function to handle adding new items to the order
    const handleAddToOrder = (menuItem) => {
        const existingOrder = orderItems.find(orderItem => orderItem.id === menuItem.id);
        if (existingOrder) {
            setOrderItems(prevOrderItems =>
                prevOrderItems.map(orderItem =>
                    orderItem.id === menuItem.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
                )
            );
        } else {
            const newOrderItem = {
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
            };

            setOrderItems(prevOrderItems => [...prevOrderItems, newOrderItem ]);
        }
    };

    // Function to handle incrementing the quantity of an order
    const handleIncrement = (orderId) => {
        setOrderItems(prevOrderItems =>
            prevOrderItems.map(orderItem =>
                orderItem.id === orderId ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
            )
        );
    };

    // Function to handle decrementing the quantity of an order
    const handleDecrement = (orderId) => {
        setOrderItems(prevOrderItems =>
            prevOrderItems
                .map(orderItem =>
                    orderItem.id === orderId ? { ...orderItem, quantity: orderItem.quantity - 1 } : orderItem
                )
                .filter(orderItem => orderItem.quantity > 0)
        );
    };

    // Function to handle clearing the orders
    const handleClearOrder = () => {
        setOrderItems([]);
    };

    // Function to handle clearing the orders
    const handleSubmitOrder = () => {

        setOrderItems([]);
    };

    return (
        <section className="create-orders-section">
            <div className="menu-wrapper">
                <MenuSection isOrdering={true} onAddToOrder={handleAddToOrder} />
            </div>
            <div className="order-tab-wrapper">
                <OrderTab
                    orderItems={orderItems}
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
