import axios from 'axios';

// The deployed backend link from the user
export const API_URL = 'http://localhost:3000';

// Configure axios instance with credentials for cookies
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Interceptor to handle unauthorized access across the app (401)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear local state if needed
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
