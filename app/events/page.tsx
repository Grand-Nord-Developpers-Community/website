import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ActivitiesAndEventsSection } from "@/sections/home";
import Link from "next/link";
import HeadingPage from "@/sections/common/HeadingPage";
import { EmptyActivityAndEventPlaceholder } from "@/sections/home/ActivitiesAndEventsSection";
export const metadata: Metadata = {
  title: "GNDC | Nos évenements",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};

const page = () => {
  return (
    <section className="">
      <HeadingPage
        title="Nos activités, événements,"
        subtitle="conférences & atéliers."
        description=" Nous sommes une communauté active qui organise des ateliers, des
                évenements locaux en présentiel et à distance, des conférences,
                des formations et bien plus encore; pour les membres de la
                communauté et la population locale."
      >
        <Card className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white max-lg:w-[90%] lg:max-w-screen-lg">
          <CardContent className="flex gap-5 items-center justify-between py-4 max-sm:flex-col max-sm:gap-0 ">
            <p className="font-medium text-left text-lg max-sm:text-base">
              Notre prochaine activité :{" "}
              <span className="text-primary font-bold">Jabbama Code</span>, le
              14 Juillet 2025
            </p>

            <Link
              className="mt-4 block transition sm:mt-0 max-sm:w-full"
              href={"#"}
            >
              <Button variant={"outline"} className="max-sm:w-full" size={"lg"}>
                Réserver
              </Button>
            </Link>
          </CardContent>
        </Card>
      </HeadingPage>
      <div className="mt-24 mb-16 screen-wrapper max-sm:mt-24" id="explore">
        {/* <ActivitiesAndEventsSection limit={6} isHome={false} /> */}
        <EmptyActivityAndEventPlaceholder />
      </div>
    </section>
  );
};

export default page;
