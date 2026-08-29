import { Seo } from "../components/seo/Seo";
import { Hero } from "../components/home/Hero";
import { ProblemSection } from "../components/home/ProblemSection";
import { SolutionSection } from "../components/home/SolutionSection";
import { HowItWorks } from "../components/home/HowItWorks";
import { TechVisualization } from "../components/home/TechVisualization";
import { CaseStudiesSection } from "../components/home/CaseStudiesSection";
import { PricingSection } from "../components/home/PricingSection";
import { FAQSection } from "../components/home/FAQSection";
import { FinalCTA } from "../components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Seo
        title="Managed IT & Cybersecurity for Armenian Businesses"
        description="NYRIXTECH manages your IT infrastructure — networking, servers, backup, monitoring and cybersecurity — so you can focus on your business. Get a free IT audit."
        path="/"
      />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <TechVisualization />
      <CaseStudiesSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
