import api from '../api/axios';

export const notesService = {
  upload: async (formData) => {
    // Note: formData should contain the file and other fields
    const response = await api.post("/notes/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/notes");
    return response.data;
  },

  getBySubject: async (subject) => {
    const response = await api.get(`/notes/${subject}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/notes/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  }
};
