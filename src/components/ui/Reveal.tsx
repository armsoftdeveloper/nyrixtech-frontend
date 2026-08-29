import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, FormEventHandler } from "react";

type RevealTag = "div" | "section" | "li" | "form";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger entrance animations across a list — pass the item's index. */
  index?: number;
  as?: RevealTag;
  /** Only meaningful when as="form". */
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const tagMap = { div: motion.div, section: motion.section, li: motion.li, form: motion.form } as const;
const plainTagMap = { div: "div", section: "section", li: "li", form: "form" } as const;

/** Fades a block up into place the first time it scrolls into view. No-ops entirely
 * when the visitor prefers reduced motion — the content just renders normally. */
export function Reveal({ children, className, index = 0, as = "div", onSubmit }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const extra = onSubmit ? ({ onSubmit } as Record<string, unknown>) : undefined;

  if (prefersReducedMotion) {
    const Plain = plainTagMap[as] as any;
    return (
      <Plain className={className} {...extra}>
        {children}
      </Plain>
    );
  }

  const Tag = tagMap[as] as any;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      {...extra}
    >
      {children}
    </Tag>
  );
}
