import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { trackPhoneClick, trackEmailClick } from "../../utils/analytics";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Managed IT", to: "/services/managed-it" },
      { label: "Network Infrastructure", to: "/services/network-infrastructure" },
      { label: "Cybersecurity", to: "/services/cybersecurity" },
      { label: "Servers", to: "/services/servers" },
      { label: "Backup & Disaster Recovery", to: "/services/backup" },
      { label: "Monitoring", to: "/services/monitoring" },
      { label: "Cloud", to: "/services/cloud" },
      { label: "Automation", to: "/services/automation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Projects", to: "/projects" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Free IT Audit", to: "/it-audit" },
      { label: "Pricing", to: "/pricing" },
      { label: "Client Login", to: "/login" },
      { label: "Create Account", to: "/register" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line-800)] bg-[var(--color-ink-950)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-mist-500)] max-w-xs">
              We manage your IT infrastructure so you can focus on your business. Networking, servers, cybersecurity
              and monitoring for Armenian companies — built to scale internationally.
            </p>
            <div className="mt-6 space-y-1.5 text-xs font-mono text-[var(--color-mist-600)]">
              <p>Yerevan, Armenia</p>
              <p>
                <a
                  href="tel:+37441843414"
                  onClick={() => trackPhoneClick("+37441843414", "footer")}
                  className="hover:text-[var(--color-mist-300)] transition-colors"
                >
                  +374 41 843 414
                </a>
                <span className="mx-1.5 text-[var(--color-line-800)]">·</span>
                <a
                  href="tel:+37477850702"
                  onClick={() => trackPhoneClick("+37477850702", "footer")}
                  className="hover:text-[var(--color-mist-300)] transition-colors"
                >
                  +374 77 850 702
                </a>
              </p>
              <p>
                <a
                  href="mailto:nyrixtech@gmail.com"
                  onClick={() => trackEmailClick("nyrixtech@gmail.com", "footer")}
                  className="hover:text-[var(--color-mist-300)] transition-colors"
                >
                  nyrixtech@gmail.com
                </a>
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mist-500)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[var(--color-line-800)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-mist-600)]">
            © {new Date().getFullYear()} NYRIXTECH. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="text-xs text-[var(--color-mist-600)] hover:text-[var(--color-mist-300)] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-[var(--color-mist-600)] hover:text-[var(--color-mist-300)] transition-colors">
              Terms
            </Link>
            <Link to="/cookie-policy" className="text-xs text-[var(--color-mist-600)] hover:text-[var(--color-mist-300)] transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="text-xs font-mono text-[var(--color-mist-600)]">24/7 Monitoring · Secure by Design</p>
        </div>
      </div>
    </footer>
  );
}
