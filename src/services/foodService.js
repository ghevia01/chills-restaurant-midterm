import API from "../axios";

export const getMenuItemData= async () => {
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
