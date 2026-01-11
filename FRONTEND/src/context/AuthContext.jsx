import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        await refreshToken();
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const login = async (email, password, role) => {
    const data = await authService.login(email, password, role);
    setUser(data.data);
    console.log(data);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.data);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (updatedUserdata) => {
    const data = await authService.updateProfile(updatedUserdata);
    setUser(data.data);
  };

  const refreshToken = async () => {
    const data = await authService.refreshToken();

    setUser(data.data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        refreshToken,
        changePassword: authService.changePassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
