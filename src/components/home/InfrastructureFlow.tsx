import { motion } from "framer-motion";
import { Globe, ShieldCheck, Network, Server, Cloud, Users } from "lucide-react";

const nodes = [
  { icon: Globe, label: "Internet" },
  { icon: ShieldCheck, label: "Firewall" },
  { icon: Network, label: "Network" },
  { icon: Server, label: "Servers" },
  { icon: Cloud, label: "Cloud" },
  { icon: Users, label: "Employees" },
];

export function InfrastructureFlow() {
  return (
    <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
      <div className="relative flex flex-col items-center">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isLast = i === nodes.length - 1;
          return (
            <div key={node.label} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative flex items-center gap-3 rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] px-5 py-3 w-56"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                  style={{
                    background:
                      i === 1 || i === 3
                        ? "rgba(233,127,0,0.14)"
                        : "rgba(100,116,139,0.12)",
                  }}
                >
                  <Icon
                    size={16}
                    color={i === 1 || i === 3 ? "var(--color-signal-400)" : "var(--color-mist-400)"}
                  />
                </span>
                <span className="text-sm font-medium text-[var(--color-mist-100)] font-mono">{node.label}</span>

                {i === 1 && (
                  <span className="ml-auto flex h-1.5 w-1.5 rounded-full bg-[var(--color-status-ok)]" />
                )}
              </motion.div>

              {!isLast && (
                <div className="relative h-8 w-px bg-[var(--color-line-800)] overflow-hidden">
                  <motion.span
                    className="absolute left-0 top-0 h-3 w-px"
                    style={{ background: "var(--color-signal-500)" }}
                    animate={{ y: [0, 32] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      delay: i * 0.15,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
