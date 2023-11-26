import API from "../axios";

// Function to update an order
export const updateOrder = async (updatedOrder) => {
  try {
    // Send the updated order to the server
    const response = await API.put("/api/orders/update", updatedOrder);

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
        message: errorMessage || "An error occurred while updating the order",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in updateOrder:", error.message);

    // Check if the error is a server error
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
