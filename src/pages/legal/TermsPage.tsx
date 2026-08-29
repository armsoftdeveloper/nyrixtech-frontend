import { Seo } from "../../components/seo/Seo";
import { Reveal } from "../../components/ui/Reveal";
import { trackEmailClick } from "../../utils/analytics";

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms governing use of the NYRIXTECH website, IT audit requests, and client portal."
        path="/terms"
      />
      <article className="mx-auto max-w-2xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal as="div">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-black text-[var(--color-mist-100)] tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-xs text-[var(--color-mist-600)]">Last updated: August 2026</p>
        </Reveal>

        <Reveal as="div" index={1} className="mt-10 space-y-8 text-sm text-[var(--color-mist-400)] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">1. Acceptance of terms</h2>
            <p>
              By using this website or submitting a form (including the Free IT Audit request, contact form, or
              client portal registration), you agree to these Terms of Service. If you do not agree, please do not
              use the site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">2. What this site provides</h2>
            <p>
              This website describes NYRIXTECH's Managed IT and Cybersecurity services and provides ways to request
              a free IT audit, contact us, or manage an existing engagement through a client portal. Submitting a
              form or request through this site does not by itself create a service agreement — a paid engagement
              begins only once both parties agree to a scope and pricing following the audit and consultation
              process.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">3. Free IT audit</h2>
            <p>
              The Free IT Audit is offered at no cost and with no obligation to purchase further services.
              Recommendations provided as part of the audit are based on the information you provide and reflect a
              general assessment, not a guarantee of specific outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">4. Client portal accounts</h2>
            <p>
              If you register for a client portal account, you're responsible for keeping your login credentials
              confidential and for activity that occurs under your account. Notify us promptly if you suspect
              unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">5. Acceptable use</h2>
            <p>
              You agree not to misuse this website — including attempting to gain unauthorized access to any part
              of the site or its systems, submitting false information, or using the site to transmit unlawful or
              harmful content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">6. Intellectual property</h2>
            <p>
              The content, design, and branding of this website belong to NYRIXTECH unless otherwise noted, and may
              not be copied or reused without permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">7. No warranty; limitation of liability</h2>
            <p>
              This website and the information on it are provided "as is," without warranties of any kind. To the
              extent permitted by law, NYRIXTECH is not liable for any indirect or consequential loss arising from
              use of this website. This does not limit liability arising from a separately agreed service contract,
              which is governed by its own terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">8. Governing law</h2>
            <p>These terms are governed by the laws of the Republic of Armenia.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">9. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the site after changes are posted
              constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-mist-100)] mb-2">10. Contact</h2>
            <p>
              Questions about these terms?{" "}
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  onClick={() => trackEmailClick(contactEmail, "terms_page")}
                  className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]"
                >
                  Email us at {contactEmail}
                </a>
              ) : (
                <a href="/contact" className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
                  Get in touch via our contact page
                </a>
              )}
              .
            </p>
          </section>
        </Reveal>
      </article>
    </>
  );
}
