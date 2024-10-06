import { FC } from "react";
import { useActivitiesAndEvents } from "@/hooks/activitiesAndEvents";
import { ActivityAndEventCard } from "@/components/cards";
import ActivityAndEvent from "@/interfaces/activityAndEvent";

const ActivitiesAndEventsSection: FC = () => {
  const activitiesAndEvents = useActivitiesAndEvents({ limit: 3 });

  const isEmpty = activitiesAndEvents.length === 0;

  return (
    <section className="my-12">
      <h2 className="text-3xl font-semibold mb-4 text-primary">
        Nos activités et événements
      </h2>

      <p>
        Découvrez dans cette section nos différentes activités, conférences,
        formations, atéliers et d&apos;autres évènements que nous organisons.
      </p>

      {isEmpty ? (
        <EmptyActivityAndEventPlaceholder />
      ) : (
        <ActivitiesAndEventsGrid activitiesAndEvents={activitiesAndEvents} />
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
