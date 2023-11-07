import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../../components/UI/Header/Header";
import SidebarSection from "../../components/Sections/SidebarSection/SidebarSection";
import MainContent from "../../components/Layouts/MainContent/MainContent";
import MenuSection from "../../components/Sections/MenuSection/MenuSection";
import ViewOrdersSection from "../../components/Sections/ViewOrdersSection/ViewOrdersSection";
import NewOrderSection from "../../components/Sections/NewOrderSection/NewOrderSection";
import PaymentsSection from "../../components/Sections/PaymentsSection/PaymentsSection";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SidebarSection />
      <div className="main-wrapper">
        <Header />
        <MainContent>
          <Routes>
            <Route index element={<Navigate to="menu" replace />} />
            <Route path="menu" element={<MenuSection />} />
            <Route path="new-order" element={<NewOrderSection />} />
            <Route path="view-orders" element={<ViewOrdersSection />} />
            <Route path="process-payment" element={<PaymentsSection />} />
          </Routes>
        </MainContent>
      </div>
    </div>
  );
};

export default Dashboard;
