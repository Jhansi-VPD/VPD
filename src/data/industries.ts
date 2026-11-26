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
    productSlugs: ["nexforge-automation", "nexasphere", "corefusion-technologies"],
  },
  {
    slug: "bfsi",
    name: "Banking, Financial Services & Insurance (BFSI)",
    short: "BFSI",
    blurb: "Digital tools for transactions, tracking and financial oversight.",
    image: "indBFSI",
    productSlugs: ["finbridge", "finovara-ca"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    short: "Healthcare",
    blurb: "Platforms that connect providers and patients and keep health data workflows organised.",
    image: "indHealth",
    productSlugs: ["medilink"],
  },
  {
    slug: "edtech",
    name: "Education & EdTech",
    short: "EdTech",
    blurb: "Systems for academic administration, records and attendance.",
    image: "indEdu",
    productSlugs: ["edunova-school"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-Commerce",
    short: "Retail",
    blurb: "Ordering, catalogue and delivery experiences for customers and stores.",
    image: "indRetail",
    productSlugs: ["clikgett"],
  },
  {
    slug: "professional-services",
    name: "Professional & Business Services",
    short: "Professional Services",
    blurb: "Workflow, compliance and analytics software for service organisations.",
    image: "indProfessional",
    productSlugs: ["amplivo", "finovara-ca", "sevanest"],
  },
  {
    slug: "agritech",
    name: "Agriculture & AgriTech",
    short: "AgriTech",
    blurb: "Software for farm-to-market workflows, mandi trade and inventory.",
    image: "indAgri",
    productSlugs: ["agriflow"],
  },
  {
    slug: "manufacturing-logistics",
    name: "Manufacturing & Logistics",
    short: "Manufacturing & Logistics",
    blurb: "Tools for procurement, field operations, freight and cargo tracking.",
    image: "indLogistics",
    productSlugs: ["nexacargo", "procuresphere-360", "fieldops-nexus"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
