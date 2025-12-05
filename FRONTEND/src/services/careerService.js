import apiClient from '../utils/axios';

export const careerService = {
  add: async (careerData) => {
    const response = await apiClient.post('/career/', careerData);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/career');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/career/${id}`);
    return response.data;
  },

  update: async (id, careerData) => {
    const response = await apiClient.patch(`/career/${id}`, careerData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/career/${id}`);
    return response.data;
  },
};
