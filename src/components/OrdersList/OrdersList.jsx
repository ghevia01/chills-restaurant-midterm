import React from "react";

import OrderCard from "../OrderCard/OrderCard";

import "./orders-list-styles.css";

const OrdersList = ({ orders }) => {
  return (
    <section className="orders-list-container">
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </section>
  );
};

export default OrdersList;
