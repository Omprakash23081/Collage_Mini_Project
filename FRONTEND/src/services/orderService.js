import apiClient from "./apiClient.js";

export const orderService = {
  // Fetch all orders associated with the user.
  getAll: async (config) => {
    return await apiClient.get("/orders", config);
  },
  
  // Delete a pending order
  delete: async (id, config) => {
    return await apiClient.delete(`/orders/${id}`, config);
  },
};
