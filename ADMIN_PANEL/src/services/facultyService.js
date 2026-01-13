import api from '../api/axios';

export const facultyService = {
  create: async (formData) => {
    // Faculty.jsx used /faculty/create
    const response = await api.post("/faculty/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/faculty");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/faculty/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/faculty/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/faculty/${id}`);
    return response.data;
  }
};
