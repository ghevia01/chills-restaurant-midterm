import API from "../axios";

// Send --POST-- request to the server with the login form data
export const sendUserLoginData = async (loginFormData) => {
  try {
    // Send the login form data to the server
    const response = await API.post(
      "/api/v1/auth/signin/employee",
      loginFormData
    );

    // Check if the response is ok
    if (response.status >= 200 && response.status < 300) {
      return {
        result: "success",
        data: response.data,
        role: response.data.role,
        message: null,
      };
    } else {
      // Return the error message
      const errorMessage = response.data && response.data.message;
      return {
        result: "error",
        data: null,
        message: errorMessage || "An error occurred while signing in",
      };
    }
  } catch (error) {
    // Log the error
    console.error("Error in sendUserLoginData:", error.message);

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
