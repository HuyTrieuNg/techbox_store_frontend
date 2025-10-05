import { LoginPayload, RegisterPayload, AuthResponse } from "../features/auth";

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch("http://localhost:8081/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch("http://localhost:8081/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}