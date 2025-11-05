import apiClient from "../utils/axios";

export const notesService = {
  upload: async (formData) => {
    const response = await apiClient.post("/notes/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get("/notes");
    return response.data;
  },

  getBySubject: async (subject) => {
    const response = await apiClient.get(`/notes/${subject}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  },
};
