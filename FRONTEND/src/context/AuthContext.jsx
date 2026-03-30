import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { initSocket, disconnectSocket } from "../utils/socket";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    try {
      setLoading(true);
      const data = await authService.refreshToken();
      setUser(data.data);
      initSocket(data.data._id);
      return data;
    } catch (error) {
      setUser(null);
      disconnectSocket();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SINGLE source of refresh (ONLY HERE)
  useEffect(() => {
    refreshToken().catch(() => {});
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.data);
    initSocket(data.data._id);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.data);
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      disconnectSocket();
    }
  };

  const updateUser = async (updatedUserdata) => {
    const data = await authService.updateProfile(updatedUserdata);
    setUser(data.data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUser,
        refreshToken,
        changePassword: authService.changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
