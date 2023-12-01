
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserAddModal from "../../components/UI/UserAddModal/UserAddModal";
import UserEditModal from "../../components/UI/UserEditModal/UserEditModal";
=

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./manage-users-page.css";

import UsersList from "../../components/Layouts/UsersList/UsersList";

const myUsers = [
  {
    id: 1,
    image: "",
    firstName: "Gean",
    lastName: "Hevia",
    dob: "1995-07-02",
    email: "gcaarlos30@gmail.com",
    password: "Qwery1234*",
    role: "Manager",
  },
  {
    id: 2,
    image: "",
    firstName: "Cesar",
    lastName: "Moreno",
    dob: "1995-04-08",
    email: "cesarmoreno@gmail.com",
    password: "Qwery1234*",
    role: "Manager",
  },
];

const ManageUsersPage = () => {
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Hook to fetch users, returns an object with the fetch status, fetched data and error
  // const {
  //   data: fetchedUsersData,
  //   fetchStatus,
  //   error,
  // } = useFetchData(getAllUsersData);

  // State to store fetched users
  const [users, setUsers] = useState(myUsers);

  // State to store the selected user
  const [selectedUser, setSelectedUser] = useState(null);

  // State to store the modal open/close state
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  // State to store the modal open/close state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // useEffect(() => {
  //   if (fetchStatus === API_FETCH_STATUS.SUCCESS) {
  //     setUsers(fetchedUsersData);
  //   }
  // }, [fetchedUsersData, fetchStatus]);

  const handleEditAccount = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setIsEditUserModalOpen(true);
    }
  };

  const handleEditSave = async (formData, updatedUserData) => {
    // Update the menuItems state
    const updatedUserList = users.map((user) =>
      user.id === updatedUserData.id ? updatedUserData : user
    );
    setUsers(updatedUserList);
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserSave = async (formData, newUserData) => {
    // Find the highest existing user ID
    const highestId = Math.max(...users.map((user) => user.id), 0);

    // Set the new user's ID to be one higher than the highest existing ID
    const newUserId = highestId + 1;

    // Create a new user object with the new ID and other user data
    const newUser = { ...newUserData, id: newUserId };

    // Add the new user to the existing users list
    const updatedUserList = [...users, newUser];

    setUsers(updatedUserList);
    setIsAddUserModalOpen(false);
  };

  const handleRemoveUser = (userId) => {
    // TODO: Logic to remove user
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
