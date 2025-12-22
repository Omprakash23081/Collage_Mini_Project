import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      // Assuming there's a /api/auth/me or similar, or we rely on stored state?
      // The backend has /api/auth/me/:id but we might not know ID.
      // Or /api/users/me?
      // For now, we might rely on localStorage or just checking if a protected call works.
      // But let's check localStorage for now to persist UI state, 
      // though true auth is via httpOnly cookies.
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Auth check failed", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password,
        role: 'admin' // Enforce admin login
      });
      
      if (response.data?.data) {
        setUser(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return { success: true };
      }
      return { success: false, message: response.data?.message || 'Login failed' };
    } catch (error) {
      console.error("Login Error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Something went wrong' 
      };
    }
  };

  const logout = async () => {
    console.log("AuthContext: logout function called");
    try {
      console.log("AuthContext: sending logout request to /auth/logout");
      await api.post('/auth/logout');
      console.log("AuthContext: logout request successful");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      console.log("AuthContext: clearing local state and redirecting");
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
