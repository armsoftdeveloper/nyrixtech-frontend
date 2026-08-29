import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Seo } from "../components/seo/Seo";
import { FormField, TextInput, PhoneInput, SelectableCard } from "../components/audit/AuditFormControls";
import { submitITAudit } from "../services/leadForms";
import { getAttribution } from "../utils/attribution";
import { trackAuditStarted, trackAuditStepCompleted, trackAuditSubmitted } from "../utils/analytics";
import type { ITAuditFormData, EmployeeCount, ContactMethod } from "../types";

const STEPS = ["Company", "Team size", "Infrastructure", "Problems", "Contact", "Review"];

const employeeOptions: EmployeeCount[] = ["1-5", "6-20", "21-50", "51-200", "200+"];
const infrastructureOptions = [
  "Windows", "Linux", "Cloud", "On-premise servers", "MikroTik",
  "FortiGate", "Cisco", "Wi-Fi", "CCTV", "VPN", "Backup", "Monitoring",
];
const problemOptions = ["Network", "Security", "Servers", "Backup", "Performance", "Support", "Other"];
const contactMethods: { value: ContactMethod; label: string }[] = [
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Phone" },
  { value: "WHATSAPP", label: "WhatsApp" },
];

const baseInitialData: Omit<ITAuditFormData, keyof ReturnType<typeof getAttribution>> = {
  company_name: "",
  contact_person: "",
  email: "",
  phone: "",
  employee_count: "",
  infrastructure: [],
  problems: [],
  problems_other: "",
  preferred_contact_method: "EMAIL",
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function ITAuditPage() {
  const [step, setStep] = useState(0);
  // Lazy initializer: getAttribution() must run at mount time, not at module-evaluation time
  // — main.tsx's initAttribution() call runs after this module is first imported/evaluated,
  // so reading sessionStorage eagerly here would always see the pre-capture fallback.
  const [data, setData] = useState<ITAuditFormData>(() => ({ ...baseInitialData, ...getAttribution() }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackAuditStarted();
  }, []);

  const isLastStep = step === STEPS.length - 1;

  function canProceed() {
    if (step === 0) return data.company_name.trim() && data.contact_person.trim() && data.email.trim() && data.phone.trim();
    if (step === 1) return !!data.employee_count;
    return true;
  }

  function goToStep(next: number) {
    trackAuditStepCompleted(step + 1, STEPS[step]);
    setStep(next);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const response = await submitITAudit(data);
      trackAuditSubmitted(response.id, data.employee_count);
      setSubmitted(true);
    } catch {
      setError("Something went wrong submitting your request. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const seo = (
    <Seo
      title="Free IT Audit for Your Business"
      description="Get a free, no-obligation IT infrastructure audit for your business in Armenia — network, servers, backup, and security reviewed by NYRIXTECH engineers."
      path="/it-audit"
    />
  );

  if (submitted) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        {seo}
        <div className="max-w-md text-center">
          <CheckCircle2 size={48} color="var(--color-status-ok)" className="mx-auto" />
          <h1 className="mt-6 font-display text-2xl font-semibold text-[var(--color-mist-100)]">
            Your IT audit request has been received.
          </h1>
          <p className="mt-3 text-[var(--color-mist-400)] leading-relaxed">
            A NYRIXTECH engineer will reach out via your preferred contact method within one business day to
            schedule your free infrastructure assessment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 lg:px-8 py-16">
      {seo}
      <div className="text-center mb-10">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Free IT Audit</p>
        <h1 className="mt-3 font-display text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
          Tell us about your infrastructure
        </h1>
        <p className="mt-2 text-sm text-[var(--color-mist-500)]">Takes about 2 minutes. No obligation.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors ${
                i <= step ? "bg-[var(--color-signal-500)]" : "bg-[var(--color-line-800)]"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-[var(--color-mist-100)]">Your company</h2>
                <FormField label="Company name">
                  <TextInput
                    value={data.company_name}
                    onChange={(e) => setData({ ...data, company_name: e.target.value })}
                    placeholder="Acme LLC"
                  />
                </FormField>
                <FormField label="Contact person">
                  <TextInput
                    value={data.contact_person}
                    onChange={(e) => setData({ ...data, contact_person: e.target.value })}
                    placeholder="Full name"
                  />
                </FormField>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Email">
                    <TextInput
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="you@company.com"
                    />
                  </FormField>
                  <FormField label="Phone">
                    <PhoneInput
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="+374 XX XXX XXX"
                    />
                  </FormField>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-mist-100)] mb-5">How many employees?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {employeeOptions.map((opt) => (
                    <SelectableCard
                      key={opt}
                      label={opt}
                      selected={data.employee_count === opt}
                      onClick={() => setData({ ...data, employee_count: opt })}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-mist-100)] mb-1">Current infrastructure</h2>
                <p className="text-sm text-[var(--color-mist-500)] mb-5">Select everything that applies.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {infrastructureOptions.map((opt) => (
                    <SelectableCard
                      key={opt}
                      label={opt}
                      selected={data.infrastructure.includes(opt)}
                      onClick={() => setData({ ...data, infrastructure: toggleValue(data.infrastructure, opt) })}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-mist-100)] mb-1">Main problems</h2>
                <p className="text-sm text-[var(--color-mist-500)] mb-5">What's bothering you most right now?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {problemOptions.map((opt) => (
                    <SelectableCard
                      key={opt}
                      label={opt}
                      selected={data.problems.includes(opt)}
                      onClick={() => setData({ ...data, problems: toggleValue(data.problems, opt) })}
                    />
                  ))}
                </div>
                {data.problems.includes("Other") && (
                  <div className="mt-4">
                    <FormField label="Tell us more">
                      <TextInput
                        value={data.problems_other}
                        onChange={(e) => setData({ ...data, problems_other: e.target.value })}
                        placeholder="Briefly describe the issue"
                      />
                    </FormField>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-mist-100)] mb-5">Preferred contact method</h2>
                <div className="grid grid-cols-3 gap-3">
                  {contactMethods.map((m) => (
                    <SelectableCard
                      key={m.value}
                      label={m.label}
                      selected={data.preferred_contact_method === m.value}
                      onClick={() => setData({ ...data, preferred_contact_method: m.value })}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-mist-100)] mb-5">Review your request</h2>
                <dl className="space-y-3 text-sm">
                  <Row label="Company" value={data.company_name} />
                  <Row label="Contact" value={`${data.contact_person} · ${data.email} · ${data.phone}`} />
                  <Row label="Employees" value={data.employee_count} />
                  <Row label="Infrastructure" value={data.infrastructure.join(", ") || "—"} />
                  <Row label="Problems" value={data.problems.join(", ") || "—"} />
                  <Row label="Preferred contact" value={data.preferred_contact_method} />
                </dl>
                {error && <p className="mt-4 text-sm text-[var(--color-status-crit)]">{error}</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={step === 0 ? "invisible" : ""}
            icon={<ArrowLeft size={16} />}
          >
            Back
          </Button>

          {!isLastStep ? (
            <Button type="button" disabled={!canProceed()} onClick={() => goToStep(step + 1)} icon={<ArrowRight size={16} />}>
              Continue
            </Button>
          ) : (
            <Button type="button" disabled={submitting} onClick={handleSubmit} icon={submitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}>
              {submitting ? "Submitting..." : "Submit request"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-[var(--color-line-800)]">
      <dt className="text-[var(--color-mist-500)]">{label}</dt>
      <dd className="text-[var(--color-mist-100)] text-right">{value}</dd>
    </div>
  );
}
