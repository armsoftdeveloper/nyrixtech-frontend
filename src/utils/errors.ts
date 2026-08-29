import { isAxiosError } from "axios";

// DRF returns either {"detail": "..."} or {"field": ["msg", ...], ...}. Flatten either into one readable string.
export function extractErrorMessage(error: unknown, fallback: string): string {
  if (!isAxiosError(error) || !error.response?.data) return fallback;

  const data = error.response.data as Record<string, unknown> | string;

  if (typeof data === "string") return data;
  if (typeof data.detail === "string") return data.detail;

  const messages: string[] = [];
  for (const value of Object.values(data)) {
    if (Array.isArray(value)) messages.push(...value.map(String));
    else if (typeof value === "string") messages.push(value);
  }

  return messages.length > 0 ? messages.join(" ") : fallback;
}
