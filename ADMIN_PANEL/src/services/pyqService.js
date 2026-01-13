import api from '../api/axios';

export const pyqService = {
  upload: async (formData) => {
    // PYQ.jsx used /pyq/upload
    const response = await api.post("/pyq/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/pyq");
    return response.data;
  },

  getBySubject: async (subject) => {
    const response = await api.get(`/pyq/${subject}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/pyq/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/pyq/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/pyq/${id}`);
    return response.data;
  }
};
