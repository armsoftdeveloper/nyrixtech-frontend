import apiClient from "../api/client";
import type { ClientDashboardData } from "../types";

export async function fetchClientDashboard() {
  const { data } = await apiClient.get<ClientDashboardData>("/dashboard/client/");
  return data;
}
