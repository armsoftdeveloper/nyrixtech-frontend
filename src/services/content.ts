import apiClient from "../api/client";
import type { BlogPostDetail, BlogPostSummary, CaseStudy, FAQ, ServicePlan } from "../types";

export async function fetchFaqs() {
  const { data } = await apiClient.get<{ results?: FAQ[] } | FAQ[]>("/faqs/");
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchServicePlans() {
  const { data } = await apiClient.get<{ results?: ServicePlan[] } | ServicePlan[]>("/plans/");
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchCaseStudies() {
  const { data } = await apiClient.get<{ results?: CaseStudy[] } | CaseStudy[]>("/case-studies/");
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchCaseStudy(slug: string) {
  const { data } = await apiClient.get<CaseStudy>(`/case-studies/${slug}/`);
  return data;
}

export async function fetchBlogPosts() {
  const { data } = await apiClient.get<{ results?: BlogPostSummary[] } | BlogPostSummary[]>("/blog/");
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchBlogPost(slug: string) {
  const { data } = await apiClient.get<BlogPostDetail>(`/blog/${slug}/`);
  return data;
}
