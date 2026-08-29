import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { RichText } from "../components/ui/RichText";
import { fetchCaseStudy } from "../services/content";
import type { CaseStudy } from "../types";

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    fetchCaseStudy(slug)
      .then((data) => {
        if (!cancelled) setItem(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-black text-[var(--color-mist-100)]">Reference project not found</h1>
        <div className="mt-6">
          <ButtonLink to="/case-studies">Back to reference projects</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo title={item.title} description={item.summary} path={`/case-studies/${item.slug}`} />

      <article className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-20">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-mist-500)] hover:text-[var(--color-mist-100)]"
        >
          <ArrowLeft size={14} /> All reference projects
        </Link>

        {item.is_demo && (
          <span className="mt-6 inline-flex w-fit rounded-full border border-[var(--color-line-800)] px-2.5 py-1 text-[11px] font-mono text-[var(--color-mist-500)]">
            REFERENCE PROJECT — ILLUSTRATIVE SCENARIO
          </span>
        )}

        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-black leading-[1.15] tracking-tight text-[var(--color-mist-100)]">
          {item.title}
        </h1>
        <p className="mt-3 text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">{item.industry}</p>
        <p className="mt-4 text-lg text-[var(--color-mist-400)] leading-relaxed">{item.summary}</p>

        <Reveal className="mt-10 pt-10 border-t border-[var(--color-line-800)]">
          <RichText text={item.content} />
        </Reveal>

        <Reveal index={1} className="mt-14 rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-8 text-center">
          <h2 className="text-lg font-semibold text-[var(--color-mist-100)]">Facing something similar?</h2>
          <p className="mt-2 text-sm text-[var(--color-mist-500)] max-w-md mx-auto">
            A free IT audit shows exactly where your own infrastructure stands — no obligation to continue.
          </p>
          <div className="mt-5 flex justify-center">
            <ButtonLink to="/it-audit" icon={<ArrowRight size={16} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </Reveal>
      </article>
    </>
  );
}
