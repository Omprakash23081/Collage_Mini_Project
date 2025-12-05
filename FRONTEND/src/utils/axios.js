import axios from "axios";

//it will define base url so that we can just referance verable and mathod by witch we will call backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        // Optional: Redirect to login or clear auth state
        console.warn("Unauthorized access");
      } else if (response.status >= 500) {
        console.error("Server error:", response.data);
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
