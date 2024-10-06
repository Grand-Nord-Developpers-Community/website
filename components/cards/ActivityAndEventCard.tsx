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
import { Button } from "../ui/button";

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
    <Card className="p-4">
      <figure className="rounded-md p-2 text-primary border border-primary flex w-16 h-16">
        <IconForType type={type} />
      </figure>

      <CardHeader className="p-0 py-3">
        <CardTitle>
          <Link href={""} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 line-clamp-3">
        <CardDescription>{summary}</CardDescription>
      </CardContent>

      <CardFooter className="p-0 justify-between items-center">
        <Button asChild variant="link" className="p-0">
          <Link href={""}>En apprendre plus</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityAndEventCard;
