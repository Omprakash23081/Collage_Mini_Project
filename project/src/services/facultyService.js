import apiClient from '../utils/axios';

export const facultyService = {
  add: async (facultyData) => {
    const response = await apiClient.post('/faculty/add', facultyData);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/faculty');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/faculty/${id}`);
    return response.data;
  },

  update: async (id, facultyData) => {
    const response = await apiClient.put(`/faculty/${id}`, facultyData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/faculty/${id}`);
    return response.data;
  },
};
