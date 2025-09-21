import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tesda-liara-backend.onrender.com/api',
  withCredentials: true
});

export default axiosInstance;