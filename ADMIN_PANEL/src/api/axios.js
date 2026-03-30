import axios from "axios";

const api = axios.create({
  baseURL: "https://collage-mini-project.onrender.com/api",
  withCredentials: true, // Important for cookies
  timeout: 10000, // 10 seconds timeout to avoid infinite loading
});

// Interceptor to handle 401/RefreshToken if needed (can be added later)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
