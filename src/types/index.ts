import type { Attribution } from "../utils/attribution";

export interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  short_description: string;
  description: string;
  features: string[];
}

export interface ServicePlan {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  monthly_price: string | null;
  currency: string;
  is_custom_pricing: boolean;
  features: string[];
  is_featured: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  industry: string;
  summary: string;
  content: string;
  cover_image: string | null;
  is_demo: boolean;
  created_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  category: BlogCategory | null;
  author_name: string | null;
  created_at: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  seo_title: string;
  seo_description: string;
  updated_at: string;
}

export type EmployeeCount = "1-5" | "6-20" | "21-50" | "51-200" | "200+";
export type ContactMethod = "EMAIL" | "PHONE" | "WHATSAPP";

export interface ITAuditFormData extends Attribution {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  employee_count: EmployeeCount | "";
  infrastructure: string[];
  problems: string[];
  problems_other: string;
  preferred_contact_method: ContactMethod;
}

export interface ITAuditResponse extends ITAuditFormData {
  id: string;
  status: string;
  created_at: string;
}

export interface ContactFormData extends Attribution {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export type UserRole = "ADMIN" | "STAFF" | "CLIENT";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone: string;
  company_name: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string;
}

export type MonitoringStatus = "HEALTHY" | "WARNING" | "CRITICAL" | "UNKNOWN";
export type BackupStatus = "OK" | "STALE" | "FAILED" | "UNKNOWN";

export type ClientDashboardData =
  | { has_profile: false }
  | {
      has_profile: true;
      company: string;
      monitoring_status: MonitoringStatus;
      backup_status: BackupStatus;
      open_tickets: number;
      active_subscriptions: number;
      upcoming_appointments: number;
    };
