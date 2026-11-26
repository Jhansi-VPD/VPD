import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for VPD Technologies.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The basic terms that apply to working with VPD Technologies."
      liveUrl="https://www.vpdtechnologies.com/terms"
      sections={[
        { title: "Service deployment", body: "Technical deployments follow project-specific agreements. Uptime commitments for delivered digital assets are as defined in the applicable Service Level Agreement." },
        { title: "Intellectual property", body: "VPD retains the architecture, source code and design patterns of its own engine and platforms unless they are explicitly transferred under a separate acquisition contract." },
        { title: "Acceptable use", body: "Users must not attempt to breach security systems, extract data from project environments, or disrupt the integrity of VPD's network." },
        { title: "Termination", body: "Violating these terms may result in immediate termination of the agreement and loss of access to VPD's digital infrastructure." },
      ]}
    />
  );
}
