import React from "react";
import "./users-list.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGear, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const UsersList = ({ users, onEditAccount, onRemoveUser }) => {
  return (
    <div className="user-list">
      <div className="user-item-header">
        <div className="user-name-header">Name</div>
        <div className="user-role-header">Role</div>
        <div className="user-actions-header">Actions</div>
      </div>
      {users.map((user) => (
        <div className="user-item" key={user.id}>
          <div className="user-details">
            <img
              src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
              alt={`${user.name}`}
              className="user-avatar"
            />
            <div className="user-name-email-container">
              <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className="user-role-container">
              <span className={`user-role ${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </div>
          </div>
          <div className="user-actions">
            <button
              className="modify-button"
              onClick={() => onEditAccount(user.id)}
            >
              <FontAwesomeIcon
                className="modify-account-icon"
                icon={faGear}
              />
              Edit Account
            </button>
            <button
              className="remove-button"
              onClick={() => onRemoveUser(user.id)}
            >
              <FontAwesomeIcon
                className="remove-user-icon"
                icon={faCircleXmark}
              />
              Disable User
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
