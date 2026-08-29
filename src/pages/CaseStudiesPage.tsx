import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { fetchCaseStudies } from "../services/content";
import type { CaseStudy } from "../types";

export default function CaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchCaseStudies()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Seo
        title="Reference Projects"
        description="Illustrative reference scenarios showing the type of network, security, backup and monitoring projects NYRIXTECH delivers for businesses in Armenia."
        path="/case-studies"
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Reference Projects</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            The type of work we do
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            NYRIXTECH is a newly launched company. The scenarios below are illustrative reference projects showing
            the type of infrastructure work we deliver — not real client engagements.
          </p>
        </Reveal>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
          </div>
        )}

        {!loading && (error || items.length === 0) && (
          <p className="mt-10 text-sm text-[var(--color-mist-500)]">Reference projects are being updated — check back soon.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {items.map((cs, i) => (
              <Reveal key={cs.slug} index={i}>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="group block h-full rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 flex flex-col hover:border-[var(--color-signal-500)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200"
                >
                  <span className="inline-flex w-fit rounded-full border border-[var(--color-line-800)] px-2.5 py-1 text-[11px] font-mono text-[var(--color-mist-500)]">
                    REFERENCE PROJECT
                  </span>
                  <h2 className="mt-4 text-base font-semibold text-[var(--color-mist-100)] leading-snug">{cs.title}</h2>
                  <p className="mt-1 text-xs font-mono text-[var(--color-signal-400)]">{cs.industry}</p>
                  <p className="mt-3 text-sm text-[var(--color-mist-500)] leading-relaxed flex-1">{cs.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-mist-500)] group-hover:text-[var(--color-signal-400)]">
                    Read scenario <ArrowUpRight size={12} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-16 rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-950)] p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            Want to see what this looks like for your business?
          </h2>
          <p className="mt-3 text-[var(--color-mist-400)] max-w-xl mx-auto">
            A free IT audit shows you exactly where your infrastructure stands — no obligation to continue.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
