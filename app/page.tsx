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
    <main className="w-full">
      {/* Navbar */}
      <HeroSection />
      <OurSponsorsSection />
      <LatestPublicationsSection />
      <ActivitiesAndEventsSection isHome={true} limit={3} />
      <BannerToBecomeSponsor />
      <OurLeadersSection />
      {/* AboutUs  */}
      {/* Footer */}
    </main>
  );
};

export default HomePage;
