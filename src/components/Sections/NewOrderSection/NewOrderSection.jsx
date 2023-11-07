import React, { useState, useEffect } from 'react';

import { submitOrder, getOrders  } from "../../../services/OrderServices";

import OrderTab from '../../Layouts/OrderTab/OrderTab';
import MenuSection from '../MenuSection/MenuSection';

import "./new-order-section-styles.css";

const NewOrderSection = () => {

    // State to store the orders
    const [orders, setOrders] = useState([]);

    // Function to fetch all orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                if (response.result === 'success') {
                    setOrderItems(response.orders); // Set the orders state with fetched orders
                } else {
                    // Handle failure (e.g., show an error message to the user)
                    console.error('Failed to load orders', response.message);
                }
            } catch (error) {
                // Handle errors that occur during the request (e.g., network errors)
                console.error('Error loading orders:', error);
            }
        };

        fetchOrders();
    }, []); // Empty dependency array to run only once on component mount


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
                    setOrderItems([response.orders]); // Clear the orders state after successful submission
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
