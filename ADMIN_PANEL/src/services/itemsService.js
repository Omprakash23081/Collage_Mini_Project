import api from '../api/axios';

export const itemsService = {
  create: async (formData) => {
    // Items.jsx used /items/upload
    const response = await api.post("/items/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/items");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/items/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  }
};
