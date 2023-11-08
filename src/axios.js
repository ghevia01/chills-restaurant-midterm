import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Important for sending cookies with each request
});

// Function to retrieve the CSRF token from cookies
function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
}

// Interceptor to handle request configuration
API.interceptors.request.use((config) => {
  const xsrfToken = getCsrfToken();

  // Assuming the token is now set in an HttpOnly cookie, no need to set it manually here
  // If you have non-HttpOnly cookies or other headers to set, do it here
  config.headers['Content-Type'] = 'application/json';

  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken; // Set CSRF token in request headers
  }

  return config;
}, error => Promise.reject(error));

// Optional: You might keep the response interceptor if you need to handle global response logic
API.interceptors.response.use((response) => {
  // Any global response handling goes here

  return response;
}, (error) => {
  // Handle token expiration or other global error responses

  // If CSRF token is invalid or missing
  if (error.response && error.response.status === 403 && error.response.data.includes('CSRF')) {
    // Handle CSRF token errors
  }

  return Promise.reject(error);
});

export default API;
