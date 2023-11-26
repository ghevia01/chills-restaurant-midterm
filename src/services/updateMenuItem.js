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
  
