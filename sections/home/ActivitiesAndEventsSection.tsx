import { FC } from "react";
import { ActivityAndEventCard } from "@/components/cards";
import ActivityAndEvent from "@/interfaces/activityAndEvent";
import ActivityAndEventProps from "@/interfaces/activityAndEventsProps";
import { Button as ButtonX } from "@/components/ui/button-more";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import VoidImage from "@/assets/svgs/undraw_void_-3-ggu.svg";
import { getEvents } from "@/actions/event.action";
const ActivitiesAndEventsSection: FC<ActivityAndEventProps> = async ({
  isHome,
  limit,
}) => {
  const events = await getEvents();

  // const normalizedEvents: ActivityAndEvent[] = events.map((e) => ({
  //   ...e,
  //   datetime:
  //     e.datetime instanceof Date ? e.datetime.toISOString() : e.datetime,
  //   createdAt:
  //     e.createdAt instanceof Date ? e.createdAt.toISOString() : e.createdAt,
  //   updatedAt:
  //     e.updatedAt instanceof Date ? e.updatedAt.toISOString() : e.updatedAt,
  //   creator: {
  //     ...e.creator,
  //     lastActive:
  //       e.creator.lastActive instanceof Date
  //         ? e.creator.lastActive.toISOString()
  //         : e.creator.lastActive,
  //     createdAt:
  //       e.creator.createdAt instanceof Date
  //         ? e.creator.createdAt.toISOString()
  //         : e.creator.createdAt,
  //     updatedAt:
  //       e.creator.updatedAt instanceof Date
  //         ? e.creator.updatedAt.toISOString()
  //         : e.creator.updatedAt,
  //   },
  // }));
  const isEmpty = true;
  // const isEmpty = normalizedEvents.length === 0;

  return (
    <>
      {isEmpty ? (
        <EmptyActivityAndEventPlaceholder />
      ) : (
        <>
          {/* <ActivitiesAndEventsGrid
            activitiesAndEvents={normalizedEvents}
            isHome={isHome}
          /> */}
          {isHome && (
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
          )}
        </>
      )}
    </>
  );
};

export const EmptyActivityAndEventPlaceholder: FC = () => {
  return (
    <div className="flex flex-col h-[300px] justify-center items-center my-5">
      <VoidImage className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
      <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
        il y&apos;a pas d&apos;activité l&apos;instant !
      </h2>
    </div>
  );
};

const ActivitiesAndEventsGrid: FC<{
  activitiesAndEvents: ActivityAndEvent[];
  isHome: boolean;
}> = ({
  activitiesAndEvents,
  isHome,
}: {
  activitiesAndEvents: ActivityAndEvent[];
  isHome: boolean;
}) => {
  activitiesAndEvents = isHome
    ? activitiesAndEvents.slice(0, 3)
    : activitiesAndEvents;
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
