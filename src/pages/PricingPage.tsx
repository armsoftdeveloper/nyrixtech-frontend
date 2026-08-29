import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { ButtonLink } from "../components/ui/Button";
import { FaqAccordion } from "../components/ui/FaqAccordion";
import { Reveal } from "../components/ui/Reveal";
import { fetchServicePlans } from "../services/content";
import type { ServicePlan } from "../types";

const pricingFaq = [
  {
    q: "Is this the final price for our business?",
    a: "These are indicative starting tiers. Final pricing is confirmed after a free IT audit, once we understand your device count, infrastructure and actual scope.",
  },
  {
    q: "What happens if we outgrow our plan?",
    a: "Plans are designed to scale — as your device count or requirements grow, we'll recommend moving to the next tier or a custom scope.",
  },
  {
    q: "Can we start with a one-time project instead of a monthly plan?",
    a: "Yes — individual services like a security assessment, network redesign or cloud migration can be scoped as standalone projects rather than an ongoing plan.",
  },
  {
    q: "Do you offer contracts shorter than a year?",
    a: "Contract terms are discussed during the proposal stage and scoped to what makes sense for your business.",
  },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<ServicePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchServicePlans()
      .then((data) => {
        if (!cancelled) setPlans(data);
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
        title="Pricing"
        description="Indicative Managed IT pricing tiers for Armenian businesses — Starter, Business and Enterprise. Final pricing is confirmed after a free IT audit."
        path="/pricing"
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Pricing</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            Predictable monthly plans
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Every engagement starts with a free IT audit, so your plan matches your actual infrastructure — not a
            generic package. The tiers below are a starting point for the conversation.
          </p>
        </Reveal>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
          </div>
        )}

        {!loading && (error || plans.length === 0) && (
          <p className="mt-10 text-center text-sm text-[var(--color-mist-500)]">
            Pricing is being updated —{" "}
            <ButtonLink to="/contact" variant="ghost" size="md">
              contact us
            </ButtonLink>{" "}
            for a tailored quote.
          </p>
        )}

        {!loading && !error && plans.length > 0 && (
          <div className="mt-14 grid md:grid-cols-3 gap-5 items-stretch">
            {plans.map((plan, i) => (
              <Reveal key={plan.slug} index={i} className="h-full">
              <div
                className={`h-full rounded-2xl p-7 flex flex-col ${
                  plan.is_featured
                    ? "border-2 border-[var(--color-signal-500)] bg-[var(--color-ink-800)]"
                    : "border border-[var(--color-line-800)] bg-[var(--color-ink-800)]"
                }`}
              >
                {plan.is_featured && (
                  <span className="w-fit rounded-full bg-gradient-to-r from-[var(--color-signal-400)] to-[var(--color-signal-600)] px-2.5 py-1 text-[11px] font-bold text-white mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h2 className="text-lg font-semibold text-[var(--color-mist-100)]">{plan.name}</h2>
                <p className="mt-1 text-sm text-[var(--color-mist-500)]">{plan.tagline}</p>
                <div className="mt-5">
                  {plan.is_custom_pricing || !plan.monthly_price ? (
                    <span className="font-display text-2xl font-semibold text-[var(--color-mist-100)]">Custom pricing</span>
                  ) : (
                    <>
                      <span className="font-display text-2xl font-semibold text-[var(--color-mist-100)]">
                        From {Number(plan.monthly_price).toLocaleString()}
                      </span>
                      <span className="ml-1.5 text-sm text-[var(--color-mist-500)]">{plan.currency} / month</span>
                    </>
                  )}
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-mist-300)]">
                      <Check size={16} className="mt-0.5 shrink-0" color="var(--color-status-ok)" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  to={plan.is_custom_pricing ? "/contact" : "/it-audit"}
                  variant={plan.is_featured ? "primary" : "secondary"}
                  className="mt-7 w-full"
                >
                  {plan.is_custom_pricing ? "Contact us for a tailored plan" : "Get Free IT Audit"}
                </ButtonLink>
              </div>
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[var(--color-mist-600)]">
          Indicative pricing shown in AMD. Final pricing is confirmed after your free IT audit and is set per
          engagement.
        </p>

        <Reveal className="mt-20 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-black text-[var(--color-mist-100)] tracking-tight text-center">
            Pricing questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={pricingFaq} defaultOpen={null} />
          </div>
        </Reveal>

        <Reveal className="mt-16 rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-950)] p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            Not sure which plan fits?
          </h2>
          <p className="mt-3 text-[var(--color-mist-400)] max-w-xl mx-auto">
            A free audit tells us what your infrastructure actually needs before we talk pricing.
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
