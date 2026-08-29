// Lightweight GA4 wrapper. Measurement ID comes from an env var — never hardcoded — and every
// tracking call is a no-op when it's unset, so analytics stays fully optional.
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (!GA_MEASUREMENT_ID || initialized) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  // send_page_view disabled: this is an SPA, so the automatic pageview on script load would
  // double-count against the page_view events we send manually on each route change.
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

function isReady(): boolean {
  return Boolean(GA_MEASUREMENT_ID) && typeof window.gtag === "function";
}

function send(eventName: string, params?: Record<string, unknown>): void {
  if (!isReady()) return;
  window.gtag("event", eventName, params);
}

// Guards one-shot events (a specific audit submission, a specific funnel step) against firing
// twice — double-submits, React StrictMode's double effect invocation in dev, back/forward
// navigation replays, or the interceptor retrying a request after a token refresh.
const firedOnceKeys = new Set<string>();
function sendOnce(dedupeKey: string, eventName: string, params?: Record<string, unknown>): void {
  if (firedOnceKeys.has(dedupeKey)) return;
  firedOnceKeys.add(dedupeKey);
  send(eventName, params);
}

export function trackPageView(path: string, title?: string): void {
  send("page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

export function trackCtaClick(ctaLabel: string, location: string): void {
  send("cta_click", { cta_label: ctaLabel, cta_location: location });
}

export function trackAuditStarted(): void {
  sendOnce("audit_started", "audit_started");
}

export function trackAuditStepCompleted(stepNumber: number, stepName: string): void {
  send("audit_step_completed", { step_number: stepNumber, step_name: stepName });
}

/** The site's primary conversion event — dedupe by the created audit's id so a duplicate
 * API response (e.g. the backend's own resubmit-within-10-minutes dedup) never double-counts. */
export function trackAuditSubmitted(auditId: string, employeeCount: string): void {
  sendOnce(`audit_submitted:${auditId}`, "audit_submitted", {
    audit_id: auditId,
    employee_count: employeeCount,
  });
}

export function trackContactSubmitted(): void {
  send("contact_submitted");
}

export function trackAppointmentSubmitted(): void {
  send("appointment_submitted");
}

export function trackLogin(method = "password"): void {
  send("login", { method });
}

export function trackRegistration(method = "password"): void {
  send("registration", { method });
}
