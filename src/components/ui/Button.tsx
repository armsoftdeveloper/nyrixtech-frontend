import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { trackCtaClick } from "../../utils/analytics";

interface BaseProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-[var(--color-signal-400)] to-[var(--color-signal-600)] text-white hover:brightness-105 shadow-sm",
  secondary:
    "bg-[var(--color-ink-800)] text-[var(--color-mist-100)] border border-[var(--color-line-800)] hover:border-[var(--color-mist-500)] shadow-sm",
  ghost: "bg-transparent text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)]",
};

const sizeClasses: Record<string, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-150 whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...rest}>
      {children}
      {icon}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
}: BaseProps & { to: string }) {
  function handleClick() {
    // The main conversion CTA appears on nearly every page — tracking it here, once, covers
    // every occurrence instead of instrumenting each page individually.
    if (to === "/it-audit") {
      const label = typeof children === "string" ? children : "Get Free IT Audit";
      trackCtaClick(label, window.location.pathname);
    }
  }

  return (
    <Link to={to} onClick={handleClick} className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
      {icon}
    </Link>
  );
}
