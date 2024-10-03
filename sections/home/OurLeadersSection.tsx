"use client";

import leaders from "@/data/ourLeaders";
import OurLeaders from "@/interfaces/ourLeaders";
import { cn } from "@/lib/utils";
import { Facebook, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OurLeadersSection = () => {
  const [leaderDetails, setLeaderDetails] = useState(
    Array(leaders.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    const newLeaderDetails = [...leaderDetails];
    newLeaderDetails[index] = true;
    setLeaderDetails(newLeaderDetails);
  };

  const handleMouseLeave = (index: number) => {
    const newLeaderDetails = [...leaderDetails];
    newLeaderDetails[index] = false;
    setLeaderDetails(newLeaderDetails);
  };

  return (
    <section className="my-14 bg-white px-4">
      <div className="grid sm:grid-cols-12 items-start gap-4">
        <div className="sm:col-span-5">
          <h2 className="text-black text-3xl font-bold mb-4">Nos leaders</h2>
          <p className="text-xl leading-normal">
            GNDC est dirigée par une équipe de leaders passionnés et
            visionnaires, dévoués à l'innovation technologique et à
            l'enseignement dans le Grand Nord Cameroun.
          </p>
        </div>
        <div className="sm:col-span-7 flex justify-center">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {leaders.map((leader, index) => {
              return (
                <div
                  className="w-auto p-4 border-1 border-gray-300 flex flex-col justify-center items-center cursor-pointer"
                  onMouseLeave={() => handleMouseLeave(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <div className="relative z-10">
                    <Image
                      src={leader.url}
                      alt={leader.name}
                      className="w-20"
                    />
                  </div>
                  <div
                    className={cn(
                      "mt-2 z-50 max-sm:block",
                      leaderDetails[index] ? "block" : "hidden"
                    )}
                  >
                    <h4 className="text-lg text-black font-bold text-center">
                      {leader.name}
                    </h4>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={leader.socials.gmail} title={leader.name}>
                        <Mail className="size-6 hover:text-secondary" />
                      </Link>
                      <Link href={leader.socials.linkedln} title={leader.name}>
                        <Linkedin className="size-6 hover:text-secondary" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLeadersSection;
