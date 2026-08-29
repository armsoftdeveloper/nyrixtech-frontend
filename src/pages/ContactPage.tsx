import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { Button, ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { FormField, TextInput, PhoneInput, TextArea, Select } from "../components/audit/AuditFormControls";
import { submitContactForm } from "../services/leadForms";
import { services } from "../data/services";
import type { ContactFormData } from "../types";
import { extractErrorMessage } from "../utils/errors";
import { getAttribution } from "../utils/attribution";
import { trackContactSubmitted } from "../utils/analytics";

const baseInitialForm: Omit<ContactFormData, keyof ReturnType<typeof getAttribution>> = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;
const contactPhone = import.meta.env.VITE_CONTACT_PHONE as string | undefined;
const contactAddress = import.meta.env.VITE_CONTACT_ADDRESS as string | undefined;
const hasDirectContact = Boolean(contactEmail || contactPhone || contactAddress);

export default function ContactPage() {
  // Lazy initializer — see the matching comment in ITAuditPage.tsx for why getAttribution()
  // must not be called at module-evaluation time.
  const [form, setForm] = useState<ContactFormData>(() => ({ ...baseInitialForm, ...getAttribution() }));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ContactFormData>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitContactForm(form);
      trackContactSubmitted();
      setSubmitted(true);
    } catch (err) {
      setError(extractErrorMessage(err, "Something went wrong sending your message. Please try again."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with NYRIXTECH about Managed IT, cybersecurity or infrastructure support for your business — or start with a free IT audit."
        path="/contact"
      />

      <section className="mx-auto max-w-5xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Contact</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            Let's talk about your infrastructure
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Tell us a bit about your business and what you need. If you'd rather start with a structured assessment,
            the fastest path is a free IT audit.
          </p>
          <div className="mt-6">
            <ButtonLink to="/it-audit" icon={<ArrowRight size={16} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-5 gap-8">
          <Reveal as="div" className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-8 text-center">
                <CheckCircle2 size={40} color="var(--color-status-ok)" className="mx-auto" />
                <h2 className="mt-5 text-lg font-semibold text-[var(--color-mist-100)]">Message sent</h2>
                <p className="mt-2 text-sm text-[var(--color-mist-400)] leading-relaxed">
                  Thanks for reaching out — we'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Full name">
                    <TextInput
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Full name"
                      required
                    />
                  </FormField>
                  <FormField label="Company">
                    <TextInput value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" />
                  </FormField>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Email">
                    <TextInput
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@company.com"
                      required
                    />
                  </FormField>
                  <FormField label="Phone">
                    <PhoneInput
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+374 XX XXX XXX"
                    />
                  </FormField>
                </div>

                <FormField label="What do you need help with?">
                  <Select value={form.service} onChange={(e) => set("service", e.target.value)}>
                    <option value="">Select a service (optional)</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Other">Other / not sure</option>
                  </Select>
                </FormField>

                <FormField label="Message">
                  <TextArea
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Tell us about your infrastructure or what's prompting you to reach out."
                    rows={5}
                    required
                  />
                </FormField>

                {error && <p className="text-sm text-[var(--color-status-crit)]">{error}</p>}

                <Button
                  type="submit"
                  disabled={submitting}
                  icon={submitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                >
                  {submitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </Reveal>

          <div className="lg:col-span-2 space-y-5">
            <Reveal index={1}>
              <div className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6">
                <h2 className="text-sm font-semibold text-[var(--color-mist-100)]">Free IT Audit</h2>
                <p className="mt-2 text-sm text-[var(--color-mist-500)] leading-relaxed">
                  Not ready to write a message? A free audit is a structured, no-obligation way to see exactly where
                  your infrastructure stands — takes under a week.
                </p>
                <div className="mt-4">
                  <ButtonLink to="/it-audit" variant="secondary" size="md" className="w-full">
                    Start Free IT Audit
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            {hasDirectContact && (
              <Reveal index={2}>
                <div className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 space-y-4">
                  <h2 className="text-sm font-semibold text-[var(--color-mist-100)]">Direct contact</h2>
                  {contactEmail && (
                    <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-sm text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)]">
                      <Mail size={16} color="var(--color-signal-400)" /> {contactEmail}
                    </a>
                  )}
                  {contactPhone && (
                    <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm text-[var(--color-mist-400)] hover:text-[var(--color-mist-100)]">
                      <Phone size={16} color="var(--color-signal-400)" /> {contactPhone}
                    </a>
                  )}
                  {contactAddress && (
                    <div className="flex items-start gap-3 text-sm text-[var(--color-mist-400)]">
                      <MapPin size={16} color="var(--color-signal-400)" className="mt-0.5 shrink-0" /> {contactAddress}
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            <Reveal index={3}>
              <div className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6">
                <h2 className="text-sm font-semibold text-[var(--color-mist-100)]">Response time</h2>
                <p className="mt-2 text-sm text-[var(--color-mist-500)] leading-relaxed">
                  We aim to respond to every inquiry within one business day.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
