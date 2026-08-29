import { ArrowRight, ClipboardCheck, FileStack, Radar, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/seo/Seo";
import { ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";

const principles = [
  {
    icon: ClipboardCheck,
    title: "Audit before we recommend",
    body: "Every engagement starts with a free IT audit — we assess your actual infrastructure before proposing anything. Recommendations follow the audit, not the other way around.",
  },
  {
    icon: FileStack,
    title: "Documented, not tribal knowledge",
    body: "Every system we manage gets documented. Your infrastructure shouldn't depend on one person's memory — ours or yours.",
  },
  {
    icon: Radar,
    title: "Proactive, not reactive",
    body: "Monitoring and maintenance are built into how we work, so problems get caught before they turn into downtime.",
  },
  {
    icon: UserCheck,
    title: "One accountable partner",
    body: "You get a single point of contact responsible for your infrastructure — not a rotating cast of contractors and unanswered tickets.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About NYRIXTECH"
        description="NYRIXTECH is a Managed IT and Cybersecurity partner for Armenian businesses — built to take long-term responsibility for your infrastructure, not just fix what's broken today."
        path="/about"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-line-800)]">
        <div className="absolute inset-0 bg-blueprint bg-blueprint-fade" />
        <Reveal as="div" className="relative mx-auto max-w-3xl px-5 lg:px-8 pt-16 pb-16 lg:pt-20 lg:pb-20 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">About NYRIXTECH</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-mist-100)]">
            Built to be a long-term IT partner, not a one-off fix
          </h1>
          <p className="mt-5 text-lg text-[var(--color-mist-400)] leading-relaxed">
            NYRIXTECH exists to give Armenian businesses professional, reliable IT infrastructure — without the cost
            and complexity of building a large internal IT department.
          </p>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Why we exist</p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            IT that no one is truly responsible for
          </h2>
          <div className="mt-5 space-y-4 text-[var(--color-mist-400)] leading-relaxed">
            <p>
              Most small and mid-sized businesses run into the same problem: their IT depends on a mix of ad-hoc
              contractors, a single overloaded employee, or infrastructure nobody has reviewed in years. When
              something breaks, there's no plan — just a scramble.
            </p>
            <p>
              NYRIXTECH exists to fix that. We act as the IT department a growing business needs but doesn't want to
              build from scratch — handling infrastructure, security and support as one accountable partner, with the
              standards and documentation of an enterprise IT team.
            </p>
            <p>
              We work with businesses of roughly 5 to 200 employees across retail, hospitality, healthcare,
              manufacturing, logistics and professional services — companies that need dependable IT but don't need,
              or can't yet justify, a full internal department.
            </p>
          </div>
        </Reveal>
      </section>

      {/* How we work */}
      <section className="border-t border-[var(--color-line-800)] py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">How we work</p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight max-w-xl">
              Four principles behind every engagement
            </h2>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} index={i}>
                <div className="rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-signal-500)]/10">
                    <Icon size={18} color="var(--color-signal-400)" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-[var(--color-mist-100)]">{title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--color-mist-500)] leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where we're headed */}
      <section className="border-t border-[var(--color-line-800)] py-16 bg-[var(--color-ink-950)]">
        <Reveal as="div" className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Where we're headed</p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            Built for the long term
          </h2>
          <p className="mt-5 text-[var(--color-mist-400)] leading-relaxed">
            NYRIXTECH starts with Managed IT and Cybersecurity for businesses in Armenia — this is where we earn
            trust and prove the work. As we grow, we're investing in the monitoring and automation tooling we build
            for our own clients, with the goal of expanding what NYRIXTECH can offer over time. We're building a
            company designed to grow alongside the businesses we support, not a quick engagement.
          </p>
        </Reveal>
      </section>

      {/* Quick links */}
      <section className="border-t border-[var(--color-line-800)] py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 grid sm:grid-cols-2 gap-5">
          <Reveal index={0}>
            <Link
              to="/services"
              className="group block rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 hover:border-[var(--color-signal-500)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200"
            >
              <h3 className="text-base font-semibold text-[var(--color-mist-100)]">What we do</h3>
              <p className="mt-1.5 text-sm text-[var(--color-mist-500)] leading-relaxed">
                Managed IT, network infrastructure, cybersecurity, servers, backup, monitoring, cloud and automation.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-signal-400)]">
                Browse services <ArrowRight size={12} />
              </span>
            </Link>
          </Reveal>
          <Reveal index={1}>
            <Link
              to="/industries"
              className="group block rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 hover:border-[var(--color-signal-500)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200"
            >
              <h3 className="text-base font-semibold text-[var(--color-mist-100)]">Who we work with</h3>
              <p className="mt-1.5 text-sm text-[var(--color-mist-500)] leading-relaxed">
                Retail, restaurants, hotels, clinics, manufacturing, logistics and professional services.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-signal-400)]">
                See industries <ArrowRight size={12} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <Reveal as="section" className="border-t border-[var(--color-line-800)] py-16 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
          Ready to find out where your IT actually stands?
        </h2>
        <p className="mt-3 text-[var(--color-mist-400)] max-w-lg mx-auto">
          A free audit takes under a week and comes with zero obligation.
        </p>
        <div className="mt-7 flex justify-center">
          <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
            Get Free IT Audit
          </ButtonLink>
        </div>
      </Reveal>
    </>
  );
}
