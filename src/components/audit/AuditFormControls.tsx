import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[var(--color-mist-200)] mb-2">{label}</span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] px-4 py-2.5 text-sm text-[var(--color-mist-100)] placeholder:text-[var(--color-mist-600)] outline-none focus:border-[var(--color-signal-500)] transition-colors";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClasses} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClasses} resize-none`} />;
}

/** A phone-only text input — strips anything but digits, spaces, +, -, ( and ) as the visitor types or pastes. */
export function PhoneInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { onChange, ...rest } = props;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.replace(/[^\d+\s()-]/g, "");
    if (cleaned !== e.target.value) {
      e.target.value = cleaned;
    }
    onChange?.(e);
  }

  return <input {...rest} type="tel" inputMode="tel" onChange={handleChange} className={inputClasses} />;
}

interface SelectOptionData {
  value: string;
  label: string;
}

function optionsFromChildren(children: ReactNode): SelectOptionData[] {
  const options: SelectOptionData[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "option") {
      const props = child.props as { value?: string; children?: ReactNode };
      options.push({ value: String(props.value ?? ""), label: String(props.children ?? "") });
    }
  });
  return options;
}

/** A custom-styled dropdown matching the site's own controls, rather than the browser's native
 * `<select>` popup (which can't be styled to match). Accepts the same `<option>` children,
 * value and onChange signature as a native select, so call sites don't need to change. */
export function Select({
  value,
  onChange,
  children,
}: {
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const options = optionsFromChildren(children);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${inputClasses} flex items-center justify-between gap-2 text-left ${!value ? "text-[var(--color-mist-600)]" : ""}`}
      >
        <span className="truncate">{selected?.label || options[0]?.label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          color="var(--color-mist-500)"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-20 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-1.5 shadow-lg"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange?.({ target: { value: opt.value } });
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  opt.value === value
                    ? "bg-[var(--color-signal-500)]/10 text-[var(--color-mist-100)]"
                    : "text-[var(--color-mist-300)] hover:bg-[var(--color-ink-700)]"
                }`}
              >
                {opt.label}
                {opt.value === value && <Check size={14} color="var(--color-signal-400)" className="shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SelectableCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm text-left transition-colors ${
        selected
          ? "border-[var(--color-signal-500)] bg-[var(--color-signal-500)]/10 text-[var(--color-mist-100)]"
          : "border-[var(--color-line-800)] bg-[var(--color-ink-800)] text-[var(--color-mist-300)] hover:border-[var(--color-mist-500)]"
      }`}
    >
      {label}
      {selected && <Check size={15} color="var(--color-signal-400)" className="shrink-0" />}
    </button>
  );
}
