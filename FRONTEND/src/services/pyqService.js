import apiClient from '../utils/axios';

export const pyqService = {
  upload: async (formData) => {
    const response = await apiClient.post('/pyq/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/pyq');
    return response.data;
  },

  getBySubject: async (subject) => {
    const response = await apiClient.get(`/pyq/${subject}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/pyq/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/pyq/${id}`);
    return response.data;
  },
};
