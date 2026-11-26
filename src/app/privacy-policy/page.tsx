import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How VPD Technologies handles visitor information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How VPD Technologies handles the information you share with us."
      liveUrl="https://www.vpdtechnologies.com/privacy"
      sections={[
        { title: "Information we collect", body: "We collect your name and email address, along with your communication history from enquiries, to respond to you and improve our services." },
        { title: "How it is stored", body: "Data is kept in our cloud environment with multi-layer encryption and access controls. We do not share it with third parties without verified authorisation." },
        { title: "Cookies", body: "The site uses temporary cookies to maintain sessions and improve the interface. They are stored in your browser." },
        { title: "Confidentiality", body: "Proprietary client information shared during technical consultations is covered by a standard Non-Disclosure Agreement. For questions about this policy, use the contact email on our Contact page." },
      ]}
    />
  );
}
