import { FC } from "react";
import { usePublication } from "@/hooks/publication";
import { PublicationCard } from "@/components/cards";
import Publication from "@/interfaces/publication";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LatestPublicationsSection: FC = () => {
  const publications = usePublication({ limit: 3 });

  const isEmpty = publications.length === 0;

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

        {isEmpty ? (
          <EmptyPublicationPlaceHolder />
        ) : (
          <>
            <OurPublicationsGrid publications={publications} />
            <p className="flex justify-center">
              <Button asChild className="text-white">
                <Link href="/blog">Voir toutes les publications &rsaquo;</Link>
              </Button>
            </p>
          </>
        )}
      </div>
    </section>
  );
};

const EmptyPublicationPlaceHolder: FC = () => {
  return (
    <div className="grid h-[400px] bg-gray-100 rounded-lg justify-center items-center">
      Pas de publications pour l&apos;instant !
    </div>
  );
};

const OurPublicationsGrid: FC<{ publications: Publication[] }> = ({
  publications,
}) => {
  const firstPublication = publications.shift();

  return (
    <div className="w-full">
      <div className="flex gap-4 w-full  my-10 flex-wrap">
        {firstPublication && (
          <PublicationCard
            publication={firstPublication}
            cardClassName="p-4 bg-white rounded-xl lg:w-[55%] h-fit max-md:w-full"
            hasImage
            hasFooter
            showSummary
          />
        )}

        <div className="flex justify-between flex-col gap-4 w-[43%] max-md:w-full">
          {publications.map((publication, index) => {
            return (
              <PublicationCard
                publication={publication}
                showSummary
                key={index + publication.title}
                cardClassName="p-4 w-full grow bg-white"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestPublicationsSection;
