import API from "../axios";

export const getAllUsersData = async () => {
  try {
    // fetch employee data from the server
    const response = await API.get(" ");

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

export const updateUserData = async (updatedUserData) => {
  try {
    // send updated employee data to the server
    const response = await API.put(" ", updatedUserData);

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
          errorMessage || "An error occurred while updating employee data",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in updateUserData:", error.message);

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
}
