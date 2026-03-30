import apiClient from "./apiClient";

export const planService = {
  getPlans: async () => {
    const response = await apiClient.get('/plans');
    return response;
  }
};
