import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ActivitiesAndEventsSection } from "@/sections/home";
import Link from "next/link";
import HeadingPage from "@/sections/common/HeadingPage";
export const metadata: Metadata = {
  title: "GNDC | Events",
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
            <p className="font-medium text-left text-lg">
              Notre prochaine activité :{" "}
              <span className="text-primary font-bold">The Night of Code</span>,
              le 17 Octobre 2024
            </p>

            <Link className="mt-4 block transition sm:mt-0" ={"#"}>
              <Button variant={"outline"} size={"lg"}>
                Réserver
              </Button>
            </Link>
          </CardContent>
        </Card>
      </HeadingPage>
      <div className="my-16 screen-wrapper" id="explore">
        <ActivitiesAndEventsSection limit={6} isHome={false} />
      </div>
    </section>
  );
};

export default page;
