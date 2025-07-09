import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon, CircleUser } from "lucide-react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { BlogType } from "@/interfaces/publication";
import clsx from "clsx";
import ImageWrapper from "../imageWrapper";

type PublicationCardProps = {
  publication: BlogType[number];
  hasImage?: boolean;
  hasFooter?: boolean;
  showSummary?: boolean;
  cardClassName?: string;
};

const LatestPublicationCard: FC<PublicationCardProps> = ({
  publication,
  hasImage,
  hasFooter,
  showSummary,
  cardClassName = "",
}) => {
  return (
    <Card className={cardClassName}>
      {hasImage && (
        <figure className="overflow-hidden aspect-video w-full h-[300px] max-sm:h-[200px] rounded-xl">
          <ImageWrapper
            className="w-full object-cover h-full object-center "
            src={publication.preview}
            hash={publication.previewHash}
            width={1280}
            height={680}
            alt={publication.description}
          />
        </figure>
      )}

      <CardHeader
        className={clsx("p-0 pt-4", {
          "pt-0": !hasImage,
        })}
      >
        <div className="flex gap-4 items-center justify-between text-sm pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4 p-0">
            <Avatar className="bg-gray-50 size-12">
              <AvatarImage
                src={
                  publication?.author?.image ||
                  `https://dummyjson.com/icon/${publication?.author?.username}/150`
                }
              />
              <AvatarFallback className="p-0">
                {publication?.author?.name?.slice(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span>{publication.author.name}</span>
              <span className="text-xs text-gray-500 font-light">
                {new Date(publication.createdAt).toLocaleDateString("FR-fr", {
                  dateStyle: "long",
                })}
              </span>
            </div>
          </div>
        </div>
        <CardTitle>
          {/*<div className="flex gap-2 my-2">
            {tags.map((t, i) => (
              <Link
                key={i}
                href="#"
                className="p-2 rounded font-medium bg-primary/30 text-sm text-gray-800"
              >
                {t}
              </Link>
            ))}
          </div>*/}
          <Link
            href={`/blog/${publication.slug}`}
            className="text-xl max-sm:text-lg hover:text-secondary hover:text-opacity-85 active:text-opacity-85"
          >
            {publication.title}
          </Link>
        </CardTitle>
      </CardHeader>

      {showSummary && (
        <CardDescription className="py-4 ">
          <span className="line-clamp-2">{publication.description}</span>
        </CardDescription>
      )}

      {hasFooter && (
        <CardFooter className="m-0 p-0 justify-between items-center">
          <Button asChild>
            <Link href={`/blog/${publication.slug}`}> Apprendre plus</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LatestPublicationCard;
