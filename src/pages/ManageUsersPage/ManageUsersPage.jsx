import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAddModal from "../../components/UI/UserAddModal/UserAddModal";
import UserEditModal from "../../components/UI/UserEditModal/UserEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./manage-users-page.css";
import UsersList from "../../components/Layouts/UsersList/UsersList";

import { getAllUsersData, addNewUser, updateUser, deleteUser } from "../../services/userServices";

const ManageUsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsersData();
      if (response.result === "success") {
        setUsers(response.data);
      } else {
        setErrorMessage(response.message || 'Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleEditAccount = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setSelectedUser(userToEdit);
    setIsEditUserModalOpen(true);
  };

  const handleEditSave = async (formData, updatedUserData) => {
    const response = await updateUser(updatedUserData);
    if (response.result === "success") {
      setUsers(users.map((user) => (user.id === updatedUserData.id ? updatedUserData : user)));
      setErrorMessage('');
    } else {
      setErrorMessage(response.message || 'Failed to update user');
    }
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserSave = async (formData, newUserData) => {
    const response = await addNewUser(newUserData);
    if (response.result === "success") {
      setUsers([...users, response.data]);
      setErrorMessage('');
    } else {
      setErrorMessage(response.message || 'Failed to add user');
    }
    setIsAddUserModalOpen(false);
  };

  const handleRemoveUser = async (userId) => {
    const response = await deleteUser({ id: userId });
    if (response.result === "success") {
      setUsers(users.filter((user) => user.id !== userId));
      setErrorMessage('');
    } else {
      setErrorMessage(response.message || 'Failed to delete user');
    }
  };

  return (
    <div className="manage-users-page">
      <div className="main-page-header">
        <button
          className="go-to-dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          <FontAwesomeIcon className="back-arrow-icon" icon={faArrowLeft} />
        </button>
        <h1>Back to Dashboard</h1>
      </div>
      <div className="main-page-content">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="users-list-container">
          <div className="users-list-header">
            <h2>User Management</h2>
            <button className="add-user-button" onClick={handleAddUser}>
              Add User
            </button>
          </div>
          <UsersList
            users={users}
            onEditAccount={handleEditAccount}
            onRemoveUser={handleRemoveUser}
          />
        </div>
      </div>
      {isEditUserModalOpen && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setIsEditUserModalOpen(false)}
          onSave={handleEditSave}
        />
      )}
      {isAddUserModalOpen && (
        <UserAddModal
          onClose={() => setIsAddUserModalOpen(false)}
          onCreate={handleAddUserSave}
        />
      )}
    </div>
  );
};

export default ManageUsersPage;
