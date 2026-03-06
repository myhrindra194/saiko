/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import supabase from "../config/supabase";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncSession = (session) => {
    if (session?.user) {
      setUser(session.user);
      setToken(session.access_token);
    } else {
      setUser(null);
      setToken(null);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      syncSession(session);
    } catch (err) {
      console.error("Login check failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      syncSession(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!error) syncSession(session);
      } catch (err) {
        console.error("Initial session read failed:", err);
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      syncSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
