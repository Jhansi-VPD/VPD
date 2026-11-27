import type { Industry } from "@/types";

/**
 * The eight industries come from the live site's navigation. The live site publishes no
 * industry descriptions, so the short text below is deliberately modest and describes the
 * kind of software relevant to each area. productSlugs link only to VPD products that
 * genuinely sit in that area. No industry experience is claimed beyond that.
 */
export const industries: Industry[] = [
  {
    slug: "it-software",
    name: "Information Technology & Software",
    short: "IT & Software",
    blurb: "Software, platforms and engineering partnerships for technology businesses and IT partners.",
    image: "indIT",
    gallery: [
      { src: "/images/industries/it-software-01.jpg", alt: "IT infrastructure server racks and optical network environment" },
      { src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=80", alt: "Software engineering environment and digital system architecture" },
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80", alt: "Interconnected silicon processor hardware and circuit pathways" },
    ],
    productSlugs: ["nexforge-automation", "nexasphere", "corefusion-technologies"],
  },
  {
    slug: "bfsi",
    name: "Banking, Financial Services & Insurance (BFSI)",
    short: "BFSI",
    blurb: "Digital tools for transactions, tracking and financial oversight.",
    image: "indBFSI",
    gallery: [
      { src: "/images/industries/bfsi-01.jpg", alt: "Contemporary financial district glass architecture at twilight" },
      { src: "/images/industries/bfsi-02.jpg", alt: "Digital financial analytics display showing transaction trends and data matrices" },
      { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80", alt: "Financial operations and digital transaction infrastructure" },
    ],
    productSlugs: ["finbridge", "finovara-ca"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    short: "Healthcare",
    blurb: "Platforms that connect providers and patients and keep health data workflows organised.",
    image: "indHealth",
    gallery: [
      { src: "/images/industries/healthcare-01.jpg", alt: "Modern clinical research and hospital interior with glass walls" },
      { src: "/images/industries/healthcare-02.jpg", alt: "Digital medical diagnostic imaging console and health data system" },
      { src: "/images/industries/healthcare-03.jpg", alt: "Precision biotechnology laboratory glassware and diagnostic optics" },
    ],
    productSlugs: ["medilink"],
  },
  {
    slug: "edtech",
    name: "Education & EdTech",
    short: "EdTech",
    blurb: "Systems for academic administration, records and attendance.",
    image: "indEdu",
    gallery: [
      { src: "/images/industries/edtech-01.jpg", alt: "Modern architectural university lecture theater with warm timber acoustics" },
      { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80", alt: "Educational study environment and academic learning setup" },
      { src: "/images/products/11._Aurexion_Technologies_3cd2500c.png", alt: "Smart campus atrium with glass walkways and contemporary architecture" },
    ],
    productSlugs: ["edunova-school"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-Commerce",
    short: "Retail",
    blurb: "Ordering, catalogue and delivery experiences for customers and stores.",
    image: "indRetail",
    gallery: [
      { src: "/images/industries/retail-ecommerce-01.jpg", alt: "Minimalist flagship retail interior with architectural spotlighting" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80", alt: "Digital point-of-sale payment and retail checkout experience" },
      { src: "/images/products/08._clikgett_de899caa.png", alt: "Mobile quick-commerce ordering and retail store catalogue interface" },
    ],
    productSlugs: ["clikgett"],
  },
  {
    slug: "professional-services",
    name: "Professional & Business Services",
    short: "Professional Services",
    blurb: "Workflow, compliance and analytics software for service organisations.",
    image: "indProfessional",
    gallery: [
      { src: "/images/industries/professional-services-01.jpg", alt: "Architectural executive boardroom overlooking dusk skyline" },
      { src: "/images/industries/professional-services-02.jpg", alt: "Multi-screen operational workflow and analytics display suite" },
      { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80", alt: "Contemporary architectural corporate workspace in natural daylight" },
    ],
    productSlugs: ["amplivo", "finovara-ca", "sevanest"],
  },
  {
    slug: "agritech",
    name: "Agriculture & AgriTech",
    short: "AgriTech",
    blurb: "Software for farm-to-market workflows, mandi trade and inventory.",
    image: "indAgri",
    gallery: [
      { src: "/images/industries/agritech-01.jpg", alt: "Agricultural drone surveying irrigated green crop rows at sunrise" },
      { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80", alt: "Cultivated agricultural farmland at sunrise" },
      { src: "/images/products/05._AgriFlow_5a21ad55.png", alt: "Solar-powered IoT field sensors across irrigated green crop rows" },
    ],
    productSlugs: ["agriflow"],
  },
  {
    slug: "manufacturing-logistics",
    name: "Manufacturing & Logistics",
    short: "Manufacturing & Logistics",
    blurb: "Tools for procurement, field operations, freight and cargo tracking.",
    image: "indLogistics",
    gallery: [
      { src: "/images/industries/manufacturing-logistics-01.jpg", alt: "Automated high-bay distribution warehouse with autonomous forklifts" },
      { src: "/images/industries/manufacturing-logistics-02.jpg", alt: "Precision robotic assembly line in a modern manufacturing facility" },
      { src: "/images/products/13._Nexacargo_f1d07bcc.png", alt: "Illuminated intermodal container port and freight rail terminal at dusk" },
    ],
    productSlugs: ["nexacargo", "procuresphere-360", "fieldops-nexus"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
