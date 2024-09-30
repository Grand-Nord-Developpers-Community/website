import Line from "@/components/Line";
import {
  ActivitiesAndEventsSection,
  BannerToBecomeSponsor,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";
import OurLeadersSection from "@/sections/home/OurLeadersSection";

const HomePage = () => {
  return (
    <main className="w-full container">
      {/* Navbar */}
      {/* Hero */}
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
