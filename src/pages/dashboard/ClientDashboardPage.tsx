import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  Layers,
  LifeBuoy,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { Seo } from "../../components/seo/Seo";
import { useAuth } from "../../context/AuthContext";
import { fetchClientDashboard } from "../../services/dashboard";
import type { ClientDashboardData } from "../../types";

type ProfileData = Extract<ClientDashboardData, { has_profile: true }>;

const monitoringMeta: Record<ProfileData["monitoring_status"], { label: string; color: string; icon: ReactNode }> = {
  HEALTHY: { label: "Healthy", color: "var(--color-status-ok)", icon: <ShieldCheck size={16} /> },
  WARNING: { label: "Warning", color: "var(--color-status-warn)", icon: <ShieldAlert size={16} /> },
  CRITICAL: { label: "Critical", color: "var(--color-status-crit)", icon: <ShieldAlert size={16} /> },
  UNKNOWN: { label: "Unknown", color: "var(--color-mist-500)", icon: <ShieldQuestion size={16} /> },
};

const backupMeta: Record<ProfileData["backup_status"], { label: string; color: string }> = {
  OK: { label: "OK", color: "var(--color-status-ok)" },
  STALE: { label: "Stale", color: "var(--color-status-warn)" },
  FAILED: { label: "Failed", color: "var(--color-status-crit)" },
  UNKNOWN: { label: "Unknown", color: "var(--color-mist-500)" },
};

export default function ClientDashboardPage() {
  const { user, logout } = useAuth();
  const [data, setData] = useState<ProfileData | null>(null);
  const [noProfile, setNoProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchClientDashboard()
      .then((result) => {
        if (cancelled) return;
        if (result.has_profile) setData(result);
        else setNoProfile(true);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load your dashboard. Please try again later.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 lg:px-8 py-12">
      <Seo title="Client Dashboard" description="Your NYRIXTECH client dashboard." path="/dashboard" noindex />
      <Reveal as="div" className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Client Portal</p>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            Welcome back, {user?.first_name || user?.username}
          </h1>
        </div>
        <Button variant="secondary" onClick={logout}>
          Sign out
        </Button>
      </Reveal>

      {noProfile && (
        <Reveal className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-8 text-center">
          <p className="text-[var(--color-mist-100)] font-medium">Your account isn't linked to a company profile yet.</p>
          <p className="mt-2 text-sm text-[var(--color-mist-500)] max-w-md mx-auto">
            Contact your NYRIXTECH account manager to get your dashboard set up, or submit a free IT audit request
            to get started.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/it-audit"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-signal-400)] hover:text-[var(--color-mist-100)]"
            >
              Get Free IT Audit <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      )}

      {error && <p className="text-sm text-[var(--color-status-crit)]">{error}</p>}

      {data && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Reveal index={0}>
              <InfoCard
                title="Monitoring"
                value={monitoringMeta[data.monitoring_status].label}
                color={monitoringMeta[data.monitoring_status].color}
                icon={monitoringMeta[data.monitoring_status].icon}
              />
            </Reveal>
            <Reveal index={1}>
              <InfoCard
                title="Backup status"
                value={backupMeta[data.backup_status].label}
                color={backupMeta[data.backup_status].color}
                icon={<Layers size={16} />}
              />
            </Reveal>
            <Reveal index={2}>
              <InfoCard title="Open tickets" value={data.open_tickets} icon={<LifeBuoy size={16} />} />
            </Reveal>
            <Reveal index={3}>
              <InfoCard title="Upcoming appointments" value={data.upcoming_appointments} icon={<CalendarClock size={16} />} />
            </Reveal>
          </div>

          <Reveal index={4} className="rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-1">
              <Layers size={18} color="var(--color-signal-400)" />
              <h2 className="text-lg font-semibold text-[var(--color-mist-100)]">{data.company}</h2>
            </div>
            <p className="text-sm text-[var(--color-mist-500)]">
              {data.active_subscriptions} active subscription{data.active_subscriptions === 1 ? "" : "s"}
            </p>
          </Reveal>
        </>
      )}
    </section>
  );
}

function InfoCard({ title, value, icon, color }: { title: string; value: string | number; icon: ReactNode; color?: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-5">
      <div className="flex items-center gap-2 text-[var(--color-mist-500)] text-xs uppercase tracking-wide font-mono">
        {icon}
        {title}
      </div>
      <p className="mt-3 text-2xl font-display font-semibold" style={{ color: color || "var(--color-mist-100)" }}>
        {value}
      </p>
    </div>
  );
}
