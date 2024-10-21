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

import Publication from "@/interfaces/publication";
import clsx from "clsx";

type PublicationCardProps = {
  publication: Omit<Publication, "created_at">;
  hasImage?: boolean;
  hasFooter?: boolean;
  showSummary?: boolean;
  cardClassName?: string;
};

const LatestPublicationCard: FC<PublicationCardProps> = ({
  publication: {
    summary,
    published_by,
    title,
    updated_at,
    featured_image,
    tags,
  },
  hasImage,
  hasFooter,
  showSummary,
  cardClassName = "",
}) => {
  return (
    <Card className={cardClassName}>
      {hasImage && (
        <figure className="overflow-hidden aspect-video w-full h-[300px] max-sm:h-[200px] rounded-xl">
          {featured_image?.src ? (
            <Image
              loading="lazy"
              src={featured_image.src}
              alt={featured_image.title || title}
              width={featured_image.width}
              height={featured_image.height}
              className="w-full h-full object-cover "
            />
          ) : (
            <div>
              <ImageIcon
                strokeWidth={1}
                className="h-auto w-full bg-gray-200"
              />
            </div>
          )}
        </figure>
      )}

      <CardHeader
        className={clsx("p-0 pt-4", {
          "pt-0": !hasImage,
        })}
      >
        <div className="flex gap-4 items-center justify-between text-sm pb-4 border-b border-gray-200">
          <Button asChild variant="link" className="gap-1 p-0" size="sm">
            <Link href={"/blog/this"}>
              <Avatar className="h-auto w-auto">
                <AvatarImage asChild>
                  <Image
                    loading="lazy"
                    src={published_by.profile_image}
                    alt={"profile image of: " + published_by.name}
                  />
                </AvatarImage>
                <AvatarFallback className="p-0">
                  <CircleUser strokeWidth={1.25} className="size-10" />
                </AvatarFallback>
              </Avatar>
              <span className="capitalize">{published_by.name}</span>
            </Link>
          </Button>

          <span>
            {Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
              updated_at
            )}
          </span>
        </div>
        <CardTitle>
          <div className="flex gap-2 my-2">
            {tags.map((t, i) => (
              <Link
                key={i}
                href="#"
                className="p-2 rounded font-medium bg-primary/30 text-sm text-gray-800"
              >
                {t}
              </Link>
            ))}
          </div>
          <Link
            href={"/blog/this"}
            className="text-xl max-sm:text-lg hover:underline hover:text-opacity-85 active:text-opacity-85"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>

      {showSummary && (
        <CardDescription className="py-4 ">
          <span className="line-clamp-2">{summary}</span>
        </CardDescription>
      )}

      {hasFooter && (
        <CardFooter className="m-0 p-0 justify-between items-center">
          <Button asChild>
            <Link href={"/blog/this"}> Read more &rsaquo;</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LatestPublicationCard;
