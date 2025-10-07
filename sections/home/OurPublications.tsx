import { fetchPageViews } from "@/actions/utils.actions";
import { PublicationCard } from "@/components/cards";
import { BlogType } from "@/interfaces/publication";
import { FC } from "react";

const OurPublicationsGrid: FC<{ publications: BlogType }> = async ({
  publications,
}) => {
  const views = await fetchPageViews(
    publications?.map((b) => b.slug),
    "blog"
  );
  return (
    <div className="w-full">
      <div className="flex gap-4 w-full  my-10 max-lg:flex-col max-lg:w-[95%] max-md:w-full mx-auto ">
        <PublicationCard
          publication={publications[0]}
          views={views[publications[0]?.slug]}
          cardClassName="p-4 bg-card rounded-xl lg:w-[55%] h-fit max-lg:w-full"
          hasImage
          hasFooter
          showSummary
        />

        <div className="flex justify-between flex-col gap-4 w-[43.8%] max-lg:w-full">
          {publications.slice(1, 3).map((publication, index) => (
            <PublicationCard
              publication={publication}
              showSummary
              views={views[publication.slug]}
              key={index + publication.title}
              cardClassName="p-4 w-full grow bg-card"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPublicationsGrid;
