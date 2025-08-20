"use client";

import { ReportView } from "@/components/ReportView";
import { Redis } from "@upstash/redis";
import { useState } from "react";
import ActivityAndEvent from "@/interfaces/activityAndEvent";
import HeadSectionEvent from "@/app/events/[eventId]/(common)/headSectionEvent";
import EventContent from "@/app/events/[eventId]/(common)/EventContent";

const redis = Redis.fromEnv();

type Props = {
  activityOrEvent: ActivityAndEvent | null;
};

export default function EventPageDetails({ activityOrEvent }: Props) {
  const [views, setViews] = useState(0);

  if (!activityOrEvent) {
    return (
      <div className="screen-wrapper py-12">
        <h2 className="text-center text-xl font-bold">
          Évènement introuvable ❌
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ReportView id={activityOrEvent.id} type="event" />
      <HeadSectionEvent event={activityOrEvent} views={views} />
      <EventContent event={activityOrEvent} views={views} />
    </div>
  );
}
