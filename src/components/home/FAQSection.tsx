import { Reveal } from "../ui/Reveal";
import { FaqAccordion } from "../ui/FaqAccordion";

const faqs = [
  {
    q: "What happens during a free IT audit?",
    a: "We review your network, servers, backup and security setup remotely or on-site, then send you a clear report of risks and recommendations — no obligation to continue.",
  },
  {
    q: "Do you work with businesses that don't have an IT team?",
    a: "Yes — most of our clients don't have in-house IT. We act as your outsourced IT department, end to end.",
  },
  {
    q: "Can you take over from our current IT provider?",
    a: "Yes, we regularly onboard companies switching providers. We handle the transition and documentation.",
  },
  {
    q: "What industries do you support?",
    a: "Offices, retail, restaurants, hotels, clinics, manufacturing, logistics and professional services, typically with 5–200 employees.",
  },
  {
    q: "Is support available outside business hours?",
    a: "Business and Enterprise plans include 24/7 monitoring with priority response SLAs for critical issues.",
  },
];

export function FAQSection() {
  return (
    <section className="border-b border-[var(--color-line-800)] py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)] text-center">FAQ</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight text-center">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal index={1} className="mt-10">
          <FaqAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
