import PushNotification from "@/components/notification/PushNotification";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ActivitiesAndEventsSection,
  HeroSection,
  LatestPublicationsSection,
  OurSponsorsSection,
} from "@/sections/home";

import AboutSection from "@/sections/home/AboutSection";
import BentoSection from "@/sections/home/BentoSection";
import Introduction from "@/sections/home/Introduction";
import OurLeadersSection from "@/sections/home/OurLeadersSection";
import SignInSection from "@/sections/home/SignInSection";
import { Suspense } from "react";
const HomePage = () => {
  return (
    <main className="w-full">
      {/* Navbar */}
      <HeroSection />
      <OurSponsorsSection />
      <Introduction />
      <BentoSection />
      <section className="my-12 w-full bg-card/50 py-8">
        <div className="screen-wrapper">
          <h2 className="text-3xl font-bold mb-4 text-primary text-center max-sm:text-left ">
            Publications populaires
          </h2>
          <p className="text-center max-w-screen-lg mx-auto max-sm:text-left">
            Decouvrez nos articles populaires pour vous tenir informé des
            dernières tendances, évènements et ressources qui faconnent
            l&apos;écosystème technologique du Grand Nord Cameroun.
          </p>

          <Suspense
            fallback={
              <div className="my-6 justify-center content-center  px-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-20 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            }
          >
            <LatestPublicationsSection />
          </Suspense>
        </div>
      </section>
      <section className="my-12 screen-wrapper">
        <h2 className="text-3xl font-bold mb-4 text-primary text-center max-sm:text-left">
          Nos activités et événements
        </h2>

        <p className="text-center max-w-screen-md mx-auto max-sm:text-left">
          Découvrez nos différentes activités, conférences, formations, atéliers
          et d&apos;autres évènements que nous organisons.
        </p>
        <Suspense
          fallback={
            <div className="my-6 w-full justify-center items-center px-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <ActivitiesAndEventsSection isHome={true} limit={3} />
        </Suspense>
      </section>

      <OurLeadersSection />
      {/* <AboutUsSection /> */}
      <AboutSection />
      <SignInSection />
      {/* Footer */}
    </main>
  );
};

export default HomePage;
