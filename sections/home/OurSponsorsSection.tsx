import { FC } from "react";
import { useSponsors } from "@/hooks/ourSponsors";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Marquee from "@/components/ui/marquee";

const OurSponsors: FC = () => {
  const sponsors = useSponsors();

  return (
    <section className="bg-card py-8">
      <Link
        href="/besponsor"
        className="text-sm max-sm:hidden block w-fit mx-auto border border-secondary rounded-full px-3 py-1  mb-10 max-sm:text-sm"
      >
        <span className="text-black dark:text-white">
          Notre communauté s&apos;associe à des entreprises, pour innover.
        </span>
        &ensp;
        <span className="text-secondary inline-flex items-center">
          Devenir sponsor&ensp;
          <ArrowRight className="size-4 text-secondary" />
        </span>
      </Link>

      <div className="relative flex w-full items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {sponsors.map((sponsor, index) => {
            return (
              <a href={sponsor.url} key={sponsor.name + index}>
                <Image
                  loading="lazy"
                  src={sponsor.logo.url}
                  width={sponsor.logo.width}
                  height={sponsor.logo.height}
                  alt={"logo " + sponsor.name}
                  className="w-auto h-10 mx-5 max-sm:h-9"
                />
              </a>
            );
          })}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-card dark:from-card"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-card dark:from-card"></div>
      </div>
    </section>
  );
};

export default OurSponsors;
