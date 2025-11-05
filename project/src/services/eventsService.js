import apiClient from "../utils/axios";

export const eventsService = {
  create: async (eventData) => {
    const response = await apiClient.post("/events/create", eventData);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get("/events");
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  },

  update: async (id, eventData) => {
    const response = await apiClient.put(`/events/${id}`, eventData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  },

  register: async (id) => {
    const response = await apiClient.post(`/events/${id}/register`);
    return response.data;
  },
};
