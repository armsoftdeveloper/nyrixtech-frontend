import { WifiOff, ShieldAlert, DatabaseZap, Gauge, ServerCrash, Boxes, UserX } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const problems = [
  { icon: WifiOff, label: "Network downtime" },
  { icon: ShieldAlert, label: "Security risks" },
  { icon: DatabaseZap, label: "No reliable backup" },
  { icon: Gauge, label: "Slow computers" },
  { icon: ServerCrash, label: "Server failures" },
  { icon: Boxes, label: "Unmanaged infrastructure" },
  { icon: UserX, label: "No dedicated IT team" },
];

export function ProblemSection() {
  return (
    <section className="border-b border-[var(--color-line-800)] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">The reality</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            Most businesses run IT in reactive mode
          </h2>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Problems get handled after they cost you money — a crashed server, a breach, a backup that never
            actually worked.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {problems.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} index={i}>
              <div className="rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] px-4 py-5 flex flex-col gap-3">
                <Icon size={18} color="var(--color-status-crit)" />
                <span className="text-sm font-medium text-[var(--color-mist-200)]">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
