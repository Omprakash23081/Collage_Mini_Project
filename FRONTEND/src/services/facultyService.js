import apiClient from '../utils/axios';

export const facultyService = {
  add: async (facultyData) => {
    const response = await apiClient.post('/faculty/create', facultyData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  },

  getAll: async () => {
    const response = await apiClient.get('/faculty');
    return response;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/faculty/${id}`);
    return response;
  },

  update: async (id, facultyData) => {
    const response = await apiClient.patch(`/faculty/${id}`, facultyData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  },

  deleteFaculty: async (id) => {
    const response = await apiClient.delete(`/faculty/${id}`);
    return response;
  },
};
