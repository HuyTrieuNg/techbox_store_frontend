// "use client";

// import { useState } from "react";
// import { login, register } from "../services/authService";
// import { LoginPayload, RegisterPayload } from "../features/auth";

// export function useAuth() {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [refreshToken, setRefreshToken] = useState<string | null>(null);

//   async function handleLogin(payload: LoginPayload) {
//     const res = await login(payload);

//     setAccessToken(res.accessToken);
//     setRefreshToken(res.refreshToken);

//     localStorage.setItem("accessToken", res.accessToken);
//     localStorage.setItem("refreshToken", res.refreshToken);

//     return res;
//   }

//   async function handleRegister(payload: RegisterPayload) {
//     const res = await register(payload);

//     setAccessToken(res.accessToken);
//     setRefreshToken(res.refreshToken);

//     localStorage.setItem("accessToken", res.accessToken);
//     localStorage.setItem("refreshToken", res.refreshToken);

//     return res;
//   }

//   return { accessToken, refreshToken, handleLogin, handleRegister };
// }


"use client";

import { useState, useEffect } from "react";  // Thêm useEffect
import { login, register } from "../services/authService";
import { LoginPayload, RegisterPayload } from "../features/auth";

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Load token từ localStorage khi hook mount
  useEffect(() => {
    const savedAccessToken = localStorage.getItem("accessToken");
    const savedRefreshToken = localStorage.getItem("refreshToken");

    if (savedAccessToken) {
      setAccessToken(savedAccessToken);
    }
    if (savedRefreshToken) {
      setRefreshToken(savedRefreshToken);
    }
  }, []);  // [] để chỉ chạy 1 lần khi mount

  async function handleLogin(payload: LoginPayload) {
    const res = await login(payload);

    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);

    return res;
  }

  async function handleRegister(payload: RegisterPayload) {
    const res = await register(payload);

    // setAccessToken(res.accessToken);
    // setRefreshToken(res.refreshToken);

    // localStorage.setItem("accessToken", res.accessToken);
    // localStorage.setItem("refreshToken", res.refreshToken);

    return res;
  }

  return { accessToken, refreshToken, handleLogin, handleRegister };
}