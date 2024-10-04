import React from "react";
import Image from "next/image";
import Slider from "@/assets/images/slider/bg.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
function HeroSection() {
  return (
    <div className="w-full h-[370px] relative">
      <div className="absolute inset-0 -z-[1]">
        <Image
          src={Slider}
          className="w-full h-full object-cover object-top"
          alt="slide image"
        />
      </div>
      <div className="flex w-full px-5 py-5 text-white items-center">
        <div className="w-[60%] mt-5">
          <h1 className="font-extrabold text-4xl w-2/3">
            Grand Nord Developers Community
          </h1>
          <div className="flex gap-5 mt-[22%]">
            <Button className="rounded-none" asChild>
              <Link href="/sign-in">Rejoindre la communauté</Link>
            </Button>
            <Button
              className="text-white rounded-none   border border-primary"
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
              <ChevronRight className="text-primary" strokeWidth={4} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
