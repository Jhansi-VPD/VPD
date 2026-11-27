import { company } from "@/data/company";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { img } from "@/lib/images";

export const aboutHeroData = {
  eyebrow: "ABOUT VPD TECHNOLOGIES",
  headlineLines: ["Engineering Ideas.", "Building What's Next."],
  description:
    "VPD Technologies creates software products, business applications, and digital solutions that help businesses solve real challenges and grow.",
  image: img("heroMain", 2400, 82),
  imageAlt: "Precision circuit board and hardware engineering infrastructure",
  secondaryImage: img("svcCloud", 1400, 78),
  secondaryAlt: "Enterprise server infrastructure racks",
};

export const whoWeAreData = {
  eyebrow: "Who we are",
  heading: "More Than Technology.",
  intro:
    "VPD is a technology company focused on building software products and digital solutions around real business requirements.",
  regionalNote: `Headquartered in Kurnool, Andhra Pradesh, with presence across ${company.regionalOffices.join(", ")}.`,
  image: img("aboutHero", 2000, 80),
  imageAlt: "Contemporary architectural workspace with glass and natural daylight",
  detailImage: img("careersHero", 1400, 78),
  detailImageAlt: "Collaborative engineering floor interior",
  statements: [
    {
      title: "Understand First",
      text: "We begin by understanding the business challenge.",
    },
    {
      title: "Engineer Thoughtfully",
      text: "We select practical approaches to build reliable solutions.",
    },
    {
      title: "Own the Outcome",
      text: "We stay involved throughout the delivery journey.",
    },
  ],
};

export const philosophyData = {
  eyebrow: "Our philosophy",
  heading: "We Don't Just Build Software. We Take Ownership.",
  principles: [
    {
      num: "01",
      title: "Direct Founder Involvement",
      text: "Leadership stays connected to project decisions and delivery.",
      image: img("aboutHero", 2000, 75),
      alt: "Architectural studio environment",
    },
    {
      num: "02",
      title: "Engineering-Led Thinking",
      text: "Technical decisions are based on real requirements.",
      image: img("svcCustom", 2000, 75),
      alt: "Structured software architecture and engineering environment",
    },
    {
      num: "03",
      title: "Complete Project Ownership",
      text: "From planning and design to deployment.",
      image: img("svcCloud", 2000, 75),
      alt: "Cloud infrastructure and production server systems",
    },
    {
      num: "04",
      title: "Clear Communication",
      text: "Responsive collaboration throughout delivery.",
      image: img("aboutWork", 2000, 75),
      alt: "Engineering team working together",
    },
    {
      num: "05",
      title: "Flexible Engagement",
      text: "Approaches that adapt to project needs.",
      image: img("indBFSI", 2000, 75),
      alt: "Modern enterprise business environment",
    },
    {
      num: "06",
      title: "Business-Focused Solutions",
      text: "Technology built around practical business outcomes.",
      image: img("servicesHero", 2000, 75),
      alt: "Software product delivery workstation",
    },
  ],
};

export const capabilitiesData = {
  eyebrow: "What we bring together",
  heading: "Technology for Every Stage of Business Growth.",
  intro:
    "Seven engineering disciplines under one roof — shaped around real workflows, reliable infrastructure, and long-term maintainability.",
  items: services.map((s) => ({
    ...s,
    imageUrl: img(s.image as Parameters<typeof img>[0], 1600, 80),
  })),
};

export const deliveryData = {
  eyebrow: "How we work",
  heading: "From First Idea to Real-World Impact.",
  stages: [
    {
      num: "01",
      title: "Discover",
      text: "Understand requirements and business objectives.",
      image: img("svcEnterprise", 1800, 80),
      alt: "Requirements discovery and operational mapping",
    },
    {
      num: "02",
      title: "Plan",
      text: "Define scope, architecture, and execution.",
      image: img("svcCustom", 1800, 80),
      alt: "System architecture planning and technical blueprint",
    },
    {
      num: "03",
      title: "Design",
      text: "Create intuitive user experiences.",
      image: img("svcDesign", 1800, 80),
      alt: "Interactive product design and prototyping",
    },
    {
      num: "04",
      title: "Develop",
      text: "Build reliable software through quality engineering.",
      image: img("servicesHero", 1800, 80),
      alt: "Full-stack software development",
    },
    {
      num: "05",
      title: "Launch",
      text: "Test, deploy, and prepare for real-world use.",
      image: img("svcCloud", 1800, 80),
      alt: "Production cloud deployment and infrastructure",
    },
    {
      num: "06",
      title: "Support",
      text: "Maintain, improve, and scale solutions.",
      image: img("svcData", 1800, 80),
      alt: "Live monitoring, analytics and continuous improvement",
    },
  ],
};

const showcaseSlugs = [
  "agriflow",
  "clikgett",
  "gatesphere",
  "nexasphere",
  "nexacargo",
  "fieldops-nexus",
  "procuresphere-360",
];

export const experienceData = {
  eyebrow: "Our experience",
  heading: "Experience Built Through Execution.",
  metricValue: 55,
  metricSuffix: "+",
  metricLabel: "Completed Projects",
  metricNote: "VPD has completed more than 55 projects across web, enterprise, and custom software.",
  pillars: [
    "End-to-end project delivery",
    "Direct founder involvement",
    "Technical engineering capabilities",
    "Practical, business-focused solutions",
  ],
  projects: showcaseSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p)),
};

export const leadershipData = {
  eyebrow: "Leadership",
  heading: "Leadership That Stays Involved.",
  intro:
    "VPD is led directly by its founders, who remain close to architectural decisions, engineering quality, and client delivery.",
  leaders: company.leaders,
};

export const aboutCtaData = {
  eyebrow: "Next chapter",
  headline: "Have an Idea Worth Building?",
  description: "Let's explore how the right technology can help move your business forward.",
  ctaLabel: "Start a Conversation",
  ctaHref: "/contact",
  image: img("ctaBg", 2400, 80),
  imageAlt: "Connected global digital infrastructure horizon at night",
};
