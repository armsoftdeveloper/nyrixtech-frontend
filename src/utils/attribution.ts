// Captures where a visitor came from (UTM params, Google Ads click id, referrer) on first
// landing and persists it, so it can be attached to the IT Audit / Contact submissions no
// matter how many pages — or days — pass before the visitor actually converts.

export type TrafficSource =
  | "direct"
  | "google"
  | "google_ads"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "referral"
  | "other";

export interface Attribution {
  traffic_source: TrafficSource;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  /** Google Ads click id (gclid) — the key that later lets a CRM stage change (qualified,
   * customer) be uploaded back to Google Ads as an offline conversion against the original ad click. */
  gclid: string;
}

const STORAGE_KEY = "nyrixtech_attribution";

// A B2B buyer researching IT infrastructure vendors rarely converts in the same browser
// session as their first ad click — they come back days later. sessionStorage would lose
// the original attribution the moment the tab closes, so this uses localStorage with an
// explicit expiry instead (90 days, in line with Google Ads' own default lookback window).
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

interface StoredAttribution {
  value: Attribution;
  capturedAt: number;
}

const KNOWN_SOURCE_HOSTS: { pattern: RegExp; source: TrafficSource }[] = [
  { pattern: /(^|\.)google\./i, source: "google" },
  { pattern: /(^|\.)instagram\.com$/i, source: "instagram" },
  { pattern: /(^|\.)(facebook|fb)\.com$/i, source: "facebook" },
  { pattern: /(^|\.)linkedin\.com$/i, source: "linkedin" },
];

function classifyFromUtm(utmSource: string, utmMedium: string): TrafficSource | null {
  const source = utmSource.toLowerCase();
  const medium = utmMedium.toLowerCase();
  if (!source) return null;
  if (source === "google" && (medium === "cpc" || medium === "ppc" || medium.includes("paid"))) return "google_ads";
  if (source.includes("google")) return "google";
  if (source.includes("instagram")) return "instagram";
  if (source.includes("facebook") || source === "fb") return "facebook";
  if (source.includes("linkedin")) return "linkedin";
  return "other";
}

function classifyFromReferrer(): TrafficSource {
  if (!document.referrer) return "direct";
  try {
    const referrerHost = new URL(document.referrer).hostname;
    if (referrerHost === window.location.hostname) return "direct";
    for (const { pattern, source } of KNOWN_SOURCE_HOSTS) {
      if (pattern.test(referrerHost)) return source;
    }
    return "referral";
  } catch {
    return "direct";
  }
}

function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") || "";
  const utm_medium = params.get("utm_medium") || "";
  const utm_campaign = params.get("utm_campaign") || "";
  const utm_content = params.get("utm_content") || "";
  const utm_term = params.get("utm_term") || "";
  const gclid = params.get("gclid") || "";

  // A gclid on the URL is itself a reliable signal this came from a Google Ads click, even
  // on the (common) case where auto-tagging means utm_source/utm_medium aren't also present.
  const traffic_source = gclid ? "google_ads" : classifyFromUtm(utm_source, utm_medium) || classifyFromReferrer();

  return { traffic_source, utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid };
}

/** Call once on app start. Captures attribution only on first landing within the TTL window —
 * later internal navigation, or a return visit inside that window, must not overwrite it with
 * "direct" (first-touch attribution). */
export function initAttribution(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as StoredAttribution;
      if (Date.now() - stored.capturedAt < ATTRIBUTION_TTL_MS) return;
    }
    const stored: StoredAttribution = { value: captureAttribution(), capturedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // localStorage unavailable (private browsing, storage disabled, etc) — attribution simply
    // won't persist across page loads, but getAttribution() below still degrades safely.
  }
}

const FALLBACK: Attribution = {
  traffic_source: "direct",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  gclid: "",
};

export function getAttribution(): Attribution {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return FALLBACK;
    const stored = JSON.parse(raw) as StoredAttribution;
    return { ...FALLBACK, ...stored.value };
  } catch {
    return FALLBACK;
  }
}
