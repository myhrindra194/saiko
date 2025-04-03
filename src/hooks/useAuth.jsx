// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { checkSession, logoutUser } from "../services/auth";

const useAuth = () => {
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

  return { user, loading, login, logout };
};

export default useAuth;
