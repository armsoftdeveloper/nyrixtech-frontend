import { Seo } from "../../components/seo/Seo";
import { Reveal } from "../../components/ui/Reveal";

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;
const gaEnabled = Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID);

export default function CookiePolicyPage() {
  return (
    <>
      <Seo
        title="Cookie Policy"
        description="What cookies and local storage NYRIXTECH's website uses, and why."
        path="/cookie-policy"
      />
      <article className="mx-auto max-w-2xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal as="div">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-black text-[var(--color-mist-100)] tracking-tight">Cookie Policy</h1>
        <p className="mt-3 text-xs text-[var(--color-mist-600)]">Last updated: August 2026</p>
        </Reveal>

        <Reveal as="div" index={1} className="mt-10 space-y-8 text-sm text-[var(--color-mist-400)] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">1. What this covers</h2>
            <p>
              This page explains what cookies and browser storage this website uses. We keep this to the minimum
              needed to run the site and, where enabled, understand how it's used.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">2. Essential storage</h2>
            <p className="mb-3">
              These are required for the site to function and can't be disabled without breaking core features:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-[var(--color-mist-200)]">Authentication tokens</strong> — if you sign in to
                the client portal, we store your session tokens in your browser's local storage so you stay signed
                in between visits.
              </li>
              <li>
                <strong className="text-[var(--color-mist-200)]">Session attribution</strong> — a small piece of
                session storage records which marketing channel brought you to the site (for example, a search
                engine or ad campaign), so that if you submit a form we know which channel it came from. This is
                cleared when you close your browser tab session.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">3. Analytics</h2>
            <p>
              {gaEnabled
                ? "This site uses Google Analytics 4 to understand aggregate traffic and how visitors use the site — for example, which pages are visited and whether the Free IT Audit form is completed. This does not identify you individually for our purposes."
                : "Analytics tooling (Google Analytics 4) is built into this site's codebase but is only activated when a measurement ID is configured. If active, it helps us understand aggregate traffic and how visitors use the site."}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">4. What we don't do</h2>
            <p>
              We don't use advertising or cross-site tracking cookies, and we don't sell browsing data to third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">5. Managing storage</h2>
            <p>
              You can clear cookies and local/session storage at any time through your browser settings. Doing so
              will sign you out of the client portal if you're logged in.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">6. Questions</h2>
            <p>
              {contactEmail ? (
                <a href={`mailto:${contactEmail}`} className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
                  Email us at {contactEmail}
                </a>
              ) : (
                <a href="/contact" className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
                  Get in touch via our contact page
                </a>
              )}
              {" "}
              if you have questions about this policy.
            </p>
          </section>
        </Reveal>
      </article>
    </>
  );
}
