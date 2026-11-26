import type { Job } from "@/types";

/**
 * Preserved exactly from the live Careers page: 6 roles, 42 total positions.
 * Titles, descriptions, vacancy counts, experience level and posting dates are unchanged.
 * The live page does not publish a required-skills list, so none is shown here.
 */
export const jobs: Job[] = [
  {
    id: "python-full-stack",
    title: "Associate IT Engineer – Python Full Stack Developer",
    department: "Core Engineering",
    description:
      "Build and maintain end-to-end web applications, scalable Python backend services, responsive frontend interfaces, and REST API integrations with robust database connectivity.",
    location: "Kurnool, AP",
    arrangement: "On-site",
    type: "Full-time",
    experience: "Fresher / Experienced",
    openings: 5,
    posted: "28 Oct 2026",
  },
  {
    id: "medical-coders",
    title: "Medical Coders",
    department: "Healthcare Operations",
    description:
      "We are looking for Medical Coders to join our team. Candidates should have knowledge of medical coding, good typing skills, and the ability to work accurately with medical documentation and coding standards.",
    location: "Kurnool, AP",
    arrangement: "On-site",
    type: "Full-time",
    experience: "Fresher / Experienced",
    openings: 20,
    posted: "28 Oct 2026",
  },
  {
    id: "kyc-mortgage",
    title: "KYC & Mortgage Data Entry Executive",
    department: "Operations & Compliance",
    description:
      "We are hiring freshers for KYC and Mortgage Data Entry projects in a Non-Voice / Back-Office Process. Responsible for verifying customer identity documents, updating records, and accurately processing mortgage and loan files.",
    location: "Kurnool, AP",
    arrangement: "On-site",
    type: "Full-time",
    experience: "Fresher",
    openings: 10,
    posted: "28 Oct 2026",
  },
  {
    id: "hr-executive",
    title: "HR Executive",
    department: "Human Resources",
    description:
      "We are looking for enthusiastic and motivated candidates to join our HR team and support end-to-end recruitment, interview coordination, employee onboarding, and daily HR operations.",
    location: "Kurnool, AP",
    arrangement: "On-site",
    type: "Full-time",
    experience: "Fresher / Experienced",
    openings: 2,
    posted: "28 Oct 2026",
  },
  {
    id: "software-testing",
    title: "Software Testing Engineer",
    department: "Quality Assurance",
    description:
      "Design comprehensive test plans, execute manual and automated functional, regression, and API tests, identify defect patterns, and guarantee bug-free software delivery.",
    location: "Kurnool, AP",
    arrangement: "On-site",
    type: "Full-time",
    experience: "Fresher / Experienced",
    openings: 2,
    posted: "18 Oct 2026",
  },
  {
    id: "business-development",
    title: "Business Development Executive (IT Sales & Marketing)",
    department: "Business Development",
    description:
      "Drive business growth, lead generation, and client acquisition across IT services, custom software, web, and mobile solutions. Responsible for digital marketing outreach, B2B sales cycles, client meetings, proposals, and deal closure.",
    location: "Kurnool, AP",
    arrangement: "On-site",
    type: "Full-time",
    experience: "Fresher / Experienced",
    openings: 3,
    posted: "28 Oct 2026",
  },
];

export const totalPositions = jobs.reduce((n, j) => n + j.openings, 0);

export const careersIntro = {
  headline: "Build world-class engineering from Kurnool.",
  text: "VPD Technologies is based in Kurnool, Andhra Pradesh. We empower our team to build exceptional software with measurable impact.",
  open: "Don't see your exact role? We're always glad to hear from developers, UI/UX designers and technical specialists in Kurnool or willing to work on-site.",
};
