import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, role) => {
    const data = await authService.login(email, password, role);
    console.log(data);

    setUser(data.data);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.data);
    return data;
  };

  const logout = async () => {
    console.log("comming for log out ");
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (updatedUserdata) => {
    const data = await authService.updateProfile(updatedUserdata);
    setUser(data.data);
  };

  const refreshToken = async () => {
    console.log("refresh token comming");
    const data = await authService.refreshToken();
    console.log(data);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
