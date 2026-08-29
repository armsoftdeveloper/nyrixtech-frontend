import apiClient from "../api/client";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types";

export async function loginRequest(payload: LoginPayload) {
  const { data } = await apiClient.post<{ access: string; refresh: string }>("/auth/login/", payload);
  return data;
}

export async function registerRequest(payload: RegisterPayload) {
  const { data } = await apiClient.post<AuthUser>("/auth/register/", payload);
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get<AuthUser>("/auth/me/");
  return data;
}

export async function logoutRequest(refresh: string) {
  await apiClient.post("/auth/logout/", { refresh });
}
