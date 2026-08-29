import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../api/client";
import { fetchCurrentUser, loginRequest, logoutRequest, registerRequest } from "../services/auth";
import { trackLogin, trackRegistration } from "../utils/analytics";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchCurrentUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function applyTokens(payload: LoginPayload) {
    const tokens = await loginRequest(payload);
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    setUser(await fetchCurrentUser());
  }

  async function login(payload: LoginPayload) {
    await applyTokens(payload);
    trackLogin();
  }

  async function register(payload: RegisterPayload) {
    await registerRequest(payload);
    // Uses applyTokens directly (not login()) so this fires exactly one analytics event —
    // "registration" — rather than also firing "login" for the same action.
    await applyTokens({ username: payload.username, password: payload.password });
    trackRegistration();
  }

  function logout() {
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
    // Best-effort server-side revocation — token is already cleared client-side either way.
    if (refresh) {
      logoutRequest(refresh).catch(() => {});
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
