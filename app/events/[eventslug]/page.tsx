"use client";
import image from "@/assets/images/commons/image.png";
import { useActivitiesAndEvents } from "@/hooks/activitiesAndEvents";
import { Calendar, Locate, LucideShieldQuestion } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const EventPageDetails = () => {
  const { eventslug } = useParams();
  const data = useActivitiesAndEvents({ limit: 1 });
  const activityOrEvent = data[0];

  return (
    <div className="w-full screen-wrapper">
      <div className="py-16 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="flex justify-center flex-col">
            <h1 className="text-3xl font-bold font-mono">
              {activityOrEvent.title}
            </h1>
            <div className="flex-col flex max-md:justify-center my-4 max-w-xl">
              <Image src={image} alt="Event cover Image" className="w-full" />
              <h4 className="text-2xl font-bold my-3">Resumé:</h4>
              <p className="text-xl leading-normal font-normal text-justify">
                {activityOrEvent.summary}
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 md:border-l-2 md:ps-3">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Détails sur l&apos;évenement</h2>
            <ul className="py-4 flex flex-col gap-3">
              <li className="flex items-center gap-2 border-2 rounded-md py-2 px-3">
                <LucideShieldQuestion className="size-8 text-primary" />
                <h4 className="text-lg">
                  Type:{" "}
                  <span className="font-bold capitalize">
                    {activityOrEvent.type}{" "}
                  </span>
                </h4>
              </li>
              <li className="flex items-center gap-2 border-2 rounded-md py-2 px-3">
                <Calendar className="size-8 text-primary" />
                <h4 className="text-lg">
                  Date:{" "}
                  <span className="font-bold capitalize">17 Novembre 2024</span>
                </h4>
              </li>
              <li className="flex items-center gap-2 border-2 rounded-md py-2 px-3">
                <Locate className="size-8 text-primary" />
                <h4 className="text-lg">
                  Lieu:{" "}
                  <span className="font-bold capitalize">
                    {activityOrEvent.place}{" "}
                  </span>
                </h4>
              </li>
              <li>
                <h4 className="text-xl font-bold">Objectifs:</h4>
                <p className="text-lg text-justify mt-3">
                  {activityOrEvent.objectifs}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPageDetails;
