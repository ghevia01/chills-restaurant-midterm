import React from "react";
import OrderCard from "../../Cards/OrderCard/OrderCard";
import "./orders-list.css";

const OrdersList = ({ orders }) => {
  return (
    <section className="orders-list-container">
      {orders.map((order, index) => (
        <OrderCard key={order.number?.toString() || index} order={order} />
      ))}
    </section>
  );
};

export default OrdersList;
