import apiClient from "../utils/axios";

export const eventService = {
  getEvents: () => apiClient.get("/events"),
};
