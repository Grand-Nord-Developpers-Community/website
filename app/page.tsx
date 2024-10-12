import {
  ActivitiesAndEventsSection,
  HeroSection,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";
import AboutUsSection from "@/sections/home/AboutUsSection";
import BannerToBecomeSponsor from "@/sections/home/BannerToBecomeSponsor";
import Introduction from "@/sections/home/Introduction";
import OurLeadersSection from "@/sections/home/OurLeadersSection";

const HomePage = () => {
  return (
    <main className="w-full">
      {/* Navbar */}
      <HeroSection />
      <OurSponsorsSection />
      <Introduction />
      <LatestPublicationsSection />
      <ActivitiesAndEventsSection isHome={true} limit={3} />
      <BannerToBecomeSponsor />
      <OurLeadersSection />
      <AboutUsSection />
      {/* Footer */}
    </main>
  );
};

export default HomePage;
