/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { checkSession, logoutUser } from "../services/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSessionToken = () => {
    try {
      const cookieFallback = localStorage.getItem("cookieFallback");
      if (!cookieFallback) return null;

      const parsed = JSON.parse(cookieFallback);
      const sessionKey = `a_session_${
        import.meta.env.VITE_APPWRITE_PROJECT_ID
      }`;
      return parsed[sessionKey] || null;
    } catch (error) {
      console.error("Error getting session token:", error);
      return null;
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const session = await checkSession();
      if (session.success) {
        setUser(session.data);
        setToken(getSessionToken());
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { success, data } = await checkSession();
        if (success) {
          setUser(data);
          setToken(getSessionToken());
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
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
