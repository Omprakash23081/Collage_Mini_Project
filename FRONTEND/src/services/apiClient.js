import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Auth Header if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add token to headers here if not using cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

import { toast } from "react-hot-toast";

// Response Interceptor: Global Error and Success Handling
apiClient.interceptors.response.use(
  (response) => {
    // Show success toast for mutations (POST, PUT, PATCH, DELETE) if a message is present
    const method = response?.config?.method?.toUpperCase();
    if (method && ["POST", "PUT", "PATCH", "DELETE"].includes(method) && response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const { response } = error;
    const message = response?.data?.message || error.message || "An unexpected error occurred";
    
    if (response) {
      if (response.status === 401) {
        console.warn("[AUTH] Unauthorized access, redirecting or clearing state might be needed.");
      } else if (response.status >= 500) {
        console.error("[SERVER] Internal error:", response.data);
      }
    } else {
      console.error("[NETWORK] Error:", error.message);
    }

    // Always show error toast for failed requests
    toast.error(message);

    return Promise.reject({ ...error, message });
  }
);

// Request Interceptor: Logging & Auth
apiClient.interceptors.request.use((config) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[AXIOS] ${config.method.toUpperCase()} -> ${config.url}`);
  }
  return config;
});

export default apiClient;
