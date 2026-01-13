import api from '../api/axios';

export const eventsService = {
  create: async (formData) => {
    // Events.jsx used /events
    const response = await api.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/events");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};
