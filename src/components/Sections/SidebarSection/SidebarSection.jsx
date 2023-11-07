import React from "react";

import UserProfile from "../../../components/UI/UserProfile/UserProfile";
import SidebarNav from "../../../components/UI/SidebarNav/SidebarNav";

import "./sidebar-section.css";

const SidebarSection = () => {
  return <div className="sidebar-container">
    <UserProfile
      name="John"
      profileImg="https://randomuser.me/api/portraits/men/1.jpg"
    />
    <SidebarNav />
  </div>;
};

export default SidebarSection;
