import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-[var(--color-line-800)] border-t border-b border-[var(--color-line-800)]">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-sm sm:text-base font-medium text-[var(--color-mist-100)]">{item.q}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 transition-transform duration-300 ease-out ${open === i ? "rotate-180" : ""}`}
              color="var(--color-mist-500)"
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-sm text-[var(--color-mist-400)] leading-relaxed pr-8">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
