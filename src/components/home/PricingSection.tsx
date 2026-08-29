import { Check } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

const plans = [
  {
    name: "Starter",
    price: "From 149,000",
    period: "AMD / month",
    desc: "For small offices getting their first real IT support.",
    features: ["Up to 15 devices", "Remote help desk", "Monthly health checks", "Basic backup monitoring"],
    featured: false,
  },
  {
    name: "Business",
    price: "From 349,000",
    period: "AMD / month",
    desc: "For growing companies that need proactive management.",
    features: [
      "Up to 60 devices",
      "24/7 infrastructure monitoring",
      "Firewall & network management",
      "Backup & disaster recovery",
      "Priority response SLA",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    desc: "For multi-site or compliance-driven organizations.",
    features: [
      "Unlimited devices",
      "Dedicated account engineer",
      "Cybersecurity program & audits",
      "Cloud & server architecture",
      "Custom SLA & reporting",
    ],
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="border-b border-[var(--color-line-800)] py-20 bg-[var(--color-ink-950)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Pricing</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            Predictable monthly plans
          </h2>
          <p className="mt-3 text-[var(--color-mist-400)]">
            Every engagement starts with a free audit, so your plan matches your actual infrastructure.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} index={i} className="h-full">
              <div
                className={`h-full rounded-2xl p-7 flex flex-col ${
                  plan.featured
                    ? "border-2 border-[var(--color-signal-500)] bg-[var(--color-ink-800)]"
                    : "border border-[var(--color-line-800)] bg-[var(--color-ink-800)]"
                }`}
              >
                {plan.featured && (
                  <span className="w-fit rounded-full bg-gradient-to-r from-[var(--color-signal-400)] to-[var(--color-signal-600)] px-2.5 py-1 text-[11px] font-bold text-white mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-lg font-semibold text-[var(--color-mist-100)]">{plan.name}</h3>
                <p className="mt-1 text-sm text-[var(--color-mist-500)]">{plan.desc}</p>
                <div className="mt-5">
                  <span className="font-display text-2xl font-semibold text-[var(--color-mist-100)]">{plan.price}</span>
                  <span className="ml-1.5 text-sm text-[var(--color-mist-500)]">{plan.period}</span>
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
                  to="/it-audit"
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-7 w-full"
                >
                  Get Free IT Audit
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-[var(--color-mist-600)]">
          Indicative pricing shown in AMD — final pricing is confirmed after your free IT audit and is
          admin-configurable.
        </p>
      </div>
    </section>
  );
}
