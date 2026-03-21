import api from '../api/axios';

const bannerService = {
  // Get all banners
  getBanners: async () => {
    const response = await api.get("/banners");
    return response.data;
  },

  // Create a new banner
  createBanner: async (bannerData) => {
    const response = await api.post("/banners/create", bannerData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete a banner
  deleteBanner: async (id) => {
    const response = await api.delete(`/banners/${id}`);
    return response.data;
  },
};

export default bannerService;
