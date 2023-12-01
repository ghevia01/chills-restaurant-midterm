import API from "../axios";

export const getAllUsersData = async () => {
  try {
    // fetch employee data from the server
    const response = await API.get("api/users/all");

    // Check if the response is ok
    if (response.status >= 200 && response.status < 300) {
      return {
        result: "success",
        data: response.data,
        message: null,
      };
    } else {
      // Return the error message
      const errorMessage = response.data && response.data.message;
      return {
        result: "error",
        data: null,
        message:
          errorMessage || "An error occurred while getting employees data",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in getAllUsersData:", error.message);

    // If the server sends back an error response, it might be available in error.response.data
    const serverMessage =
      error.response && error.response.data && error.response.data.message;

    // Return the error message
    return {
      result: "error",
      data: null,
      message:
        serverMessage || `An unexpected error occurred: ${error.message}`,
    };
  }
};

export const addNewUser= async (newUser) => {
  try {
    // Send new item data to the server
    const response = await API.post("/api/users/add", newUser);

    // Check if the response is ok
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return {
        result: "success",
        data: response.data,
        message: null,
      };
    } else {
      // Return the error message
      const errorMessage = response.data && response.data.message;
      return {
        result: "error",
        data: null,
        message: errorMessage || "An error occurred while signing up",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in addNewUser:", error.message);

    // If the server sends back an error response, it might be available in error.response.data
    const serverMessage =
      error.response && error.response.data && error.response.data.message;

    // Return the error message
    return {
      result: "error",
      data: null,
      message:
        serverMessage || `An unexpected error occurred: ${error.message}`,
    };
  }
};

export const deleteUser= async (deleteUser) => {
  try {
    // Send new item data to the server
    const response = await API.post("/api/users/delete", deleteUser);

    // Check if the response is ok
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return {
        result: "success",
        data: response.data,
        message: null,
      };
    } else {
      // Return the error message
      const errorMessage = response.data && response.data.message;
      return {
        result: "error",
        data: null,
        message: errorMessage || "An error occurred while signing up",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in deleteUser:", error.message);

    // If the server sends back an error response, it might be available in error.response.data
    const serverMessage =
      error.response && error.response.data && error.response.data.message;

    // Return the error message
    return {
      result: "error",
      data: null,
      message:
        serverMessage || `An unexpected error occurred: ${error.message}`,
    };
  }
};


export const updateUser = async (updatedUser) => {
  try {
    const response = await API.put("/api/users/update", updatedUser);

    if (response.status >= 200 && response.status < 300) {
      return {
        result: "success",
        data: response.data,
        message: null,
      };
    } else {

      const errorMessage = response.data && response.data.message;
      return {
        result: "error",
        data: null,
        message: errorMessage || "An error occurred while updating the menu item",
      };
    }
  } catch (error) {

    console.error("Error in updateMenuItem:", error.message);

    const serverMessage =
      error.response && error.response.data && error.response.data.message;

    return {
      result: "error",
      data: null,
      message:
        serverMessage || `An unexpected error occurred: ${error.message}`,
    };
  }
};

