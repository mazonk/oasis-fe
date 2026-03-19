import axios from 'axios';

// Create an axios instance with your C# Backend URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual API port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;