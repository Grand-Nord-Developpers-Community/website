import { FC } from "react";
import { useActivitiesAndEvents } from "@/hooks/activitiesAndEvents";
import { ActivityAndEventCard } from "@/components/cards";
import ActivityAndEvent from "@/interfaces/activityAndEvent";
import ActivityAndEventProps from "@/interfaces/activityAndEventsProps";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ActivitiesAndEventsSection: FC<ActivityAndEventProps> = ({
  isHome,
  limit,
}) => {
  const activitiesAndEvents = useActivitiesAndEvents({ limit: limit });

  const isEmpty = activitiesAndEvents.length === 0;

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
            <Button asChild className="text-white">
              <Link href="/events">Voir tous les évènemenets &rsaquo;</Link>
            </Button>
          </p>
        </>
      )}
    </section>
  );
};

const EmptyActivityAndEventPlaceholder: FC = () => {
  return (
    <div className="grid h-[400px] bg-gray-100 rounded-lg justify-center items-center">
      Pas d&apos;activités ou d&apos;évènements pour l&apos;instant !
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
