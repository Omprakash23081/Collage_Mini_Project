import apiClient from '../utils/axios';

export const itemsService = {
  report: async (itemData) => {
    const response = await apiClient.post('/items/upload', itemData);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/items');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await apiClient.patch(`/items/${id}`, { status });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/items/${id}`);
    return response.data;
  },
};
