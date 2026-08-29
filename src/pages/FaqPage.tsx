import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { FaqStructuredData } from "../components/seo/StructuredData";
import { ButtonLink } from "../components/ui/Button";
import { FaqAccordion } from "../components/ui/FaqAccordion";
import { Reveal } from "../components/ui/Reveal";
import { fetchFaqs } from "../services/content";
import type { FAQ } from "../types";

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchFaqs()
      .then((data) => {
        if (!cancelled) setFaqs(data);
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
        title="Frequently Asked Questions"
        description="Answers to common questions about Managed IT, cybersecurity, pricing and how NYRIXTECH works with Armenian businesses."
        path="/faq"
      />
      <FaqStructuredData items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />

      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">FAQ</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Can't find what you're looking for? Reach out and we'll answer directly.
          </p>
        </Reveal>

        <div className="mt-10">
          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
            </div>
          )}

          {!loading && (error || faqs.length === 0) && (
            <p className="text-center text-sm text-[var(--color-mist-500)]">
              We couldn't load the FAQ right now — please{" "}
              <a href="/contact" className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
                contact us
              </a>{" "}
              directly with your question.
            </p>
          )}

          {!loading && !error && faqs.length > 0 && (
            <Reveal>
              <FaqAccordion items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
            </Reveal>
          )}
        </div>

        <Reveal index={1} className="mt-12 rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-8 text-center">
          <h2 className="text-lg font-semibold text-[var(--color-mist-100)]">Still have questions?</h2>
          <p className="mt-2 text-sm text-[var(--color-mist-500)] max-w-md mx-auto">
            The fastest way to get concrete answers about your own infrastructure is a free IT audit — no
            obligation to continue.
          </p>
          <div className="mt-5 flex justify-center">
            <ButtonLink to="/it-audit" icon={<ArrowRight size={16} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
