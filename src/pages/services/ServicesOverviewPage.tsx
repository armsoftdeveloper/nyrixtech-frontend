import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Seo } from "../../components/seo/Seo";
import { ServiceIcon } from "../../components/services/ServiceIcon";
import { ButtonLink } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { services } from "../../data/services";

export default function ServicesOverviewPage() {
  return (
    <>
      <Seo
        title="IT Services for Armenian Businesses"
        description="Managed IT, network infrastructure, cybersecurity, servers, backup, monitoring, cloud and automation services for businesses in Armenia."
        path="/services"
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Services</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            Everything your business needs to run reliable, secure IT
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Eight core services, delivered individually or as one managed engagement. Every engagement starts with a
            free IT audit so we recommend only what your infrastructure actually needs.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} index={i}>
              <Link
                to={`/services/${service.slug}`}
                className="group block h-full rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-5 hover:border-[var(--color-signal-500)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200 flex flex-col"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-signal-500)]/10">
                  <ServiceIcon name={service.icon} size={18} color="var(--color-signal-400)" />
                </span>
                <h2 className="mt-4 text-sm font-semibold text-[var(--color-mist-100)]">{service.name}</h2>
                <p className="mt-1.5 text-sm text-[var(--color-mist-500)] leading-relaxed flex-1">{service.shortDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-mist-500)] group-hover:text-[var(--color-signal-400)]">
                  Learn more <ArrowUpRight size={12} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal index={services.length} className="mt-16 rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-950)] p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            Not sure which services you need?
          </h2>
          <p className="mt-3 text-[var(--color-mist-400)] max-w-xl mx-auto">
            A free IT audit reviews your current infrastructure and tells you exactly what's at risk and what to
            prioritize — no obligation to continue.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
