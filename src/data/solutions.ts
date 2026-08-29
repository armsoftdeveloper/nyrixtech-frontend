export interface SolutionContent {
  slug: string;
  icon: string;
  name: string;
  forWho: string;
  description: string;
  includes: { name: string; slug: string }[];
  outcome: string;
}

export const solutions: SolutionContent[] = [
  {
    slug: "new-business-it",
    icon: "LifeBuoy",
    name: "New Business IT Setup",
    forWho: "For businesses setting up IT infrastructure for the first time, or formalizing an ad-hoc setup that grew without a plan.",
    description:
      "A structured starting point: network, workstations, email and file sharing, backup and basic security set up correctly from day one, instead of assembled piecemeal as problems come up.",
    includes: [
      { name: "Managed IT", slug: "managed-it" },
      { name: "Network Infrastructure", slug: "network-infrastructure" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Backup & Disaster Recovery", slug: "backup" },
    ],
    outcome: "A documented, properly segmented network with backup and baseline security in place before problems occur — not after.",
  },
  {
    slug: "switching-providers",
    icon: "Server",
    name: "Switching IT Providers",
    forWho: "For businesses unhappy with their current IT provider, or losing the one person who has always handled IT.",
    description:
      "We handle the transition: auditing what exists, documenting it properly, and taking over management without disrupting day-to-day operations.",
    includes: [
      { name: "Managed IT", slug: "managed-it" },
      { name: "Servers & Infrastructure", slug: "servers" },
      { name: "Infrastructure Monitoring", slug: "monitoring" },
    ],
    outcome: "A fully documented handover, continuity of support throughout the transition, and infrastructure that no longer depends on one departing person.",
  },
  {
    slug: "security-hardening",
    icon: "ShieldCheck",
    name: "Security Hardening",
    forWho: "For businesses concerned about their current security exposure, or that have never had a formal security review.",
    description:
      "A focused engagement to close the most common gaps — access control, firewall configuration, endpoint protection and backup — prioritized by actual risk, not a generic checklist.",
    includes: [
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Network Infrastructure", slug: "network-infrastructure" },
      { name: "Backup & Disaster Recovery", slug: "backup" },
      { name: "Infrastructure Monitoring", slug: "monitoring" },
    ],
    outcome: "Reduced exposure to the most common attack vectors, and a documented incident response plan instead of improvising if something happens.",
  },
  {
    slug: "cloud-modernization",
    icon: "Cloud",
    name: "Cloud Migration & Modernization",
    forWho: "For businesses moving off scattered local file storage and personal accounts, or consolidating multiple systems into one managed setup.",
    description:
      "A planned migration to Microsoft 365, Google Workspace, or cloud infrastructure — mapped to what you actually need before anything moves, then managed day to day after go-live.",
    includes: [
      { name: "Cloud Infrastructure", slug: "cloud" },
      { name: "IT Automation", slug: "automation" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Backup & Disaster Recovery", slug: "backup" },
    ],
    outcome: "Centralized, backed-up, access-controlled systems your team can reach securely from anywhere — migrated with a plan, not a rushed weekend cutover.",
  },
];
