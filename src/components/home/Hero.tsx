import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { InfrastructureFlow } from "./InfrastructureFlow";

const indicators = ["24/7 Monitoring", "Secure Infrastructure", "Fast Support", "Predictable Costs"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line-800)]">
      <div className="absolute inset-0 bg-blueprint bg-blueprint-fade" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-800)] px-3 py-1 text-xs font-mono text-[var(--color-mist-400)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-ok)]" />
              Managed IT for Armenian businesses
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-[1.08] tracking-tight text-[var(--color-mist-100)]"
            >
              Your IT Infrastructure.
              <br />
              <span style={{ color: "var(--color-signal-400)" }}>Our Responsibility.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg text-[var(--color-mist-400)] max-w-lg leading-relaxed"
            >
              Secure, monitor and manage your company's IT infrastructure with one reliable technology partner.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
                Get Free IT Audit
              </ButtonLink>
              <ButtonLink to="/services" variant="secondary" size="lg">
                Explore Services
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
            >
              {indicators.map((label) => (
                <span key={label} className="text-xs font-mono text-[var(--color-mist-500)]">
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          <InfrastructureFlow />
        </div>
      </div>
    </section>
  );
}
