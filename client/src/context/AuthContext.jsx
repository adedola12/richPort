import React, { createContext, useContext, useEffect, useState } from "react";

const AUTH_API = import.meta.env.VITE_AUTH_ENDPOINT || "";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("adminUser");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("adminToken") || null
  );

  const [loading, setLoading] = useState(false);

  // Keep localStorage in sync
  useEffect(() => {
    if (!token || !user) {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminToken");
      return;
    }

    localStorage.setItem("adminUser", JSON.stringify(user));
    localStorage.setItem("adminToken", token);
  }, [user, token]);

  const signIn = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch(`${AUTH_API}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Signin failed");
      }

      setUser(data.user);
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await fetch(`${AUTH_API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setUser(data.user);
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
  };

  // Helper to call protected APIs with Authorization header
  const authFetch = (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    signIn,
    signUp,
    signOut,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
