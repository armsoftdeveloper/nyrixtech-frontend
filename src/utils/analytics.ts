// Lightweight gtag.js wrapper covering GA4, the standalone Google tag, and Google Ads
// conversions. Every id comes from an env var — never hardcoded — and every tracking call is
// a no-op when its relevant id is unset, so analytics stays fully optional piece by piece
// (e.g. GA4 alone works today; Ads conversions light up later just by setting two more vars).
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GOOGLE_TAG_ID = import.meta.env.VITE_GOOGLE_TAG_ID as string | undefined;
const GOOGLE_ADS_CONVERSION_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID as string | undefined;
const GOOGLE_ADS_CONVERSION_LABEL = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL as string | undefined;

// The id gtag.js itself is loaded with — any one configured id works as the loader, since a
// single gtag.js script serves every product you then `config` against it.
const PRIMARY_TAG_ID = GOOGLE_TAG_ID || GA_MEASUREMENT_ID || GOOGLE_ADS_CONVERSION_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (!PRIMARY_TAG_ID || initialized) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${PRIMARY_TAG_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());

  if (GA_MEASUREMENT_ID) {
    // send_page_view disabled: this is an SPA, so the automatic pageview on script load would
    // double-count against the page_view events we send manually on each route change.
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  }
  if (GOOGLE_ADS_CONVERSION_ID) {
    window.gtag("config", GOOGLE_ADS_CONVERSION_ID);
  }
}

function isReady(): boolean {
  return Boolean(PRIMARY_TAG_ID) && typeof window.gtag === "function";
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

/** Fires the Google Ads conversion tag (distinct from the GA4 custom event) — a no-op unless
 * both the conversion id and label are configured. `transactionId` lets Google Ads dedupe the
 * conversion on its own side too, using the same audit id passed to trackAuditSubmitted. */
function trackGoogleAdsConversion(transactionId?: string): void {
  if (!isReady() || !GOOGLE_ADS_CONVERSION_ID || !GOOGLE_ADS_CONVERSION_LABEL) return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
    transaction_id: transactionId,
  });
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
 * API response (e.g. the backend's own resubmit-within-10-minutes dedup) never double-counts.
 * Also fires the generic CRM lead_created event and the Google Ads conversion tag, since a
 * successful audit submission always creates exactly one Lead record server-side. */
export function trackAuditSubmitted(auditId: string, employeeCount: string): void {
  sendOnce(`audit_submitted:${auditId}`, "audit_submitted", {
    audit_id: auditId,
    employee_count: employeeCount,
  });
  sendOnce(`lead_created:audit:${auditId}`, "lead_created", { lead_source: "it_audit", audit_id: auditId });
  trackGoogleAdsConversion(auditId);
}

/** Fires alongside the generic lead_created event, since a contact form submission also
 * always creates exactly one Lead record server-side (see leads/views.py). */
export function trackContactSubmitted(): void {
  send("contact_submitted");
  send("lead_created", { lead_source: "contact_form" });
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

export function trackPhoneClick(phoneNumber: string, location: string): void {
  send("phone_click", { phone_number: phoneNumber, click_location: location });
}

export function trackEmailClick(email: string, location: string): void {
  send("email_click", { email_address: email, click_location: location });
}
