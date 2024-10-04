import {
  ActivitiesAndEventsSection,
  HeroSection,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";
import BannerToBecomeSponsor from "@/sections/home/BannerToBecomeSponsor";
import OurLeadersSection from "@/sections/home/OurLeadersSection";

const HomePage = () => {
  return (
    <main className="w-full max-w-[1440px] px-4">
      {/* Navbar */}
      <HeroSection />
      <OurSponsorsSection />
      <LatestPublicationsSection />
      <ActivitiesAndEventsSection />
      <BannerToBecomeSponsor />
      <OurLeadersSection />
      {/* AboutUs  */}
      {/* Footer */}
    </main>
  );
};

export default HomePage;
