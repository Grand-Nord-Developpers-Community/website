import { getEvent } from "@/actions/event.action";
import EventPageDetails from "@/components/EventsPageDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);
  if (!event) return {};

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/events/${params.eventId}`;
  const description =
    event.description || `Détails de l'événement ${event.title}`;
  const ogImage = `/api/og/event/${params.eventId}`;

  return {
    title: event.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: event.title,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const activityOrEventRaw = await getEvent(params.eventId);

  if (!activityOrEventRaw) return notFound();

  // Normalize Dates to strings
  const activityOrEvent = {
    ...activityOrEventRaw,
    datetime:
      activityOrEventRaw.datetime instanceof Date
        ? activityOrEventRaw.datetime.toISOString()
        : activityOrEventRaw.datetime,
    createdAt:
      activityOrEventRaw.createdAt instanceof Date
        ? activityOrEventRaw.createdAt.toISOString()
        : activityOrEventRaw.createdAt,
    updatedAt:
      activityOrEventRaw.updatedAt instanceof Date
        ? activityOrEventRaw.updatedAt.toISOString()
        : activityOrEventRaw.updatedAt,
    creator: {
      ...activityOrEventRaw.creator,
      lastActive:
        activityOrEventRaw.creator.lastActive instanceof Date
          ? activityOrEventRaw.creator.lastActive.toISOString()
          : activityOrEventRaw.creator.lastActive,
      createdAt:
        activityOrEventRaw.creator.createdAt instanceof Date
          ? activityOrEventRaw.creator.createdAt.toISOString()
          : activityOrEventRaw.creator.createdAt,
      updatedAt:
        activityOrEventRaw.creator.updatedAt instanceof Date
          ? activityOrEventRaw.creator.updatedAt.toISOString()
          : activityOrEventRaw.creator.updatedAt,
    },
  };

  return <>{/* <EventPageDetails activityOrEvent={activityOrEvent} /> */}</>;
}
