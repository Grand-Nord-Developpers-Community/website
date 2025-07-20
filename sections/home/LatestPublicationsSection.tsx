import { FC } from "react";
import { PublicationCard } from "@/components/cards";
import Publication, { BlogType } from "@/interfaces/publication";
import { Button } from "@/components/ui/button-more";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import VoidImage from "@/assets/svgs/undraw_void_-3-ggu.svg";
import { Skeleton } from "@/components/ui/skeleton";
import OurPublicationsGrid from "./OurPublications";
import { getBlogPosts } from "@/actions/blog.actions";
const LatestPublicationsSection: FC = async () => {
  const publications = await getBlogPosts();

  return (
    <section className="my-12 w-full bg-gray-50 py-8">
      <div className="screen-wrapper">
        <h2 className="text-3xl font-bold mb-4 text-primary text-center max-sm:text-left ">
          Publications populaires
        </h2>
        <p className="text-center max-w-screen-lg mx-auto max-sm:text-left">
          Decouvrez nos articles populaires pour vous tenir informé des
          dernières tendances, évènements et ressources qui faconnent
          l&apos;écosystème technologique du Grand Nord Cameroun.
        </p>
        <>
          <OurPublicationsGrid publications={publications} />
          <p className="flex justify-center">
            <Button
              asChild
              Icon={<ArrowRightIcon className="size-4 " />}
              className="text-white bg-secondary hover:bg-secondary/90"
              iconPlacement="right"
              variant={"expandIcon"}
            >
              <Link href="/blog">Voir toutes les publications</Link>
            </Button>
          </p>
        </>

        {publications?.length === 0 && (
          <>
            <EmptyPublicationPlaceHolder />
          </>
        )}
      </div>
    </section>
  );
};

const EmptyPublicationPlaceHolder: FC = () => {
  return (
    <div className="flex flex-col h-[300px] justify-center items-center my-5">
      <VoidImage className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
      <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
        il y'a pas de blog pour l&apos;instant !
      </h2>
      <div className="flex w-full justify-center my-2">
        <Button className="px-4" asChild variant="secondary">
          <Link href="/blog/new">Publier en un</Link>
        </Button>
      </div>
    </div>
  );
};

export default LatestPublicationsSection;
