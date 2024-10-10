import { Button } from "@/components/ui/button";
import { ActivitiesAndEventsSection } from "@/sections/home";
import Link from "next/link";

const page = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold capitalize !leading-snug sm:text-5xl">
            Nos activités, événements,
            <strong className="font-extrabold text-primary sm:block">
              conférences & atéliers.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Nous sommes une communauté active qui organise des ateliers, des
            évenements locaux en présentiel et à distance, des conférences, des
            formations et bien plus encore; pour les membres de la communauté et
            la population locale.
          </p>
          <div className="shadow-sm rounded-md my-3 shadow-primary px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="text-center font-medium sm:text-left">
              Notre prochaine activité: <br className="sm:hidden" />
              <span className="text-primary font-bold">The Night of Code</span>,
              le 17 Octobre 2024
            </p>

            <Link className="mt-4 block transition sm:mt-0" href={"#"}>
              <Button variant={"outline"} size={"lg"}>
                Réserver
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link className="mt-4 block transition sm:mt-0" href={"#explore"}>
              <Button variant={"default"} size={"lg"}>
                Explorez nos activités
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="-my-16" id="explore">
      <ActivitiesAndEventsSection
        limit={6}
        isHome={false}
      />
      </div>
    </section>
  );
}

export default page