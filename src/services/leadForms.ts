import apiClient from "../api/client";
import type { ITAuditFormData, ITAuditResponse, ContactFormData } from "../types";

export async function submitITAudit(data: ITAuditFormData) {
  const response = await apiClient.post<ITAuditResponse>("/audits/", data);
  return response.data;
}

export async function submitContactForm(data: ContactFormData) {
  const response = await apiClient.post("/contact/", data);
  return response.data;
}
