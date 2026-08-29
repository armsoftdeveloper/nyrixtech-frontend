import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "./Seo";

function useJsonLd(id: string, data: object | null) {
  useEffect(() => {
    if (!data) return;
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [id, data]);
}

export function ArticleStructuredData({
  headline,
  description,
  datePublished,
  dateModified,
  path,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  path: string;
}) {
  useJsonLd("ld-article", {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}${path}`,
  });
  return null;
}

export function FaqStructuredData({ items }: { items: { q: string; a: string }[] }) {
  useJsonLd(
    "ld-faq",
    items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null
  );
  return null;
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; path: string }[] }) {
  useJsonLd("ld-breadcrumb", {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  });
  return null;
}
