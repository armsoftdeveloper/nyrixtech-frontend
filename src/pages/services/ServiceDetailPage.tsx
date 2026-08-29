import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Seo } from "../../components/seo/Seo";
import { ServiceIcon } from "../../components/services/ServiceIcon";
import { ButtonLink } from "../../components/ui/Button";
import { FaqAccordion } from "../../components/ui/FaqAccordion";
import { Reveal } from "../../components/ui/Reveal";
import { getServiceBySlug, services } from "../../data/services";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Seo title={service.seoTitle} description={service.seoDescription} path={`/services/${service.slug}`} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-line-800)]">
        <div className="absolute inset-0 bg-blueprint bg-blueprint-fade" />
        <motion.div
          key={service.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl px-5 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-mist-500)] hover:text-[var(--color-mist-100)] transition-colors"
          >
            <ArrowLeft size={14} /> All services
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-signal-500)]/10">
              <ServiceIcon name={service.icon} size={20} color="var(--color-signal-500)" />
            </span>
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">{service.name}</p>
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-mist-100)] max-w-3xl">
            {service.heroHeadline}
          </h1>
          <p className="mt-5 text-lg text-[var(--color-mist-400)] max-w-2xl leading-relaxed">{service.heroSubheadline}</p>

          <div className="mt-8">
            <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {/* Problem / Solution */}
        <section className="py-14 grid md:grid-cols-2 gap-8 border-b border-[var(--color-line-800)]">
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-status-crit)]">The problem</p>
            <h2 className="mt-3 text-xl font-bold text-[var(--color-mist-100)]">{service.problemTitle}</h2>
            <p className="mt-3 text-[var(--color-mist-400)] leading-relaxed">{service.problemBody}</p>
          </Reveal>
          <Reveal index={1}>
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Our approach</p>
            <h2 className="mt-3 text-xl font-bold text-[var(--color-mist-100)]">{service.solutionTitle}</h2>
            <p className="mt-3 text-[var(--color-mist-400)] leading-relaxed">{service.solutionBody}</p>
          </Reveal>
        </section>

        {/* What we provide */}
        <section className="py-14 border-b border-[var(--color-line-800)]">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
              What we provide
            </h2>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {service.whatWeProvide.map((item, i) => (
              <Reveal key={item} index={i} className="flex items-start gap-2.5 text-sm text-[var(--color-mist-300)]">
                <Check size={16} className="mt-0.5 shrink-0" color="var(--color-signal-500)" />
                {item}
              </Reveal>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-14 border-b border-[var(--color-line-800)]">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
              Key capabilities
            </h2>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {service.capabilities.map((item, i) => (
              <Reveal key={item} index={i}>
                <div className="rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] px-5 py-4 text-sm text-[var(--color-mist-300)] leading-relaxed">
                  {item}
                </div>
              </Reveal>
            ))}
          </div>

          {service.technologies.length > 0 && (
            <Reveal index={service.capabilities.length} className="mt-8">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-mist-500)]">Technologies we work with</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--color-line-800)] bg-[var(--color-ink-800)] px-3 py-1.5 text-xs font-medium text-[var(--color-mist-300)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {service.technologiesNote && (
                <p className="mt-3 text-xs text-[var(--color-mist-600)] max-w-2xl leading-relaxed">{service.technologiesNote}</p>
              )}
            </Reveal>
          )}
        </section>

        {/* Benefits */}
        <section className="py-14 border-b border-[var(--color-line-800)]">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
              Business benefits
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {service.benefits.map((item, i) => (
              <Reveal key={item} index={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[var(--color-mist-200)]">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" color="var(--color-status-ok)" />
                {item}
              </Reveal>
            ))}
          </div>

          {service.disclaimer && (
            <Reveal index={service.benefits.length} className="mt-8">
              <div className="flex items-start gap-3 rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] px-5 py-4">
                <Info size={16} className="mt-0.5 shrink-0" color="var(--color-mist-500)" />
                <p className="text-sm text-[var(--color-mist-500)] leading-relaxed">{service.disclaimer}</p>
              </div>
            </Reveal>
          )}
        </section>

        {/* Process */}
        <section className="py-14 border-b border-[var(--color-line-800)]">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
              How the engagement works
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, i) => (
              <Reveal key={step.title} index={i} className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-signal-500)]/10">
                  <span className="font-display text-xl font-black text-[var(--color-signal-500)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-[var(--color-mist-100)]">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-mist-500)] leading-relaxed">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 border-b border-[var(--color-line-800)]">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal index={1} className="mt-8">
            <FaqAccordion items={service.faq} />
          </Reveal>
        </section>

        {/* Related services */}
        {otherServices.length > 0 && (
          <section className="py-14 border-b border-[var(--color-line-800)]">
            <Reveal>
              <h2 className="text-lg font-semibold text-[var(--color-mist-100)]">Related services</h2>
            </Reveal>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {otherServices.map((s, i) => (
                <Reveal key={s.slug} index={i}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group block rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-5 hover:border-[var(--color-signal-500)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-signal-500)]/10">
                      <ServiceIcon name={s.icon} size={16} color="var(--color-signal-400)" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-[var(--color-mist-100)]">{s.name}</h3>
                    <p className="mt-1 text-xs text-[var(--color-mist-500)] leading-relaxed">{s.shortDescription}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <Reveal as="section" className="py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[var(--color-mist-100)] tracking-tight">
            Ready to see where you stand?
          </h2>
          <p className="mt-3 text-[var(--color-mist-400)] max-w-lg mx-auto">
            A free IT audit takes under a week and comes with zero obligation.
          </p>
          <div className="mt-7 flex justify-center">
            <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
