import { Reveal } from "../ui/Reveal";

const steps = [
  { n: "01", title: "Free IT Audit", desc: "We assess your current infrastructure at no cost." },
  { n: "02", title: "Infrastructure Assessment", desc: "A clear report of risks, gaps and priorities." },
  { n: "03", title: "Implementation", desc: "We fix, upgrade and secure your systems." },
  { n: "04", title: "Continuous Monitoring", desc: "24/7 monitoring and proactive support, ongoing." },
];

export function HowItWorks() {
  return (
    <section className="border-b border-[var(--color-line-800)] py-20 bg-[var(--color-ink-950)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Process</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight max-w-xl">
            How we take over your IT
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, i) => (
            <Reveal key={step.n} index={i} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-signal-500)]/10">
                <span className="font-display text-xl font-black text-[var(--color-signal-500)]">{step.n}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--color-mist-100)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-mist-500)] leading-relaxed">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
