import { FC } from "react";

import { useSponsors } from "@/hooks/ourSponsors";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const OurSponsors: FC = () => {
  const sponsors = useSponsors();

  return (
    <section className="my-12">
      <p>
        Notre communauté s&apos;associe à des entreprise, institutions et des
        communautés technologiques pour stimuler l&apos;innovation et renforcer
        les compétences dans le Grand Nord Cameroun.
      </p>

      <div className="flex gap-6 w-full justify-center flex-wrap my-12 mx-2">
        {sponsors.map((sponsor, index) => {
          return (
            <a href={sponsor.url} key={sponsor.name + index}>
              <Image
                src={sponsor.logo.url}
                width={sponsor.logo.width}
                height={sponsor.logo.height}
                alt={"logo " + sponsor.name}
                className="w-auto h-14"
              />
            </a>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          asChild
          variant="ghost"
          className="font-bold text-lg hover:underline text-blue-950"
        >
          <Link href="">
            Devenir sponsor <ChevronRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default OurSponsors;
