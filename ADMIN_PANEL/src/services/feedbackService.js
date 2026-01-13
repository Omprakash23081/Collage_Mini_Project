import api from '../api/axios';

export const feedbackService = {
  getAll: async () => {
    const response = await api.get("/feedback");
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/feedback/${id}`);
    return response.data;
  },

  reply: async (id, responseText) => {
    const response = await api.patch(`/feedback/${id}/reply`, { response: responseText });
    return response.data;
  }
};
