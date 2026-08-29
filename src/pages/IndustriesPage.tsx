import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { DynamicIcon } from "../components/ui/DynamicIcon";
import { ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { industries } from "../data/industries";

export default function IndustriesPage() {
  return (
    <>
      <Seo
        title="Industries We Serve"
        description="Managed IT and cybersecurity for retail, restaurants, hotels, clinics, manufacturing, logistics and professional services businesses in Armenia."
        path="/industries"
      />

      <section className="mx-auto max-w-5xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Industries</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            IT built around how your industry actually operates
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Every industry has its own operational constraints — uptime windows, guest access, sensitive data,
            multiple locations. We size our approach to match yours.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {industries.map((ind) => (
            <a
              key={ind.slug}
              href={`#${ind.slug}`}
              className="rounded-full border border-[var(--color-line-800)] bg-[var(--color-ink-800)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-mist-400)] hover:border-[var(--color-signal-500)] hover:text-[var(--color-mist-100)] transition-colors"
            >
              {ind.name}
            </a>
          ))}
        </div>

        <div className="mt-14 space-y-14">
          {industries.map((ind) => (
            <Reveal key={ind.slug} as="div" className="scroll-mt-24 border-t border-[var(--color-line-800)] pt-10" >
              <div id={ind.slug} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-signal-500)]/10">
                    <DynamicIcon name={ind.icon} size={20} color="var(--color-signal-500)" />
                  </span>
                  <h2 className="font-display text-2xl font-black text-[var(--color-mist-100)] tracking-tight">{ind.name}</h2>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-status-crit)]">Typical challenges</p>
                    <ul className="mt-3 space-y-2.5">
                      {ind.challenges.map((c) => (
                        <li key={c} className="text-sm text-[var(--color-mist-400)] leading-relaxed">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">How NYRIXTECH helps</p>
                    <p className="mt-3 text-sm text-[var(--color-mist-300)] leading-relaxed">{ind.howWeHelp}</p>

                    <p className="mt-5 text-xs font-mono uppercase tracking-wider text-[var(--color-mist-500)]">Relevant services</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {ind.relevantServices.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line-800)] px-3 py-1 text-xs font-medium text-[var(--color-mist-400)] hover:border-[var(--color-signal-500)] hover:text-[var(--color-mist-100)] transition-colors"
                        >
                          <Check size={11} color="var(--color-signal-400)" /> {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <ButtonLink to="/it-audit" size="md" icon={<ArrowRight size={16} />}>
                    Get Free IT Audit
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
