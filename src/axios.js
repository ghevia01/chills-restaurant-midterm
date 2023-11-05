import axios from 'axios';

const API = axios.create({
  baseURL: "https://172.20.1.10:8081",
  withCredentials: true,
});

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

// Interceptor to handle responses
function handleResponse(response) {
  if (response.data.token) {
    sessionStorage.setItem('token', response.data.token); // Ensure you're setting the token where you get it
  }
  return response;
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
    config.headers['X-XSRF-TOKEN'] = xsrfToken;
  }

  return config;
}

// Apply interceptors
API.interceptors.response.use(handleResponse, error => Promise.reject(error));
API.interceptors.request.use(configureRequest);

export default API;
