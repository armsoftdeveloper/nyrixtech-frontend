import { Seo } from "../../components/seo/Seo";
import { Reveal } from "../../components/ui/Reveal";

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How NYRIXTECH collects, uses and protects information submitted through this website."
        path="/privacy-policy"
      />
      <article className="mx-auto max-w-2xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal as="div">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-black text-[var(--color-mist-100)] tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-xs text-[var(--color-mist-600)]">Last updated: August 2026</p>
        </Reveal>

        <Reveal as="div" index={1} className="mt-10 space-y-8 text-sm text-[var(--color-mist-400)] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">1. What this policy covers</h2>
            <p>
              This Privacy Policy explains what information NYRIXTECH ("we", "us") collects through this website,
              why we collect it, and how it's used. It applies to visitors, prospective clients submitting forms,
              and registered client-portal users.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">2. Information we collect</h2>
            <p className="mb-3">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Contact and business details submitted via the Free IT Audit form, the contact form, or an appointment request — name, company name, email, phone number, employee count, and details about your infrastructure or the reason you're reaching out.</li>
              <li>Account information if you register for the client portal — username, email, and profile details you provide.</li>
              <li>Support tickets, messages, and documents you submit through the client portal, if you are a registered client.</li>
            </ul>
            <p className="mt-3">
              We also collect limited technical information automatically — such as which pages are visited and
              general traffic source (for example, whether you arrived via a search engine or an ad campaign) —
              through analytics tooling, where enabled. See our{" "}
              <a href="/cookie-policy" className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
                Cookie Policy
              </a>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">3. How we use this information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To respond to IT audit requests, contact form submissions, and appointment requests.</li>
              <li>To provide and manage client portal accounts, support tickets, and related services for existing clients.</li>
              <li>To understand which marketing channels bring visitors to the site, so we can evaluate what's working.</li>
              <li>To communicate with you about your request, engagement, or account — we do not send unsolicited marketing without a clear way to opt out.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">4. Sharing of information</h2>
            <p>
              We do not sell your information. We may share information with service providers who help us operate
              the site and deliver our services (for example, email delivery or analytics providers), bound to use
              it only for that purpose, or when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">5. Data retention</h2>
            <p>
              We retain information submitted through forms for as long as reasonably necessary to respond to your
              request and maintain business records, or until you ask us to delete it. Client portal account data
              is retained for the duration of the engagement and a reasonable period afterward.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">6. Your rights</h2>
            <p>
              You can ask us what information we hold about you, request a correction, or request deletion, subject
              to any legal or contractual obligations that require us to retain certain records. Contact us using
              the details below to make a request.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">7. Contact</h2>
            <p>
              For questions about this policy or to make a data request,{" "}
              {contactEmail ? (
                <a href={`mailto:${contactEmail}`} className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
                  email us at {contactEmail}
                </a>
              ) : (
                <a href="/contact" className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
                  get in touch via our contact page
                </a>
              )}
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">8. Changes to this policy</h2>
            <p>
              We may update this policy as the site and our services evolve. Material changes will be reflected by
              updating the "Last updated" date above.
            </p>
          </section>
        </Reveal>
      </article>
    </>
  );
}
