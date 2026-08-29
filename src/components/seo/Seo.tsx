import { useEffect } from "react";

export const SITE_NAME = "NYRIXTECH";
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) || "https://nyrix.tech";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** "article" for blog posts / reference projects, "website" (default) for everything else. */
  type?: "website" | "article";
  image?: string;
  /** Set for pages that must never be indexed: auth, dashboard, 404. */
  noindex?: boolean;
}

export function Seo({ title, description, path, type = "website", image, noindex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;
    document.title = fullTitle;

    setMeta("description", description);
    setMeta("robots", noindex ? "noindex,nofollow" : "index,follow");

    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", url, true);
    if (image) setMeta("og:image", image, true);

    setMeta("twitter:card", image ? "summary_large_image" : "summary");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, type, image, noindex]);

  return null;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
