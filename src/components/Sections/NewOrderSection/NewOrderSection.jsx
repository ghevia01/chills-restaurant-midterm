import React, { useState } from 'react';

import { submitOrder } from "../../../services/OrderServices";

import OrderTab from '../../Layouts/OrderTab/OrderTab';
import MenuSection from '../MenuSection/MenuSection';

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

    // Function to handle submit the orders
        const handleSubmitOrder = async () => {
            // Create the order object to be sent to the backend.
            // This should match the expected structure of your API.
            const newOrder = {
                submitTime:new Date().toISOString(), // ISO string of the current time
                customer: {
                    id: 1 // Replace with actual customer ID
                },
                status: "PENDING", // 
                menuItems: orderItems.map(item => ({ 
                    id: item.id,
                    quantity: item.quantity,
                    notes: item.notes || "" 
                })),
                details: "Some notes here", // You should get this from the user input
            };
    
            try {
                // Use the submitOrder service to send the POST request
                const response = await submitOrder(newOrder);
                if (response.result === 'success') {
                    setOrderItems([response.data]); // Clear the orders state after successful submission
                } else {
                    // Handle failure (e.g., show an error message to the user)
                    console.error('Failed to submit order', response.message);
                }
            } catch (error) {
                // Handle errors that occur during the request (e.g., network errors)
                console.error('Error submitting order:', error);
            }
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
