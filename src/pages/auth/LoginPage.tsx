import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { FormField, TextInput } from "../../components/audit/AuditFormControls";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";
import { Seo } from "../../components/seo/Seo";

export default function LoginPage() {
  const { login, user } = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = (location.state as { from?: Location })?.from?.pathname || "/dashboard";

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ username, password });
    } catch (err) {
      setError(extractErrorMessage(err, "Invalid username or password."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-5 py-20">
      <Seo title="Client Login" description="Sign in to your NYRIXTECH client portal." path="/login" noindex />
      <Reveal className="text-center mb-8">
        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Client Portal</p>
        <h1 className="mt-3 font-display text-3xl font-black text-[var(--color-mist-100)] tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--color-mist-500)]">Access your dashboard, tickets, and documents.</p>
      </Reveal>

      <Reveal
        as="form"
        index={1}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 sm:p-8 space-y-5"
      >
        <FormField label="Username">
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourusername"
            autoComplete="username"
            required
          />
        </FormField>
        <FormField label="Password">
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </FormField>

        {error && <p className="text-sm text-[var(--color-status-crit)]">{error}</p>}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full"
          icon={submitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-[var(--color-mist-500)]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]">
            Create one
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
