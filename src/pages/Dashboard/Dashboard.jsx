import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../../components/UI/Header/Header";
import Sidebar from "../../components/Layouts/Sidebar/Sidebar";
import UserProfile from "../../components/UI/UserProfile/UserProfile";
import SidebarNav from "../../components/UI/SidebarNav/SidebarNav";
import MainContent from "../../components/Layouts/MainContent/MainContent";
import MenuSection from "../../components/Sections/MenuSection/MenuSection";
import ViewOrdersSection from "../../components/Sections/ViewOrdersSection/ViewOrdersSection";
import CreateOrdersSection from "../../components/Sections/CreateOrdersSection/CreateOrdersSection";
import PaymentsSection from "../../components/Sections/PaymentsSection/PaymentsSection";

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
            <Route path="create-order" element={<CreateOrdersSection />} />
            <Route path="view-orders" element={<ViewOrdersSection />} />
            <Route path="process-payment" element={<PaymentsSection />} />
          </Routes>
        </MainContent>
      </div>
    </div>
  );
};

export default Dashboard;
