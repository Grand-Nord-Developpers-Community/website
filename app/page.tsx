import Line from "@/components/Line";
import {
  ActivitiesAndEventsSection,
  BannerToBecomeSponsor,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";

const HomePage = () => {
  return (
    <main className="w-full container">
      {/* Navbar */}
      {/* Hero */}
      <OurSponsorsSection />
      <LatestPublicationsSection />
      <ActivitiesAndEventsSection />
      <Line /> {/* This component is Used to divide some sections from others as metionned in the Figma Design */}
      <BannerToBecomeSponsor /> 
      {/* OurLeaders  */}
      {/* AboutUs  */}
      {/* Footer */}
    </main>
  );
};

export default HomePage;
