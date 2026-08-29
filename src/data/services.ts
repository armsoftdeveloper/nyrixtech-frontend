export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceContent {
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  problemTitle: string;
  problemBody: string;
  solutionTitle: string;
  solutionBody: string;
  whatWeProvide: string[];
  capabilities: string[];
  technologies: string[];
  technologiesNote?: string;
  benefits: string[];
  disclaimer?: string;
  process: ProcessStep[];
  faq: ServiceFaq[];
}

export const services: ServiceContent[] = [
  {
    slug: "managed-it",
    name: "Managed IT",
    icon: "LifeBuoy",
    shortDescription: "A full outsourced IT department for businesses that don't want to build one in-house.",
    seoTitle: "Managed IT Services in Armenia",
    seoDescription:
      "Outsourced IT support for Armenian businesses — help desk, infrastructure management, user administration and IT consulting from one accountable partner.",
    heroHeadline: "Your business, one IT partner",
    heroSubheadline:
      "A full outsourced IT department — help desk, infrastructure management and strategic oversight — without the overhead of building an internal team.",
    problemTitle: "IT support that depends on one overloaded person",
    problemBody:
      "Most small and mid-sized businesses either have no IT support at all and call a contractor when something breaks, or have a single in-house employee stretched across everything from printer jams to firewall rules. There's no coverage when that person is on leave, no time left for proactive work, and no one checking whether the setup is even secure.",
    solutionTitle: "One accountable partner, not scattered contractors",
    solutionBody:
      "NYRIXTECH acts as your outsourced IT department — a single point of contact responsible for support, infrastructure and vendor coordination, so nothing falls through the cracks and nothing depends on one person's memory.",
    whatWeProvide: [
      "Remote IT support",
      "Infrastructure management",
      "Network administration",
      "Server administration",
      "User account management",
      "Monitoring",
      "Backup oversight",
      "Security management",
      "Documentation",
      "IT consulting",
    ],
    capabilities: [
      "24/7 remote help desk",
      "On-site support when remote isn't enough",
      "New employee onboarding and offboarding — accounts, hardware, access",
      "Hardware procurement and lifecycle management",
      "Vendor and ISP liaison",
      "Change management with proper documentation",
    ],
    technologies: ["Windows & macOS environments", "Microsoft 365 / Google Workspace", "Remote monitoring & management (RMM) tooling", "Ticketing & documentation systems"],
    benefits: [
      "Predictable monthly cost instead of unpredictable emergency call-outs",
      "One accountable partner instead of scattered contractors",
      "Faster resolution because we already know your environment",
      "Documented infrastructure that survives staff turnover",
    ],
    process: [
      { title: "Free IT Audit", description: "We review your current setup — network, servers, backup and security — at no cost." },
      { title: "Onboarding", description: "We document your infrastructure and set up monitoring, access and support channels." },
      { title: "Ongoing management", description: "Day-to-day support, maintenance and issue resolution for your whole team." },
      { title: "Monthly review", description: "A health report covering what happened, what's at risk, and what's next." },
    ],
    faq: [
      { q: "Do we need to let go of our current IT person?", a: "No — we frequently work alongside an internal employee, handling the workload they don't have time for." },
      { q: "What's included in the monthly fee?", a: "Scope is agreed during the audit and set out in your plan — typically help desk, monitoring, and a defined number of devices and users." },
      { q: "How fast do you respond?", a: "Response times depend on your plan's SLA. Business and Enterprise plans include priority response for critical issues." },
      { q: "Can you take over from our existing IT provider?", a: "Yes — we handle the transition and documentation as part of onboarding." },
    ],
  },
  {
    slug: "network-infrastructure",
    name: "Network Infrastructure",
    icon: "Network",
    shortDescription: "Design, deployment and management of the wired and wireless network your business runs on.",
    seoTitle: "Network Infrastructure Services in Armenia",
    seoDescription:
      "Business network design and management in Armenia — MikroTik and Cisco routing, VLAN segmentation, managed Wi-Fi, firewalls and VPN.",
    heroHeadline: "Networks that don't fall over during business hours",
    heroSubheadline: "Design, deployment and management of the wired and wireless network your business runs on.",
    problemTitle: "Networks nobody has looked at since they were installed",
    problemBody:
      "Wi-Fi dead zones, one flat network where a guest device can see the accounting server, VPNs set up once and never revisited, and no one who can explain why the internet \"just stopped working\" last Tuesday. Most small business networks grow by accident, not by design.",
    solutionTitle: "Enterprise standards, sized to your business",
    solutionBody:
      "We design and maintain network infrastructure with the same standards used in enterprise environments — segmented, documented, and monitored — scaled to fit a single office or multiple locations.",
    whatWeProvide: [
      "Network design & topology planning",
      "LAN/WAN setup",
      "VLAN segmentation",
      "Wi-Fi deployment & coverage planning",
      "Firewall configuration",
      "VPN — site-to-site and remote access",
      "Routing & switching",
      "Guest network isolation",
    ],
    capabilities: [
      "Multi-location network design",
      "Business-critical traffic isolated from guest and IoT traffic",
      "Structured cabling coordination",
      "Wireless site surveys and access point placement",
      "Bandwidth and traffic prioritization (QoS)",
    ],
    technologies: ["MikroTik", "Cisco", "Fortinet"],
    technologiesNote: "We work with these platforms and select hardware based on your requirements and budget — this is not an exclusive partnership with any single vendor.",
    benefits: [
      "Fewer outages and faster recovery when something does go wrong",
      "Guest and IoT devices isolated from business-critical systems",
      "A documented network you — or any future IT partner — can actually understand",
      "Wi-Fi that reaches every part of your building",
    ],
    process: [
      { title: "Site assessment", description: "We survey your current network, hardware and pain points." },
      { title: "Design", description: "We propose a topology, segmentation plan and hardware recommendations." },
      { title: "Deployment", description: "We implement the plan with minimal disruption, scheduled outside business hours where possible." },
      { title: "Monitoring & support", description: "Ongoing management, monitoring and support for the network we've built." },
    ],
    faq: [
      { q: "Can you work with our existing MikroTik, Cisco or Fortinet hardware?", a: "Yes — in most cases we can configure and manage your existing hardware rather than requiring a full replacement." },
      { q: "Will setting up VLANs disrupt our current network?", a: "We schedule changes to minimize disruption and test each segment before cutting traffic over." },
      { q: "Do you handle Wi-Fi for large or multi-floor spaces?", a: "Yes — we run a site survey to determine access point placement and coverage." },
      { q: "Can remote employees connect securely?", a: "Yes, we set up VPN access scoped to what each user actually needs." },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    icon: "ShieldCheck",
    shortDescription: "Layered, practical security controls built for how your business actually operates.",
    seoTitle: "Cybersecurity Services in Armenia",
    seoDescription:
      "Business cybersecurity in Armenia — firewall management, endpoint protection, access control, security monitoring and incident response readiness.",
    heroHeadline: "Security that matches your actual risk",
    heroSubheadline:
      "Practical, layered protection — firewalls, endpoint security, access control and monitoring — built for how your business actually operates.",
    problemTitle: "Security that stopped at the factory defaults",
    problemBody:
      "Default router passwords still in use, shared logins with no record of who has access to what, no firewall rules beyond what shipped out of the box, and no plan for what happens if a laptop is lost or an account is compromised. Most breaches don't involve sophisticated attacks — they involve basic gaps like these.",
    solutionTitle: "Layered controls, proportional to your risk",
    solutionBody:
      "We assess your actual exposure and implement layered security controls proportional to your risk — not a generic checklist, and not unnecessary complexity for a five-person office.",
    whatWeProvide: [
      "Firewall configuration & management",
      "Network segmentation",
      "VPN for remote access",
      "Access control & permission management",
      "Endpoint protection",
      "Security monitoring & alerting",
      "Backup strategy as part of security posture",
      "Password & access policy design",
      "Security assessments",
      "Incident response readiness",
    ],
    capabilities: [
      "Firewall rule design and review",
      "Role-based access control",
      "Endpoint protection deployment across workstations",
      "Log review and anomaly alerting",
      "Employee security awareness guidance",
      "Documented incident response plan",
    ],
    technologies: ["Enterprise-grade firewalls (Fortinet, MikroTik and similar)", "Endpoint protection platforms", "VPN", "Centralized log monitoring"],
    benefits: [
      "Reduced exposure to the most common attack vectors — phishing, weak access control, unpatched systems",
      "Faster detection when something looks wrong",
      "A documented plan instead of improvising during an incident",
      "Access limited to what each person actually needs",
    ],
    disclaimer:
      "No system is 100% immune to attack. Our goal is to reduce risk to a manageable level and make sure you can detect and respond quickly if something does happen.",
    process: [
      { title: "Security assessment", description: "We review your current exposure across network, endpoints and access control." },
      { title: "Remediation plan", description: "A prioritized list of fixes, starting with the highest-risk gaps." },
      { title: "Implementation", description: "Firewall configuration, access control and endpoint protection deployed." },
      { title: "Ongoing monitoring", description: "Alerting and periodic review to catch new risks as your business changes." },
    ],
    faq: [
      { q: "Can you guarantee we won't be hacked?", a: "No one can guarantee that. Our approach is to reduce risk substantially and make sure you can detect and respond fast if something happens." },
      { q: "We're a small business — do we really need this?", a: "Small businesses are frequently targeted precisely because attackers assume weaker defenses. The baseline controls we implement are proportional to your size, not enterprise overkill." },
      { q: "Do you provide security awareness training for staff?", a: "Yes, we provide practical guidance on phishing and access hygiene for your team." },
      { q: "What happens if we have a security incident?", a: "We follow a documented response process — containment, investigation and remediation — and can be engaged for incident response even outside a standing engagement." },
    ],
  },
  {
    slug: "servers",
    name: "Servers & Infrastructure",
    icon: "Server",
    shortDescription: "Deployment, administration and maintenance of Windows Server, Linux and virtualized infrastructure.",
    seoTitle: "Server Administration Services in Armenia",
    seoDescription:
      "Windows Server, Linux and virtualization administration for Armenian businesses — deployment, migration, patching and performance monitoring.",
    heroHeadline: "Servers that stay online and stay maintained",
    heroSubheadline: "Deployment, administration and maintenance of Windows Server, Linux and virtualized infrastructure.",
    problemTitle: "A server nobody has touched since it was installed",
    problemBody:
      "A server that hasn't been patched in over a year, no one quite sure what's actually running on it, a single point of failure with no redundancy plan, and performance issues nobody is watching for until users start complaining.",
    solutionTitle: "Documented, patched, and proactively monitored",
    solutionBody:
      "We deploy, migrate and maintain server infrastructure with proper documentation, patching schedules and proactive performance monitoring — whether it's a single on-premise box or a virtualized cluster.",
    whatWeProvide: [
      "Windows Server administration",
      "Linux administration",
      "Virtualization deployment & management",
      "Storage configuration",
      "Server deployment",
      "Server migration",
      "Performance monitoring",
      "Scheduled maintenance & patching",
      "High availability configuration where appropriate",
    ],
    capabilities: [
      "Server builds and OS deployment",
      "Migration from legacy or end-of-life hardware",
      "Virtualization platform setup and VM management",
      "Storage planning and configuration",
      "Patch management scheduling",
      "Resource utilization monitoring — CPU, RAM, disk",
    ],
    technologies: ["Windows Server", "Linux (major distributions)", "Virtualization platforms", "Storage systems appropriate to your workload"],
    benefits: [
      "Fewer unplanned outages from unpatched or overloaded systems",
      "A clear inventory of what's running and why",
      "Migration planning before hardware fails, not after",
      "Performance issues caught before users notice",
    ],
    process: [
      { title: "Infrastructure assessment", description: "We inventory your current servers, configurations and risks." },
      { title: "Planning", description: "A patching schedule and migration plan, if legacy hardware is a risk." },
      { title: "Implementation", description: "Deployment, migration or remediation carried out on a scheduled basis." },
      { title: "Ongoing administration", description: "Monitoring, patching and support for the environment we manage." },
    ],
    faq: [
      { q: "Can you take over management of our existing servers without downtime?", a: "In most cases yes — we start with an assessment and schedule any required changes around your operating hours." },
      { q: "Do you support both Windows and Linux?", a: "Yes, we administer both, including mixed environments." },
      { q: "What if our server hardware is old and failing?", a: "We'll flag end-of-life risk during the audit and propose a migration plan before it becomes an emergency." },
      { q: "Do you offer high availability setups?", a: "Where the business case justifies it, yes — we can design redundant configurations to minimize single points of failure." },
    ],
  },
  {
    slug: "backup",
    name: "Backup & Disaster Recovery",
    icon: "DatabaseBackup",
    shortDescription: "Automated backups, offsite replication, and disaster recovery plans that we actually test.",
    seoTitle: "Backup & Disaster Recovery Services in Armenia",
    seoDescription:
      "Automated backup, offsite replication and tested disaster recovery planning for Armenian businesses — because an untested backup isn't a backup.",
    heroHeadline: "A backup is only useful if recovery actually works",
    heroSubheadline: "Automated backups, offsite replication, and disaster recovery plans that we actually test.",
    problemTitle: "Backups nobody has verified since the day they were set up",
    problemBody:
      "Backups configured years ago that nobody has checked since, a single copy stored on the same site as the original — useless in a fire or theft — and no documented recovery process. The first time anyone finds out the backup doesn't work is usually during an actual emergency.",
    solutionTitle: "Automated, replicated, and tested on a schedule",
    solutionBody:
      "We implement automated backup strategies with offsite replication, and — critically — we test recovery on a schedule, so you know your backup works before you need it, not after.",
    whatWeProvide: [
      "Automated backup configuration",
      "Backup monitoring & alerting",
      "Offsite / cloud backup replication",
      "Disaster recovery planning",
      "Scheduled recovery testing",
      "Retention policy design",
    ],
    capabilities: [
      "Server, workstation and application-level backup configuration",
      "3-2-1 backup strategy design — multiple copies, multiple media, one offsite",
      "Recovery time objective (RTO) and recovery point objective (RPO) planning",
      "Documented, tested recovery procedures",
    ],
    technologies: ["Automated backup software appropriate to your environment", "Cloud and offsite storage targets"],
    benefits: [
      "Confidence that data loss from hardware failure, ransomware or human error is recoverable",
      "Backup failures caught by monitoring instead of discovered during a crisis",
      "A documented, rehearsed recovery process",
      "Retention policies that match compliance or business needs",
    ],
    process: [
      { title: "Assessment", description: "What needs backing up, how often it changes, and what recovery time you need." },
      { title: "Design", description: "Retention policy, RTO/RPO targets and offsite strategy." },
      { title: "Implementation", description: "Automated backup deployment across servers and critical workstations." },
      { title: "Ongoing", description: "Monitoring plus scheduled recovery tests to confirm backups are actually usable." },
    ],
    faq: [
      { q: "How do you know backups actually work?", a: "We schedule periodic recovery tests — restoring data to verify the backup is usable, not just \"completed.\"" },
      { q: "What's the difference between backup and disaster recovery?", a: "Backup is having a copy of your data. Disaster recovery is the documented plan and process for getting your business operational again after a major incident." },
      { q: "How often are backups taken?", a: "Frequency is set based on how critical and how often the data changes — typically daily, with more frequent options for critical systems." },
      { q: "Do you support offsite or cloud backup?", a: "Yes — we replicate backups offsite so a local incident like fire, theft or flood doesn't take out your only copy." },
    ],
  },
  {
    slug: "monitoring",
    name: "Infrastructure Monitoring",
    icon: "Activity",
    shortDescription: "24/7 monitoring of servers, network and services, with alerting before small issues become downtime.",
    seoTitle: "24/7 IT Infrastructure Monitoring in Armenia",
    seoDescription:
      "Zabbix-based infrastructure monitoring for Armenian businesses — server, network and backup monitoring with proactive alerting and monthly health reports.",
    heroHeadline: "Know about problems before your team does",
    heroSubheadline: "24/7 monitoring of servers, network and services, with alerting before small issues become downtime.",
    problemTitle: "The first alert is usually an employee complaining",
    problemBody:
      "The first sign of a problem is usually someone saying something is slow or down — by which point it's already affecting the business. No one is watching disk space until a server runs out, and no one tracks whether last night's backup job actually completed.",
    solutionTitle: "Alerting tuned to catch real problems",
    solutionBody:
      "We deploy infrastructure monitoring across your servers, network devices and critical services, with alerting tuned to flag real problems — so issues get caught and addressed before they turn into outages.",
    whatWeProvide: [
      "Infrastructure monitoring setup",
      "CPU / RAM / disk usage tracking",
      "Network device monitoring",
      "Server & service availability monitoring",
      "Hardware health monitoring",
      "Backup status monitoring",
      "Alerting configuration",
      "Monthly health reporting",
    ],
    capabilities: [
      "Monitoring deployment across servers, network gear and key services",
      "Threshold-based alerting tuned to avoid noise",
      "Historical trend tracking for capacity planning",
      "Uptime and availability reporting",
    ],
    technologies: ["Zabbix-based monitoring"],
    benefits: [
      "Problems caught before they cause downtime",
      "Capacity issues — disk filling up, resource exhaustion — flagged with lead time",
      "Objective uptime data instead of guesswork",
      "Backup failures caught the same day, not weeks later",
    ],
    process: [
      { title: "Scoping", description: "We identify what needs monitoring — servers, network, services." },
      { title: "Deployment", description: "Monitoring agents and checks are installed and configured." },
      { title: "Alert tuning", description: "Thresholds are calibrated to avoid alert fatigue and flag what actually matters." },
      { title: "Ongoing", description: "Monthly health reports and continuous adjustment as your infrastructure changes." },
    ],
    faq: [
      { q: "What exactly gets monitored?", a: "Typically server resource usage, service availability, network device status and backup completion — scoped to your infrastructure during onboarding." },
      { q: "Will we get spammed with alerts?", a: "No — we tune alert thresholds specifically to flag real issues, not routine fluctuations." },
      { q: "Can monitoring alert someone at 3am if a server goes down?", a: "Yes — for Business and Enterprise plans, critical alerts are routed for priority response regardless of time." },
      { q: "Do we get reports, or just alerts?", a: "Both — you receive a monthly health report summarizing uptime, capacity trends and any incidents." },
    ],
  },
  {
    slug: "cloud",
    name: "Cloud Infrastructure",
    icon: "Cloud",
    shortDescription: "Migration, management and support for Microsoft 365, Google Workspace, and cloud or hybrid infrastructure.",
    seoTitle: "Cloud Infrastructure Services in Armenia",
    seoDescription:
      "Cloud migration and administration for Armenian businesses — Microsoft 365, Google Workspace, virtual machines and hybrid infrastructure.",
    heroHeadline: "Cloud infrastructure that fits how you actually work",
    heroSubheadline: "Migration, management and support for Microsoft 365, Google Workspace, and cloud or hybrid infrastructure.",
    problemTitle: "A cloud plan that never got past the discussion stage",
    problemBody:
      "Email and files scattered across personal accounts and local drives with no central backup, a \"we should move to the cloud\" plan that never moved forward, or a rushed migration that left permissions and data structure a mess.",
    solutionTitle: "Migrations planned properly, then managed day to day",
    solutionBody:
      "We plan and execute cloud migrations properly — mapping what you actually need before moving anything — and manage the result day to day, whether that's Microsoft 365, Google Workspace, cloud servers, or a hybrid setup that keeps some infrastructure on-site.",
    whatWeProvide: [
      "Cloud infrastructure planning",
      "Cloud migration",
      "Microsoft 365 administration",
      "Google Workspace administration",
      "Virtual machine deployment & management",
      "Cloud storage configuration",
      "Cloud backup",
      "Hybrid infrastructure design",
      "Secure remote access",
    ],
    capabilities: [
      "Mailbox and file migration with minimal downtime",
      "License and cost optimization",
      "Identity and access management in the cloud",
      "Hybrid setups combining on-premise and cloud resources",
      "Cloud-based backup and disaster recovery",
    ],
    technologies: ["Microsoft 365", "Google Workspace", "Cloud virtual machine platforms"],
    technologiesNote:
      "We work across these platforms and recommend based on your requirements and budget. We do not claim official partnership status with any provider unless one is actually in place.",
    benefits: [
      "Centralized, backed-up email and files instead of scattered accounts",
      "Access from anywhere without compromising security",
      "Lower total cost through license and resource right-sizing",
      "A migration plan instead of a rushed weekend cutover",
    ],
    process: [
      { title: "Assessment", description: "Current setup, requirements, and the right target platform for your business." },
      { title: "Migration plan", description: "Sequencing and timeline designed to minimize disruption." },
      { title: "Migration & configuration", description: "Data, accounts and permissions moved and verified." },
      { title: "Ongoing management", description: "Administration, support and optimization after go-live." },
    ],
    faq: [
      { q: "Do you support both Microsoft 365 and Google Workspace?", a: "Yes, we administer both platforms and can advise on which fits your business." },
      { q: "Will we lose data during migration?", a: "Migrations are planned and tested with a verification step before old systems are decommissioned." },
      { q: "Can we keep some infrastructure on-site and move only part of it to the cloud?", a: "Yes — hybrid setups are common and often the right fit, especially for businesses with specific compliance or latency needs." },
      { q: "Do you manage day-to-day cloud administration after migration, or just the move?", a: "Both — ongoing administration such as user accounts, licensing and security settings is typically part of a Managed IT engagement." },
    ],
  },
  {
    slug: "automation",
    name: "IT Automation",
    icon: "Workflow",
    shortDescription: "Automation for repetitive IT tasks, deployment, monitoring and reporting — including AI-assisted workflows where they add real value.",
    seoTitle: "IT Automation Services in Armenia",
    seoDescription:
      "Infrastructure and IT process automation for Armenian businesses — deployment automation, reporting, API integrations and AI-assisted workflows.",
    heroHeadline: "Less manual work, fewer manual mistakes",
    heroSubheadline: "Automation for repetitive IT tasks, deployment, monitoring and reporting — including AI-assisted workflows where they add real value.",
    problemTitle: "The same manual steps, repeated every time",
    problemBody:
      "The same manual steps repeated for every new employee, every server deployment, every monthly report — each one a chance for something to be missed, and each one taking time that could go toward actual improvements.",
    solutionTitle: "Automating what's actually worth automating",
    solutionBody:
      "We identify repetitive, error-prone manual processes in your IT operations and automate them — from infrastructure provisioning to routine reporting — using proven tooling and, where it genuinely helps, AI-assisted automation.",
    whatWeProvide: [
      "IT process automation",
      "Infrastructure automation",
      "Deployment automation",
      "Monitoring automation",
      "Automated reporting",
      "Repetitive task elimination",
      "API integrations between systems",
      "AI-assisted automation for suitable business workflows",
    ],
    capabilities: [
      "Infrastructure-as-code for consistent, repeatable deployments",
      "Automated user provisioning and deprovisioning",
      "Scheduled and automated reporting",
      "Integration between existing business systems via APIs",
      "Identifying which processes are actually worth automating",
    ],
    technologies: ["Infrastructure-as-code tooling", "Scripting & automation platforms", "API integrations", "AI-assisted workflow tools where applicable"],
    benefits: [
      "Fewer manual errors from repetitive tasks",
      "Faster, consistent deployments and onboarding",
      "Time redirected from repetitive work to higher-value tasks",
      "Reporting that happens automatically instead of being chased down monthly",
    ],
    process: [
      { title: "Process review", description: "We identify high-friction, repetitive tasks across your IT operations." },
      { title: "Feasibility & prioritization", description: "We assess what's worth automating first, based on time saved and risk reduced." },
      { title: "Implementation", description: "We build and test the automation before rolling it into daily use." },
      { title: "Handover & monitoring", description: "Documentation and ongoing refinement as your processes evolve." },
    ],
    faq: [
      { q: "What kinds of tasks are worth automating?", a: "Anything repetitive, rule-based and done frequently — user provisioning, backup verification, reporting and routine deployments are common starting points." },
      { q: "Is this only for large businesses with complex IT?", a: "No — even a five-person office benefits from automating onboarding or reporting. We scope automation to what actually saves you time." },
      { q: "Do you use AI in these automations?", a: "Where it adds real value — for example, summarizing monitoring data or flagging anomalies — yes, but not as a buzzword. We're clear about what's actually automated versus AI-assisted." },
      { q: "Will automation replace our need for IT support?", a: "No — automation reduces manual repetitive work, it doesn't replace the judgment and support a managed IT engagement provides." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}
