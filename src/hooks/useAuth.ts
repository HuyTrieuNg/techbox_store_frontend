"use client";

import { useState } from "react";
import { login, register } from "../services/authService";
import { AuthResponse, LoginPayload, RegisterPayload } from "../features/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleLogin(payload: LoginPayload) {
    const res = await login(payload);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
    return res;
  }

  async function handleRegister(payload: RegisterPayload) {
    const res = await register(payload);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
    return res;
  }

  return { user, token, handleLogin, handleRegister };
}