import { FC } from "react";
import { useActivitiesAndEvents } from "@/hooks/activitiesAndEvents";
import { ActivityAndEventCard } from "@/components/cards";
import ActivityAndEvent from "@/interfaces/activityAndEvent";
import ActivityAndEventProps from "@/interfaces/activityAndEventsProps";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Button as ButtonX } from "@/components/ui/button-more";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import VoidImage from "@/assets/svgs/undraw_void_-3-ggu.svg";
const ActivitiesAndEventsSection: FC<ActivityAndEventProps> = ({
  isHome,
  limit,
}) => {
  const activitiesAndEvents = useActivitiesAndEvents({ limit: limit });

  const isEmpty = true;

  return (
    <section className="my-12 screen-wrapper">
      {isHome ? (
        <>
          <h2 className="text-3xl font-bold mb-4 text-primary text-center max-sm:text-left">
            Nos activités et événements
          </h2>

          <p className="text-center max-w-screen-md mx-auto max-sm:text-left">
            Découvrez nos différentes activités, conférences, formations,
            atéliers et d&apos;autres évènements que nous organisons.
          </p>
        </>
      ) : (
        <></>
      )}

      {isEmpty ? (
        <EmptyActivityAndEventPlaceholder />
      ) : (
        <>
          <ActivitiesAndEventsGrid activitiesAndEvents={activitiesAndEvents} />
          <p className="flex justify-center">
            <ButtonX
              asChild
              variant="expandIcon"
              className="bg-secondary hover:bg-secondary/90"
              Icon={<ArrowRightIcon className="size-4" />}
              iconPlacement="right"
            >
              <Link href="/events">Voir tous les évènemenets</Link>
            </ButtonX>
          </p>
        </>
      )}
    </section>
  );
};

export const EmptyActivityAndEventPlaceholder: FC = () => {
  return (
    <div className="flex flex-col h-[300px] justify-center items-center my-5">
      <VoidImage className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
      <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
        il y'a pas d'activité l&apos;instant !
      </h2>
    </div>
  );
};

const ActivitiesAndEventsGrid: FC<{
  activitiesAndEvents: ActivityAndEvent[];
}> = ({ activitiesAndEvents: activitiesAndEvents }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 pt-6 pb-8">
      {activitiesAndEvents.map((activityAndEvent, index) => {
        return (
          <ActivityAndEventCard
            activityAndEvent={activityAndEvent}
            key={index + activityAndEvent.title}
          />
        );
      })}
    </div>
  );
};

export default ActivitiesAndEventsSection;
