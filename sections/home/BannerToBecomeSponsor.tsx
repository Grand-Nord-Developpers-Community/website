import Image from "next/image";
import sponsorImage from "../../assets/images/commons/sponsorImage.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BannerToBecomeSponsor = () => {
  return (
    <section className="w-full my-8 bg-white  py-4">
      <h2 className="text-secondary text-3xl font-bold mb-4">Nous supporter</h2>
      <div className="shadow-gray-500 shadow-sm  rounded-md grid gap-4 sm:grid-cols-12 items-center">
        <div className="sm:col-span-2">
          <Image
            src={sponsorImage}
            alt="Become a sponsor of GDNC"
            className="w-full rounded-md"
          />
        </div>
        <div className="sm:col-span-7">
          <p className="text-justify w-full text-xl text-black leading-normal ">
            Devenez sponsor de la Grand Nord Developers Community et soutenez
            l&apos;innovation technologique dans le Grand Nord Cameroun, tout en
            faisant partie d&apos;un mouvement qui façonne l&apos;avenir numérique de la
            région.
          </p>
        </div>
        <div className="sm:col-span-3 flex items-center justify-center">
          <Button variant="outline" size="lg" className="">
            <Link href="/" title="Become a Sponsor">
              Nous supporter
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BannerToBecomeSponsor;
