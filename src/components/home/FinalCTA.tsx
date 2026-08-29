import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function FinalCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint bg-blueprint-fade opacity-60" />
      <Reveal as="div" className="relative mx-auto max-w-3xl px-5 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
          Know what's wrong with your IT before it becomes a business problem.
        </h2>
        <p className="mt-4 text-[var(--color-mist-400)]">
          A free audit takes under a week and comes with zero obligation.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
            Get Free IT Audit
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
