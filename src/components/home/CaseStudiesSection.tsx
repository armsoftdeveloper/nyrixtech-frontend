import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../ui/Reveal";

const caseStudies = [
  {
    title: "Secure Network Infrastructure for Retail",
    industry: "Retail",
    summary: "Segmented network, MikroTik routing and Wi-Fi redesign across multiple store locations.",
  },
  {
    title: "Server Monitoring for a Growing Business",
    industry: "Professional Services",
    summary: "Zabbix-based monitoring and alerting deployed across a growing on-premise server fleet.",
  },
  {
    title: "VPN Infrastructure for a Distributed Team",
    industry: "Logistics",
    summary: "Site-to-site and remote-access VPN connecting warehouses and a distributed office team.",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="border-b border-[var(--color-line-800)] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Case studies</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
                Illustrative example projects
              </h2>
            </div>
            <Link to="/case-studies" className="text-sm font-medium text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)] inline-flex items-center gap-1">
              All case studies <ArrowUpRight size={15} />
            </Link>
          </div>

          <p className="mt-3 text-sm text-[var(--color-mist-600)] max-w-xl">
            NYRIXTECH is a newly launched company — the examples below are illustrative demo scenarios showing the
            type of work we do, not real client engagements.
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} index={i}>
              <div className="rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 flex flex-col">
                <span className="inline-flex w-fit rounded-full border border-[var(--color-line-800)] px-2.5 py-1 text-[11px] font-mono text-[var(--color-mist-500)]">
                  DEMO EXAMPLE
                </span>
                <h3 className="mt-4 text-base font-semibold text-[var(--color-mist-100)] leading-snug">{cs.title}</h3>
                <p className="mt-1 text-xs font-mono text-[var(--color-signal-400)]">{cs.industry}</p>
                <p className="mt-3 text-sm text-[var(--color-mist-500)] leading-relaxed">{cs.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
