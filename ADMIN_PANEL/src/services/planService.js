import api from '../api/axios';

export const planService = {
  // Get all plans
  getAll: async () => {
    const response = await api.get('/plans');
    return response.data;
  },

  // Create new plan
  create: async (data) => {
    const response = await api.post('/plans/create', data);
    return response.data;
  },

  // Update plan
  update: async (id, data) => {
    const response = await api.patch(`/plans/${id}`, data);
    return response.data;
  },

  // Delete plan
  delete: async (id) => {
    const response = await api.delete(`/plans/${id}`);
    return response.data;
  }
};
