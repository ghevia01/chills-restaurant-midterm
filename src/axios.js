import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export function removeStoredToken (){
  return sessionStorage.removeItem('token');
}

// Function to retrieve the stored token in a consistent way
function getStoredToken() {
  return sessionStorage.getItem('token'); // Use sessionStorage or localStorage consistently
}

// Function to get CSRF token from cookies
function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
}

// Interceptor to handle request configuration
function configureRequest(config) {
  const token = getStoredToken();
  const xsrfToken = getCsrfToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Include Bearer scheme
  }

  config.headers['Content-Type'] = 'application/json';

  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken; // Set CSRF token in request headers
  }

  return config;
}

// Interceptor to handle responses
function handleResponse(response) {
  // Check if a new token is provided and store it
  if (response.data.token) {
    sessionStorage.setItem('token', response.data.token);
  }

  return response;
}

// Apply interceptors
API.interceptors.request.use(configureRequest, error => Promise.reject(error));
API.interceptors.response.use(handleResponse, error => {
  // Handle token expiration or other global error respose

  // If CSRF token is invalid or missing
  if (error.response && error.response.status === 403 && error.response.data.includes('CSRF')) {
    // Handle CSRF token errors
  }

  return Promise.reject(error);
});

export default API;