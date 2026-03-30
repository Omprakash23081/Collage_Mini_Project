import apiClient from "./apiClient";

export const eventService = {
  getEvents: () => apiClient.get("/events"),
};
