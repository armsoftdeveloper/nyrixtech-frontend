// Captures where a visitor came from (UTM params + referrer) on first landing and persists
// it for the session, so it can be attached to the IT Audit / Contact submissions no matter
// how many pages the visitor clicks through before converting.

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
}

const STORAGE_KEY = "nyrixtech_attribution";

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

  const traffic_source = classifyFromUtm(utm_source, utm_medium) || classifyFromReferrer();

  return { traffic_source, utm_source, utm_medium, utm_campaign, utm_content, utm_term };
}

/** Call once on app start. Captures attribution only on first landing in this session — later
 * internal navigation must not overwrite it with "direct". */
export function initAttribution(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captureAttribution()));
  } catch {
    // sessionStorage unavailable (private browsing, etc) — attribution simply won't persist.
  }
}

const FALLBACK: Attribution = {
  traffic_source: "direct",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

export function getAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...FALLBACK, ...JSON.parse(raw) } : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
