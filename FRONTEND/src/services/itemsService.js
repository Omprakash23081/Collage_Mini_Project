import apiClient from "../utils/axios";

// Service for handling lost and found items
export const itemsService = {
  // Get all items
  getItems: async () => {
    try {
      const response = await apiClient.get("/items");
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Upload new item (if needed for frontend)
  uploadItem: async (data) => {
    try {
      const response = await apiClient.post("/items/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Delete item
  deleteItem: async (id) => {
    try {
      const response = await apiClient.delete(`/items/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};
