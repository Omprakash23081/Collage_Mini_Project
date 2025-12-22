import apiClient from "../utils/axios";

export const authService = {
  //this will take userData from frantend and call backend to rejester and return response
  register: async (userData) => {
    console.log("DEBUG: Frontend authService.register called");
    console.log("DEBUG: API URL should be:", apiClient.defaults.baseURL);
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  login: async (email, password, role) => {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
      role,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  updateProfile: async (userData) => {


    const response = await apiClient.patch("/auth/me", userData);

    return response.data;
  },

  trackActivity: async (subjectName, type) => {
    return apiClient.post("/auth/activity", { subjectName, type });
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  refreshToken: async () => {
    const response = await apiClient.post("/auth/refreshToken", {});
    return response.data;
  },

  changePassword: async (passwordData) => {
      const response = await apiClient.post("/auth/change-password", passwordData);
      return response.data;
  },
};
