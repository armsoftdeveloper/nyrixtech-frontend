import { Link } from "react-router-dom";
import { LifeBuoy, Network, ShieldCheck, Server, DatabaseBackup, Activity, Cloud, Workflow, ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const services = [
  { icon: LifeBuoy, name: "IT Support", to: "/services/managed-it", desc: "Responsive help desk for your whole team." },
  { icon: Network, name: "Network Infrastructure", to: "/services/network-infrastructure", desc: "MikroTik, Wi-Fi, VPN, structured cabling." },
  { icon: ShieldCheck, name: "Cybersecurity", to: "/services/cybersecurity", desc: "Firewalls, endpoint protection, audits." },
  { icon: Server, name: "Servers", to: "/services/servers", desc: "Windows Server, Linux, virtualization." },
  { icon: DatabaseBackup, name: "Backup", to: "/services/backup", desc: "Automated backup and disaster recovery." },
  { icon: Activity, name: "Monitoring", to: "/services/monitoring", desc: "24/7 monitoring with Zabbix and alerting." },
  { icon: Cloud, name: "Cloud", to: "/services/cloud", desc: "Microsoft 365, Google Workspace, cloud infra." },
  { icon: Workflow, name: "Automation", to: "/services/automation", desc: "Infrastructure and AI-driven automation." },
];

export function SolutionSection() {
  return (
    <section className="border-b border-[var(--color-line-800)] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">What we do</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
              Everything your business needs to operate securely
            </h2>
          </div>
          <Link to="/services" className="text-sm font-medium text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)] inline-flex items-center gap-1">
            View all services <ArrowUpRight size={15} />
          </Link>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ icon: Icon, name, to, desc }, i) => (
            <Reveal key={name} index={i}>
              <Link
                to={to}
                className="group block rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-5 hover:border-[var(--color-signal-500)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-signal-500)]/10">
                  <Icon size={18} color="var(--color-signal-400)" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-[var(--color-mist-100)]">{name}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-mist-500)] leading-relaxed">{desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-mist-500)] group-hover:text-[var(--color-signal-400)]">
                  Learn more <ArrowUpRight size={12} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
