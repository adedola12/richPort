// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "re_admin_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isAdmin = !!user; // later you can check user.role === "admin"

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Placeholder auth – later replace with real backend calls
  const signIn = async ({ email, password }) => {
    // TODO: call backend here
    const fakeUser = {
      id: "local-admin",
      email,
      role: "admin",
      name: email.split("@")[0],
    };
    setUser(fakeUser);
    return fakeUser;
  };

  const signUp = async ({ name, email, password }) => {
    // TODO: call backend here
    const fakeUser = { id: "local-admin", email, role: "admin", name };
    setUser(fakeUser);
    return fakeUser;
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
