import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { ButtonLink } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Industries", to: "/industries" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line-800)] bg-[var(--color-ink-900)]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-[var(--color-mist-100)]" : "text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)]">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)]">
                Client Login
              </Link>
            )}
            <ButtonLink to="/it-audit" size="md" icon={<ArrowRight size={16} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>

          <button
            className="lg:hidden text-[var(--color-mist-200)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-[var(--color-line-800)] bg-[var(--color-ink-900)]"
          >
            <nav className="flex flex-col gap-4 px-5 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-[var(--color-mist-200)]"
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-[var(--color-mist-400)]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="text-left text-base font-medium text-[var(--color-mist-400)]"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="text-base font-medium text-[var(--color-mist-400)]">
                  Client Login
                </Link>
              )}
              <ButtonLink to="/it-audit" size="lg" className="mt-2 w-full">
                Get Free IT Audit
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
