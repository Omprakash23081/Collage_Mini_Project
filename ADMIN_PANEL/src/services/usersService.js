import api from '../api/axios';

export const usersService = {
  getAll: async () => {
    // Standardizing to /users/getallusers based on backend routes
    // Was: /users/getallusers
    const response = await api.get("/users/getallusers");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (userData) => {
    // Users.jsx used /auth/register for creating new users
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
