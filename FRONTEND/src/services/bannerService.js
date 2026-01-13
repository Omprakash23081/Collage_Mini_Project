import apiClient from "../utils/axios";

// Service for handling banner-related API calls
export const bannerService = {
  // Get all active banners
  getBanners: async () => {
    try {
      const response = await apiClient.get("/banners");
      return response;
    } catch (error) {
      throw error;
    }
  },
};
