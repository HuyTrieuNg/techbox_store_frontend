"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login, register } from "../services/authService";
import { LoginPayload, RegisterPayload } from "../features/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  handleLogin: (payload: LoginPayload) => Promise<void>;
  handleRegister: (payload: RegisterPayload) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
  }, []);

  const handleLogin = async (payload: LoginPayload) => {
    const res = await login(payload);
    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
  };

  const handleRegister = async (payload: RegisterPayload) => {
    const res = await register(payload);
    // setAccessToken(res.accessToken);
    // setRefreshToken(res.refreshToken);
    // localStorage.setItem("accessToken", res.accessToken);
    // localStorage.setItem("refreshToken", res.refreshToken);
  };

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook tiện lợi
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};