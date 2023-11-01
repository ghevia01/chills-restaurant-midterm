// Send --POST-- request to the server with the login form data
export const sendUserLoginData = async (loginFormData) => {

    const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

    try {
        // Send the login form data to the server
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginFormData),
        });

        // Get the response from the server
        const data = await response.json();

        // Check if the response is ok
        if (response.ok) {

            // Store token in sessionStorage
            sessionStorage.setItem('authToken', data.token);
            
            return {
                result: 'success',
                data: data,
                message: null,
            };
        }
        else {
            // Return the error message
            return {
                result: 'error',
                data: null,
                message: data.message || 'An error occurred while signing in',
            };
        }

    } catch (error) {
        // Log the error
        console.error("Error in sendUserLoginData:", error.message);

        // Return the error message
        return {
            result: 'error',
            data: null,
            message: `An unexpected error occurred: ${error.message}`,
        };
    }
};
