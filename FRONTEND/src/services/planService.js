import api from "../utils/axios";

export const planService = {
  getPlans: async () => {
    const response = await api.get('/plans');
    return response.data;
  }
};
