import axios from "axios";

// Access the VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL;

const bannerService = {
  // Get all banners
  getBanners: async () => {
    try {
      const response = await axios.get(`${API_URL}/banners`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new banner
  createBanner: async (bannerData) => {
    try {
      const response = await axios.post(`${API_URL}/banners/create`, bannerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a banner
  deleteBanner: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/banners/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default bannerService;
