import { FC } from "react";
import { usePublication } from "@/hooks/publication";
import { LatestPublicationCard } from "@/components/cards";
import Publication from "@/intefaces/publication";

const OurSponsorsSection: FC = () => {
  const publications = usePublication({ limit: 6 });

  const isEmpty = publications.length === 0;

  return (
    <section className="my-12">
      <h2 className="text-3xl font-semibold mb-4">Publications populaires</h2>
      <p>
        Decouvrez nos articles populaires pour vous tenir informé des dernières
        tendances, évènements et ressources qui faconnent l&apos;écosystème
        technologique du Grand Nord Cameroun.
      </p>

      {isEmpty ? (
        <EmptyPublicationPlaceHolder />
      ) : (
        <OurPublicationsGrid publications={publications} />
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 px-4 md:px-8 lg:px-16 pt-6 pb-8">
      {publications.map((publication, index) => {
        return (
          <LatestPublicationCard
            publication={publication}
            key={publication.category + index + publication.title}
          />
        );
      })}
    </div>
  );
};

export default OurSponsorsSection;
