import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Proactively fetch latest user info from server to ensure sync
        try {
          const response = await api.get('/auth/me');
          if (response.data?.data) {
            setUser(response.data.data);
            localStorage.setItem('user', JSON.stringify(response.data.data));
          }
        } catch (fetchError) {
          console.warn("Could not refresh user profile from server", fetchError);
          if (fetchError.response?.status === 401) {
             setUser(null);
             localStorage.removeItem('user');
          }
        }
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
      navigate('/login');
    }
  };

  const updateUser = async (formData) => {
    try {
      const response = await api.patch('/auth/me', formData);

      if (response.data?.data) {
        setUser(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return { success: true, data: response.data.data };
      }
      return { success: false, message: response.data?.message || 'Update failed' };
    } catch (error) {
      console.error("Update User Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || 'Something went wrong'
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
