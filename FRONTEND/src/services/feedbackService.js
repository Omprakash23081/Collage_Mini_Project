import apiClient from "../utils/axios";

export const feedbackService = {
  createFeedback: async (feedbackData) => {
    const response = await apiClient.post("/feedback", feedbackData);
    return response.data;
  },

  getAllFeedback: async () => {
    const response = await apiClient.get("/feedback");
    return response.data;
  },

  getUserFeedbacks: async () => {
    const response = await apiClient.get("/feedback/my-feedback");
    return response.data;
  },

  deleteFeedback: async (id) => {
    const response = await apiClient.delete(`/feedback/${id}`);
    return response.data;
  },

  markAsRead: async (id) => {
    console.log("DEBUG: Service calling API to mark as read:", id);
    const response = await apiClient.patch(`/feedback/${id}/read`);
    return response.data;
  },
};
