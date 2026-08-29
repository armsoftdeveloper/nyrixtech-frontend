import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { FormField, TextInput, PhoneInput } from "../../components/audit/AuditFormControls";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";
import { Seo } from "../../components/seo/Seo";
import type { RegisterPayload } from "../../types";

const initialForm: RegisterPayload & { confirmPassword: string } = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  company_name: "",
};

export default function RegisterPage() {
  const { register, user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  function set<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const { confirmPassword: _confirmPassword, ...payload } = form;
      await register(payload);
    } catch (err) {
      setError(extractErrorMessage(err, "Couldn't create your account. Please try again."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-lg px-5 py-20">
      <Seo title="Create Account" description="Create a NYRIXTECH client account." path="/register" noindex />
      <Reveal className="text-center mb-8">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Client Portal</p>
        <h1 className="mt-3 font-display text-3xl font-black text-[var(--color-mist-100)] tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-[var(--color-mist-500)]">
          Get access to your support tickets, appointments, and documents.
        </p>
      </Reveal>

      <Reveal
        as="form"
        index={1}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 sm:p-8 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="First name">
            <TextInput value={form.first_name} onChange={(e) => set("first_name", e.target.value)} placeholder="Jane" />
          </FormField>
          <FormField label="Last name">
            <TextInput value={form.last_name} onChange={(e) => set("last_name", e.target.value)} placeholder="Doe" />
          </FormField>
        </div>

        <FormField label="Company name">
          <TextInput value={form.company_name} onChange={(e) => set("company_name", e.target.value)} placeholder="Acme LLC" />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Email">
            <TextInput
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </FormField>
          <FormField label="Phone">
            <PhoneInput
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+374 XX XXX XXX"
              autoComplete="tel"
            />
          </FormField>
        </div>

        <FormField label="Username">
          <TextInput
            value={form.username}
            onChange={(e) => set("username", e.target.value)}
            placeholder="yourusername"
            autoComplete="username"
            required
          />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Password">
            <TextInput
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
            />
          </FormField>
          <FormField label="Confirm password">
            <TextInput
              type="password"
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </FormField>
        </div>

        {error && <p className="text-sm text-[var(--color-status-crit)]">{error}</p>}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full"
          icon={submitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        >
          {submitting ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-[var(--color-mist-500)]">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
            Sign in
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
