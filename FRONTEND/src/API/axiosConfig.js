// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://collage-mini-project-090y.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
