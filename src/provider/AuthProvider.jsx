/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { checkSession, logoutUser } from "../services/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { success, data } = await checkSession();
        if (success) {
          setUser(data);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
