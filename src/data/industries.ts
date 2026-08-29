export interface IndustryContent {
  slug: string;
  name: string;
  icon: string;
  challenges: string[];
  howWeHelp: string;
  relevantServices: { name: string; slug: string }[];
}

export const industries: IndustryContent[] = [
  {
    slug: "retail",
    name: "Retail",
    icon: "Store",
    challenges: [
      "Multiple store locations with inconsistent, undocumented network setups",
      "Point-of-sale systems that can't afford downtime during business hours",
      "Guest Wi-Fi sharing the same network as payment and inventory systems",
      "Seasonal traffic spikes straining connectivity and support",
    ],
    howWeHelp:
      "We segment POS and inventory systems from guest Wi-Fi, standardize network configuration across locations, and monitor connectivity so an outage is caught before it hits the register.",
    relevantServices: [
      { name: "Network Infrastructure", slug: "network-infrastructure" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Infrastructure Monitoring", slug: "monitoring" },
      { name: "Backup & Disaster Recovery", slug: "backup" },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: "UtensilsCrossed",
    challenges: [
      "POS and kitchen display systems that can't tolerate downtime during service",
      "Guest Wi-Fi expected by customers, ideally isolated from operational systems",
      "Multiple locations with inconsistent IT setups",
      "Reservation and ordering systems that need to stay online",
    ],
    howWeHelp:
      "We build a reliable, segmented network so guest Wi-Fi never touches POS or kitchen systems, with monitoring that catches issues before they affect service — and support scoped to your actual operating hours, not just 9 to 5.",
    relevantServices: [
      { name: "Network Infrastructure", slug: "network-infrastructure" },
      { name: "Managed IT", slug: "managed-it" },
      { name: "Infrastructure Monitoring", slug: "monitoring" },
      { name: "Cybersecurity", slug: "cybersecurity" },
    ],
  },
  {
    slug: "hotels",
    name: "Hotels",
    icon: "BedDouble",
    challenges: [
      "Guest Wi-Fi coverage across large properties with many access points",
      "Property management and booking systems that need to stay available",
      "Guest networks that should be isolated from staff and back-office systems",
      "A growing number of IoT devices and security cameras on the network",
    ],
    howWeHelp:
      "We run Wi-Fi site surveys and coverage planning across your property, segment guest, staff and IoT/camera traffic with VLANs, and monitor the systems your operations depend on.",
    relevantServices: [
      { name: "Network Infrastructure", slug: "network-infrastructure" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Infrastructure Monitoring", slug: "monitoring" },
      { name: "Cloud Infrastructure", slug: "cloud" },
    ],
  },
  {
    slug: "clinics",
    name: "Clinics",
    icon: "Stethoscope",
    challenges: [
      "Patient and billing records requiring careful access control and reliable backup",
      "Systems that must stay available throughout patient hours",
      "Sensitive data handled by staff with varying technical backgrounds",
      "Legacy medical software with specific compatibility requirements",
    ],
    howWeHelp:
      "We implement role-based access control, tested backup and disaster recovery for patient records, endpoint protection across reception and clinical workstations, and infrastructure that's documented rather than dependent on one person.",
    relevantServices: [
      { name: "Backup & Disaster Recovery", slug: "backup" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Managed IT", slug: "managed-it" },
      { name: "Servers & Infrastructure", slug: "servers" },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "Factory",
    challenges: [
      "Office IT and production equipment often sharing one unsegmented network",
      "Legacy equipment with specific connectivity requirements",
      "A single network issue potentially halting production",
      "Growing reliance on connected equipment and monitoring systems",
    ],
    howWeHelp:
      "We segment office IT from production systems so a compromised workstation can't reach the production line, deploy server and infrastructure monitoring, and document the network so it's no longer a black box.",
    relevantServices: [
      { name: "Network Infrastructure", slug: "network-infrastructure" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Servers & Infrastructure", slug: "servers" },
      { name: "Infrastructure Monitoring", slug: "monitoring" },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    icon: "Truck",
    challenges: [
      "Multiple warehouses or sites needing secure connectivity to each other and to headquarters",
      "Distributed and remote staff",
      "Inventory and tracking systems that require reliable uptime",
      "Field devices needing secure remote access",
    ],
    howWeHelp:
      "We connect your sites with site-to-site VPN, set up scoped remote-access VPN for distributed staff, and monitor infrastructure across every location from one place.",
    relevantServices: [
      { name: "Network Infrastructure", slug: "network-infrastructure" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Cloud Infrastructure", slug: "cloud" },
      { name: "Infrastructure Monitoring", slug: "monitoring" },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "Briefcase",
    challenges: [
      "Client data and confidentiality requirements",
      "A small team without capacity for dedicated internal IT",
      "Heavy reliance on email, file sharing and cloud collaboration tools",
      "Growing headcount outpacing informal IT arrangements",
    ],
    howWeHelp:
      "We provide Managed IT covering support, security and infrastructure as one predictable service, administer Microsoft 365 or Google Workspace, and put access control and backup in place to protect client data.",
    relevantServices: [
      { name: "Managed IT", slug: "managed-it" },
      { name: "Cloud Infrastructure", slug: "cloud" },
      { name: "Cybersecurity", slug: "cybersecurity" },
      { name: "Backup & Disaster Recovery", slug: "backup" },
    ],
  },
];
