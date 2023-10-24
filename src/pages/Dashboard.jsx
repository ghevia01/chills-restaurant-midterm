import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import UserProfile from "../components/UserProfile/UserProfile";
import SidebarNav from "../components/SidebarNav/SidebarNav";
import MainContent from "../components/MainContent/MainContent";
import MenuSection from "../components/MenuSection/MenuSection";

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
          <MenuSection/>
        </MainContent>
      </div>
    </div>
  );
};

export default Dashboard;
