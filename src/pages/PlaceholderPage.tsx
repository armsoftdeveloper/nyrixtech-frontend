import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { Seo } from "../components/seo/Seo";

export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-5 lg:px-8 py-24 text-center">
      <Seo title={title} description={description || "Page not available."} path={window.location.pathname} noindex />
      <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">NYRIXTECH</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">{title}</h1>
      <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
        {description || "This page is being built out. In the meantime, get a free assessment of your current IT infrastructure."}
      </p>
      <div className="mt-8 flex justify-center">
        <ButtonLink to="/it-audit" size="lg" icon={<ArrowRight size={18} />}>
          Get Free IT Audit
        </ButtonLink>
      </div>
    </Reveal>
  );
}
