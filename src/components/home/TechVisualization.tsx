import { useState } from "react";
import { Router, Server, ShieldCheck, HardDrive, Wifi, Monitor } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const nodes = [
  { icon: ShieldCheck, label: "Firewall", status: "Protected", detail: "Perimeter security actively filtering traffic." },
  { icon: Router, label: "MikroTik Router", status: "Online", detail: "Core routing and VLAN segmentation." },
  { icon: Wifi, label: "Wireless Access", status: "Online", detail: "Managed Wi-Fi across all locations." },
  { icon: Server, label: "Application Server", status: "Healthy", detail: "CPU 22% · RAM 41% · Uptime 99.98%." },
  { icon: HardDrive, label: "Backup Node", status: "Synced", detail: "Last successful backup: 14 minutes ago." },
  { icon: Monitor, label: "Workstations", status: "Monitored", detail: "42 endpoints reporting normally." },
];

export function TechVisualization() {
  const [active, setActive] = useState(0);
  const Active = nodes[active];

  return (
    <section className="border-b border-[var(--color-line-800)] py-20 bg-[var(--color-ink-950)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Live view</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight max-w-xl">
            What monitoring your infrastructure actually looks like
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid lg:grid-cols-5 gap-6" index={1}>
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              const isActive = i === active;
              return (
                <button
                  key={node.label}
                  onClick={() => setActive(i)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    isActive
                      ? "border-[var(--color-signal-500)] bg-[var(--color-ink-800)]"
                      : "border-[var(--color-line-800)] bg-[var(--color-ink-800)]/60 hover:border-[var(--color-mist-600)]"
                  }`}
                >
                  <Icon size={18} color={isActive ? "var(--color-signal-400)" : "var(--color-mist-500)"} />
                  <p className="mt-3 text-sm font-medium text-[var(--color-mist-100)]">{node.label}</p>
                  <p className="mt-1 text-xs font-mono text-[var(--color-status-ok)]">{node.status}</p>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2 rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 flex flex-col justify-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-signal-500)]/10">
              <Active.icon size={18} color="var(--color-signal-400)" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-[var(--color-mist-100)]">{Active.label}</h3>
            <p className="mt-2 text-sm text-[var(--color-mist-400)] leading-relaxed font-mono">{Active.detail}</p>
            <p className="mt-4 text-[11px] text-[var(--color-mist-600)]">
              Illustrative dashboard preview — connects to live monitoring (e.g. Zabbix) once deployed.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
