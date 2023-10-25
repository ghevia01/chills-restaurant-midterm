import React from "react";

import "./user-profile-styles.css";

const UserProfile = ({ name, profileImg }) => {
  return (
    <div className="user-profile-container">
      <div className="profile-img-container">
        <img src={profileImg} alt="User Profile" />
      </div>
      <h3>Hello, {name}</h3>
    </div>
  );
};

export default UserProfile;
