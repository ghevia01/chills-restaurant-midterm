import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Important for sending cookies with each request
});

// Function to retrieve the CSRF token from cookies
function getCsrfToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
}

// Interceptor to handle request configuration
API.interceptors.request.use(
  (config) => {
    const xsrfToken = getCsrfToken();

    config.headers["Content-Type"] = "application/json";

    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = xsrfToken; // Set CSRF token in request headers
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
