import React from "react";
import Image from "next/image";
import Slider from "@/assets/images/slider/bg.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
function HeroSection() {
  return (
    <>
      <div className="w-full h-[370px] screen-wrapper relative max-md:hidden ">
        <div className="absolute inset-0 -z-[1] bg-primary ">
          <Image
            src={Slider}
            className="w-full h-full object-cover object-top"
            alt="slide image"
          />
        </div>
        <div className="flex py-5 max-lg:pt-9 text-white items-center">
          <div className="w-[60%] mt-5">
            <h1 className="font-extrabold text-4xl w-2/3">
              <span className="text-secondary">G</span>rand{" "}
              <span className="text-secondary">N</span>ord{" "}
              <span className="text-secondary">D</span>evelopers{" "}
              <span className="text-secondary">C</span>ommunity
            </h1>
            <div className="flex gap-5 mt-[22%]">
              <Button className="rounded-none" asChild>
                <Link href="/sign-in">Rejoindre la communauté</Link>
              </Button>
              <Button
                className="text-white rounded-none border border-secondary"
                asChild
                variant={"outline"}
              >
                <Link href="#">Nous supporter</Link>
              </Button>
            </div>
          </div>
          <div className="w-[40%] flex flex-col items-end">
            <p className="text-right">
              Communauté des développeurs du Grand Nord Cameroun pour promouvoir
              l&apos;innovation, partager les compétences technologiques, et
              résoudre les défis locaux à travers des solutions collaboratives.
            </p>
            <Button
              className="pr-0 font-semibold text-lg"
              asChild
              variant={"ghost"}
            >
              <Link href="#">
                Devenir sponsor{" "}
                <ChevronRight
                  className="text-secondary -mr-2"
                  strokeWidth={4}
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative w-full hidden max-md:flex flex-col size-full items-center justify-center overflow-hidden bg-background py-10 md:shadow-xl">
        <div className="flex items-center justify-center my-5">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="text-sm">Devenir Sponsor</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
        <h1 className="z-10 w-full whitespace-pre-wrap text-center text-3xl font-bold tracking-tighter text-black dark:text-white">
          Grand Nord Developers Community
        </h1>
        <p className="text-sm  w-full px-3 text-center mt-5">
          Communauté des développeurs du{" "}
          <mark className="skew-x-2 bg-primary text-white px-2 font-bold">
            Grand Nord Cameroun
          </mark>{" "}
          pour promouvoir l&apos;innovation, partager les compétences
          technologiques, et résoudre les défis locaux à travers des solutions
          collaboratives.
        </p>
        <Button
          className="mt-3 grow border border-primary rounded-full text-white"
          asChild
        >
          <Link href="/login">Rejoindre la communauté</Link>
        </Button>
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </>
  );
}

export default HeroSection;
