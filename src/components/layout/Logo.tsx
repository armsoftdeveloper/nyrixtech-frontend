/** The same mark used for the site favicon (public/favicon.svg) — keep the two in sync. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="26" height="26" rx="6" stroke="var(--color-signal-500)" strokeWidth="1.4" />
        <circle cx="14" cy="7.5" r="2.1" fill="var(--color-signal-500)" />
        <circle cx="7" cy="19" r="2.1" fill="var(--color-mist-400)" />
        <circle cx="21" cy="19" r="2.1" fill="var(--color-mist-400)" />
        <path d="M14 9.6V14M14 14L7.9 17.3M14 14L20.1 17.3" stroke="var(--color-signal-400)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <span className="font-display font-semibold text-lg tracking-tight text-mist-100" style={{ color: "var(--color-mist-100)" }}>
        NYRIX<span style={{ color: "var(--color-signal-500)" }}>TECH</span>
      </span>
    </div>
  );
}
