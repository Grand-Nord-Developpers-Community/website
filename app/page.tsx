import {
  ActivitiesAndEventsSection,
  HeroSection,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";

const HomePage = () => {
  return (
    <main className="w-full">
      {/* Navbar */}
      <HeroSection />
      <OurSponsorsSection />
      <LatestPublicationsSection />
      <ActivitiesAndEventsSection />
      {/* BannerToBecomeSponsor  */}
      {/* OurLeaders  */}
      {/* AboutUs  */}
      {/* Footer */}
    </main>
  );
};

export default HomePage;
