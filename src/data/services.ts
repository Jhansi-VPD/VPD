import type { Service, ProcessStep } from "@/types";

/**
 * The seven service lines come from the live VPD site. Capability bullets are limited to
 * what the site itself states about each service; nothing extra has been invented.
 */
export const services: Service[] = [
  {
    slug: "enterprise-software",
    title: "Enterprise Solutions",
    kicker: "ERP · CRM · HRMS",
    summary: "ERP, CRM and HRMS engines that put operations under one roof.",
    detail:
      "Enterprise systems that bring your core operations together, so teams work from one source of truth instead of scattered tools.",
    capabilities: ["ERP systems", "CRM systems", "HRMS platforms", "Centralised operational control"],
    image: "svcEnterprise",
  },
  {
    slug: "custom-software",
    title: "Custom Software Engineering",
    kicker: "Built around your workflow",
    summary: "Web applications and business platforms shaped around the way you work.",
    detail:
      "When off-the-shelf tools don't fit, we build software around your own processes, integrations and requirements.",
    capabilities: ["Web applications", "Business platforms", "Workflow-specific software", "System integrations"],
    image: "svcCustom",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Application Development",
    kicker: "iOS · Android",
    summary: "Native and cross-platform apps for iOS and Android.",
    detail: "Mobile apps that put your product in your customers' and teams' pockets, on the platforms they already use.",
    capabilities: ["Native apps", "Cross-platform apps", "iOS", "Android"],
    image: "svcMobile",
  },
  {
    slug: "data-engineering",
    title: "Data Engineering & Analytics",
    kicker: "Pipelines · Insight",
    summary: "Reliable ETL pipelines that bring enterprise data together and clean it up.",
    detail: "Turn scattered data into something your business can trust and use for decisions.",
    capabilities: ["ETL pipelines", "Data integration", "Data cleaning", "Business intelligence"],
    image: "svcData",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    kicker: "Infrastructure · Automation",
    summary: "Cloud infrastructure and deployment automation that keeps releases smooth.",
    detail: "Dependable environments and automated pipelines, so launching and updating software is routine.",
    capabilities: ["Cloud infrastructure", "Deployment automation", "Deployment pipelines"],
    image: "svcCloud",
  },
  {
    slug: "ai-ml",
    title: "AI & Intelligent Automation",
    kicker: "Practical AI",
    summary: "AI integration and machine learning models that work in production.",
    detail: "Practical AI added to your products and workflows, from intelligent automation to AI-powered features.",
    capabilities: ["AI integration", "Machine learning models", "Intelligent automation", "AI-powered features"],
    image: "svcAI",
  },
  {
    slug: "ui-ux-engineering",
    title: "UI/UX & Product Engineering",
    kicker: "Design · Prototype · Build",
    summary: "Product design and interactive prototypes that prove user flows early.",
    detail: "Usable digital experiences, designed and validated before the full build begins.",
    capabilities: ["Product design", "Interactive prototypes", "User-flow validation"],
    image: "svcDesign",
  },
];

export const whatWeDo = [
  {
    title: "Web Experiences",
    text: "Responsive, accessible websites that give visitors a clear path and support your business goals.",
    image: "whatWeb",
  },
  {
    title: "Business Applications",
    text: "Purpose-built web applications that connect your people, data and workflows.",
    image: "whatApps",
  },
  {
    title: "Full-Stack Systems",
    text: "Frontend, backend, APIs and databases engineered together for reliable products.",
    image: "whatStack",
  },
  {
    title: "Custom Software",
    text: "Software tailored to your operations, integrations and business processes.",
    image: "whatCustom",
  },
  {
    title: "AI Integration",
    text: "Practical AI added to products and workflows, including intelligent automation.",
    image: "whatAI",
  },
] as const;

export const process: ProcessStep[] = [
  {
    title: "Requirement Discovery",
    short: "Understand the problem first.",
    detail:
      "We clarify goals, system requirements, integrations, compliance needs and success criteria before writing any code.",
  },
  {
    title: "Planning & Architecture",
    short: "Map the system before building it.",
    detail: "Business goals, workflows and system architecture are defined up front, so the build has a clear direction.",
  },
  {
    title: "UI/UX Design",
    short: "Design flows people can follow.",
    detail: "Product design and interactive prototypes validate how people will use the product before development.",
  },
  {
    title: "Development",
    short: "Build in clear, steady steps.",
    detail: "Disciplined sprint execution turns the validated design into working software.",
  },
  {
    title: "Testing & Quality Assurance",
    short: "Check it works before it ships.",
    detail: "Every layout and flow is tested across devices and screen sizes before launch.",
  },
  {
    title: "Deployment & Launch",
    short: "Go live smoothly.",
    detail: "Your product moves from validated concept to production through a controlled release.",
  },
  {
    title: "Maintenance & Support",
    short: "Stay with you after launch.",
    detail: "Post-deployment support, performance tuning and feature iteration, so you never handle updates alone.",
  },
];
