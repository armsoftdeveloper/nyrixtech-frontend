import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { DynamicIcon } from "../components/ui/DynamicIcon";
import { ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { solutions } from "../data/solutions";

export default function SolutionsPage() {
  return (
    <>
      <Seo
        title="IT Solutions for Common Business Situations"
        description="Packaged IT solutions from NYRIXTECH — new business IT setup, switching providers, security hardening and cloud migration for Armenian businesses."
        path="/solutions"
      />

      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Solutions</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            Solutions built around common business situations
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Rather than a single fixed package, these are the situations we see most often — each combining the
            specific services needed to solve it. Every engagement is still scoped individually after a free audit.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {solutions.map((sol, i) => (
            <Reveal key={sol.slug} index={i}>
              <div className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 sm:p-7 flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-signal-500)]/10">
                  <DynamicIcon name={sol.icon} size={20} color="var(--color-signal-500)" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-[var(--color-mist-100)]">{sol.name}</h2>
                <p className="mt-1.5 text-sm text-[var(--color-mist-500)] leading-relaxed">{sol.forWho}</p>
                <p className="mt-4 text-sm text-[var(--color-mist-300)] leading-relaxed">{sol.description}</p>

                <p className="mt-5 text-xs font-mono uppercase tracking-wider text-[var(--color-mist-500)]">Includes</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {sol.includes.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line-800)] px-3 py-1 text-xs font-medium text-[var(--color-mist-400)] hover:border-[var(--color-signal-500)] hover:text-[var(--color-mist-100)] transition-colors"
                    >
                      <Check size={11} color="var(--color-signal-400)" /> {s.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-[var(--color-line-800)]">
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-mist-500)]">Outcome</p>
                  <p className="mt-2 text-sm text-[var(--color-mist-400)] leading-relaxed flex-1">{sol.outcome}</p>
                </div>

                <div className="mt-6">
                  <ButtonLink to="/it-audit" variant="secondary" size="md" className="w-full">
                    Get Free IT Audit
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal index={solutions.length} className="mt-14 rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-950)] p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            Don't see your situation here?
          </h2>
          <p className="mt-3 text-[var(--color-mist-400)] max-w-xl mx-auto">
            Most engagements are scoped individually after a free audit — this list covers common starting
            points, not the limits of what we do.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink to="/contact" size="lg" icon={<ArrowRight size={18} />}>
              Talk to us
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
