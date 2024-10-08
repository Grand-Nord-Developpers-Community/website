import { FC } from "react";
import { usePublication } from "@/hooks/publication";
import { PublicationCard } from "@/components/cards";
import Publication from "@/interfaces/publication";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LatestPublicationsSection: FC = () => {
  const publications = usePublication({ limit: 5 });

  const isEmpty = publications.length === 0;

  return (
    <section className="my-12 screen-wrapper">
      <h2 className="text-3xl font-semibold mb-4 text-primary text-center">
        Publications populaires
      </h2>
      <p className="text-center">
        Decouvrez nos articles populaires pour vous tenir informé des dernières
        tendances, évènements et ressources qui faconnent l&apos;écosystème
        technologique du Grand Nord Cameroun.
      </p>

      {isEmpty ? (
        <EmptyPublicationPlaceHolder />
      ) : (
        <>
          <OurPublicationsGrid publications={publications} />
          <p className="flex justify-center">
            <Button asChild className="text-white">
              <Link href="">Voir toutes les publications &rsaquo;</Link>
            </Button>
          </p>
        </>
      )}
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
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr,minmax(0,530px)] gap-4 lg:gap-6 pt-6 pb-8">
      {firstPublication && (
        <PublicationCard
          publication={firstPublication}
          cardClassName="p-4"
          hasImage
          hasFooter
          showSummary
        />
      )}

      <div className="flex justify-between flex-col">
        {publications.map((publication, index) => {
          return (
            <PublicationCard
              publication={publication}
              key={publication.category + index + publication.title}
              cardClassName="border-0 shadow-none last:border-b-0 border-b border-gray-300 even:bg-gray-50 pb-4 flex-1 p-3"
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestPublicationsSection;
