import HomeHero from "@/components/home/HomeHero";
import HomeIntroSection from "@/components/home/HomeIntroSection";
import HomeCapabilitiesSection from "@/components/home/HomeCapabilitiesSection";
import HomeDeliverySection from "@/components/home/HomeDeliverySection";
import HomeWhyVPDSection from "@/components/home/HomeWhyVPDSection";
import HomeExperienceSection from "@/components/home/HomeExperienceSection";
import HomeIndustriesSection from "@/components/home/HomeIndustriesSection";
import HomeLeadershipSection from "@/components/home/HomeLeadershipSection";
import HomeCTASection from "@/components/home/HomeCTASection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntroSection />
      <HomeCapabilitiesSection />
      <HomeDeliverySection />
      <HomeWhyVPDSection />
      <HomeExperienceSection />
      <HomeIndustriesSection />
      <HomeLeadershipSection />
      <HomeCTASection />
    </>
  );
}
