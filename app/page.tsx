import {
  ActivitiesAndEventsSection,
  HeroSection,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";
import AboutSection from "@/sections/home/AboutSection";
import AboutUsSection from "@/sections/home/AboutUsSection";
import BannerToBecomeSponsor from "@/sections/home/BannerToBecomeSponsor";
import BentoSection from "@/sections/home/BentoSection";
import Introduction from "@/sections/home/Introduction";
import OurLeadersSection from "@/sections/home/OurLeadersSection";
import SignInSection from "@/sections/home/SignInSection";

const HomePage = () => {
  return (
    <main className="w-full">
      {/* Navbar */}
      <HeroSection />
      <OurSponsorsSection />
      <Introduction />
      <BentoSection />
      <LatestPublicationsSection />
      <ActivitiesAndEventsSection isHome={true} limit={3} />
      <OurLeadersSection />
      {/* <AboutUsSection /> */}
      <AboutSection />
      <SignInSection />
      {/* Footer */}
    </main>
  );
};

export default HomePage;
