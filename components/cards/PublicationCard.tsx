import { FC } from "react";
import Link from "next/link";
import { ThumbsUp, MessageSquare, EyeIcon } from "lucide-react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
} from "../ui/card";

import { Button } from "../ui/button";

import { BlogType } from "@/interfaces/publication";
import clsx from "clsx";
import ImageWrapper from "../imageWrapper";
import Avatar from "../avatar";

type PublicationCardProps = {
  publication: BlogType[number];
  hasImage?: boolean;
  hasFooter?: boolean;
  showSummary?: boolean;
  cardClassName?: string;
  views?: number;
};

const LatestPublicationCard: FC<PublicationCardProps> = ({
  publication,
  hasImage,
  hasFooter,
  showSummary,
  cardClassName = "",
  views = 0,
}) => {
  return (
    <Card className={clsx(cardClassName, "flex justify-between flex-col")}>
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
      <div>
        <CardHeader
          className={clsx("p-0 pt-4", {
            "pt-0": !hasImage,
          })}
        >
          <div className="flex gap-4 items-center justify-between text-sm pb-4 border-b border-gray-200">
            <div className="w-full flex items-center justify-between gap-4 p-0">
              <div className="flex items-center gap-2">
                <Link href={`/user/${publication.author.username}`}>
                  <Avatar
                    className="bg-gray-50 size-12"
                    {...publication.author}
                  />
                </Link>

                <div className="flex flex-col gap-1">
                  <Link
                    className="hover:text-secondary truncate max-w-32"
                    href={`/user/${publication.author.username}`}
                  >
                    {publication.author.name}
                  </Link>
                  <span className="text-xs text-gray-500 font-light">
                    {new Date(publication.createdAt).toLocaleDateString(
                      "FR-fr",
                      {
                        dateStyle: "long",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <CardTitle>
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
      </div>

      {hasFooter && (
        <CardFooter className="m-0 p-0 justify-between items-center mb-5">
          <Button asChild>
            <Link href={`/blog/${publication.slug}`}> Apprendre plus</Link>
          </Button>
        </CardFooter>
      )}
      <div>
        <hr className="mb-3" />
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <EyeIcon className="size-4 text-gray-500" />
              <span className="text-sm text-gray-500">{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="size-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {publication.likes.map((l) => l.isLike).length || 0}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <MessageSquare className="size-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {publication.replies.length || 0}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LatestPublicationCard;
