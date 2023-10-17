import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import UserProfile from "../components/UserProfile/UserProfile";
import SidebarNav from "../components/SidebarNav/SidebarNav";
import MainContent from "../components/MainContent/MainContent";
import TabNavigation from "../components/TabNavigation/TabNavigation";
import Searchbar from "../components/Searchbar/Searchbar";

import "./dashboard-styles.css";

const menuTabs = ["Appetizers", "Entrees", "Sides", "Desserts", "Beverages"];

// const orderTabs = [
//   "All",
//   "Pending",
//   "In Progress",
//   "Pending Payment",
//   "Completed",
//   "Closed",
// ];

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
          <div className="nav-wrapper">
            <TabNavigation tabs={menuTabs} />
            <Searchbar />
          </div>
          {/* <ProductList>
          <ProductItem />
          {Repeat ProductItem for each product}
        </ProductList>
        <OrderSummary>
          <OrderItem />
          {Repeat OrderItem for each item in the order}
          <OrderTotal />
        </OrderSummary> */}
        </MainContent>
      </div>
    </div>
  );
};

export default Dashboard;
