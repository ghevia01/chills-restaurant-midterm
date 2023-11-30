import API from "../axios";

// Function to send the new menu item data to the server
export const addNewMenuItem = async (newItem) => {
  try {
    // Send new item data to the server
    const response = await API.post("/api/food/add", newItem);

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
    console.error("Error in sendUserRegisterData:", error.message);

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

// Function to send the new menu item data to the server
export const getMenuItemData = async () => {
  try {
    const response = await API.get("/api/food/all");

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
        message: errorMessage || "An error occurred while getting Menu Items",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in getMenuItemData:", error.message);

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

export const updateMenuItem = async (updatedMenuItem) => {
  try {
    const response = await API.put("/api/menu/update", updatedMenuItem);

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


// Function to send the new menu item data to the server
export const removeMenuItem = async (menuItemId) => {
  try {
    const response = await API.delete("/api/food/delete", menuItemId);

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
        message: errorMessage || "An error occurred while deleting Menu Item",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in removeMenuItem:", error.message);

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
