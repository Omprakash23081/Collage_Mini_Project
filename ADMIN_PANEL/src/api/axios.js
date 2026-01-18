import axios from "axios";

const api = axios.create({
  baseURL: "https://collage-mini-project-090y.onrender.com/api",
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle 401/RefreshToken if needed (can be added later)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
