"use client";
import { FC } from "react";
import { PublicationCard } from "@/components/cards";
import Publication, { BlogType } from "@/interfaces/publication";
import { Button } from "@/components/ui/button-more";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import VoidImage from "@/assets/svgs/undraw_void_-3-ggu.svg";
import { useGetListBlog } from "@/hooks/use-hook";
import { Skeleton } from "@/components/ui/skeleton";
const LatestPublicationsSection: FC = () => {
  //const publications = usePublication({ limit: 3 });
  const { data: publications, isLoading, isError } = useGetListBlog();

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

        {!isLoading && publications && publications.length > 0 && (
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
        )}
        {isLoading && (
          <>
            <div className="flex gap-4 w-full  mt-5  max-lg:flex-col max-lg:w-[95%] max-md:w-full mx-auto">
              {/* Main Featured Post */}
              <div className="flex lg:w-[55%] max-lg:w-full flex-col space-y-4">
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                </div>
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex-grow" />{" "}
                {/* This will push the button to the bottom */}
                <Skeleton className="h-10 w-[120px]" />
              </div>

              {/* Sidebar Posts */}
              <div className="flex w-[43.8%] max-lg:w-full flex-col space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex-1 space-y-4 p-4">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[120px]" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-[180px]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!isLoading && publications && publications?.length === 0 && (
          <>
            <EmptyPublicationPlaceHolder />
          </>
        )}

        {
          //@ts-ignore
          !publications && !isLoading && (
            <div className="grid h-[300px] bg-red-200  w-full justify-center items-center mt-5">
              <span className="text-white text-xl text-bold ">
                Erreur de chargement !!!
              </span>
            </div>
          )
        }
      </div>
    </section>
  );
};

const EmptyPublicationPlaceHolder: FC = () => {
  return (
    <div className="flex flex-col h-[400px] justify-center items-center my-5">
      <VoidImage className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
      <h2 className="text-2xl mx-auto text-center font-medium my-3 text-gray-400">
        Pas de publications pour l&apos;instant !
      </h2>
      <div className="flex w-full justify-center my-2">
        <Button className="px-4" asChild variant="secondary">
          <Link href="/blog/new">Publier en un</Link>
        </Button>
      </div>
    </div>
  );
};

const OurPublicationsGrid: FC<{ publications: BlogType[] }> = ({
  publications,
}) => {
  return (
    <div className="w-full">
      <div className="flex gap-4 w-full  my-10 max-lg:flex-col max-lg:w-[95%] max-md:w-full mx-auto ">
        <PublicationCard
          publication={publications[0]}
          cardClassName="p-4 bg-white rounded-xl lg:w-[55%] h-fit max-lg:w-full"
          hasImage
          hasFooter
          showSummary
        />

        <div className="flex justify-between flex-col gap-4 w-[43.8%] max-lg:w-full">
          {publications.slice(1, 3).map((publication, index) => (
            <PublicationCard
              publication={publication}
              showSummary
              key={index + publication.title}
              cardClassName="p-4 w-full grow bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestPublicationsSection;
