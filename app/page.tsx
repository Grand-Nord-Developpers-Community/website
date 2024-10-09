import {
  ActivitiesAndEventsSection,
  HeroSection,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";
import AboutUsSection from "@/sections/home/AboutUsSection";
import BannerToBecomeSponsor from "@/sections/home/BannerToBecomeSponsor";
import OurLeadersSection from "@/sections/home/OurLeadersSection";

const HomePage = () => {
  return (
    <main className="w-full">
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
