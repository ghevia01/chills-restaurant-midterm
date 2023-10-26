import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import UserProfile from "../components/UserProfile/UserProfile";
import SidebarNav from "../components/SidebarNav/SidebarNav";
import MainContent from "../components/MainContent/MainContent";
import MenuSection from "../components/MenuSection/MenuSection";
import OrdersSection from "../components/OrdersSection/OrdersSection";
import PaymentSection from "../components/PaymentSection/PaymentSection";

import "./dashboard-styles.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar>
        <UserProfile
          name="John"
          profileImg="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <SidebarNav />
      </Sidebar>
      <div className="main-wrapper">
        <Header />
        <MainContent>
          <Routes>
            <Route index element={<Navigate to="menu" replace />} />
            <Route path="menu" element={<MenuSection />} />
            <Route path="orders" element={<OrdersSection />} />
            <Route path="payment" element={<PaymentSection />} />
          </Routes>
        </MainContent>
      </div>
    </div>
  );
};

export default Dashboard;
