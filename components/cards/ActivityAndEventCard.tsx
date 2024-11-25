import { FC } from "react";
import Link from "next/link";
import { CalendarClock, CalendarDays } from "lucide-react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button-more";

import ActivityAndEvent from "@/interfaces/activityAndEvent";

type ActvityAndEventCardProps = {
  activityAndEvent: Omit<ActivityAndEvent, "created_at">;
};

type IconForTypeProps = Pick<ActivityAndEvent, "type">;

const IconForType: FC<IconForTypeProps> = ({ type }) => {
  const commonProps = { strokeWidth: 2, className: "h-auto w-full" };

  switch (type) {
    case "activity":
      return <CalendarClock {...commonProps} />;

    case "event":
    default:
      return <CalendarDays {...commonProps} />;
  }
};

const ActivityAndEventCard: FC<ActvityAndEventCardProps> = ({
  activityAndEvent: { title, summary, type },
}) => {
  return (
    <Card className="p-4 flex gap-3 max-sm:p-2">
      <div className="flex flex-col justify-start pt-3 items-center">
        <figure className="rounded-md p-2 text-primary border border-secondary flex size-8">
          <IconForType type={type} />
        </figure>
        <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none mt-5  ">
          <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
            Jul
          </span>
          <span className="font-medium text-lg text-gray-800 title-font leading-none">
            18
          </span>
        </div>
      </div>
      <div>
        <CardHeader className="p-0 py-3 ">
          <CardTitle>
            <Link href={"/events/1"} className="hover:underline text-secondary">
              {title}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 line-clamp-5">
          <CardDescription>{summary}</CardDescription>
        </CardContent>

        <CardFooter className="p-0 justify-between items-center">
          <Button asChild variant="link" className="p-0 text-primary">
            <Link href="/events/this">En apprendre plus</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ActivityAndEventCard;
