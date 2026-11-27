import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyIntroduction from "@/components/about/CompanyIntroduction";
import CompanyPhilosophy from "@/components/about/CompanyPhilosophy";
import CapabilitiesOverview from "@/components/about/CapabilitiesOverview";
import DeliveryApproach from "@/components/about/DeliveryApproach";
import ExperienceSection from "@/components/about/ExperienceSection";
import LeadershipSection from "@/components/about/LeadershipSection";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About VPD Technologies",
  description:
    "VPD Technologies is a software and digital engineering company in Kurnool, Andhra Pradesh, led by its founders and focused on reliable delivery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyIntroduction />
      <CompanyPhilosophy />
      <CapabilitiesOverview />
      <DeliveryApproach />
      <ExperienceSection />
      <LeadershipSection />
      <AboutCTA />
    </>
  );
}
