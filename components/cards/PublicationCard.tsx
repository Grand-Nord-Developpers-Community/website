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
import { cn } from "@/lib/utils";

type PublicationCardProps = {
  publication: Omit<Publication, "created_at" | "category">;
  hasImage?: boolean;
  hasFooter?: boolean;
  showSummary?: boolean;
  cardClassName?: string;
};

const LatestPublicationCard: FC<PublicationCardProps> = ({
  publication: { summary, published_by, title, updated_at, featured_image },
  hasImage,
  hasFooter,
  showSummary,
  cardClassName = "",
}) => {
  return (
    <Card className={cn("rounded-none", cardClassName)}>
      {hasImage && (
        <figure className="overflow-hidden aspect-video">
          {featured_image?.src ? (
            <Image
              src={featured_image.src}
              alt={featured_image.title || title}
              width={featured_image.width}
              height={featured_image.height}
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

      <CardHeader className="p-0 pt-4">
        <div className="flex gap-4 items-center text-sm">
          <Button asChild variant="link" className="gap-1 p-0" size="sm">
            <Link href={""}>
              <Avatar className="h-auto w-auto">
                <AvatarImage asChild>
                  <Image
                    src={published_by.profile_image}
                    alt={"profile image of: " + published_by.name}
                  />
                </AvatarImage>
                <AvatarFallback className="p-0">
                  <CircleUser strokeWidth={1.25} />
                </AvatarFallback>
              </Avatar>
              <span className="capitalize">By {published_by.name}</span>
            </Link>
          </Button>

          <span>
            {Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
              updated_at
            )}
          </span>
        </div>
        <CardTitle>
          <Link
            href={""}
            className="hover:underline hover:text-opacity-85 active:text-opacity-85"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>

      {showSummary && (
        <CardDescription className="py-4">{summary}</CardDescription>
      )}

      {hasFooter && (
        <CardFooter className="m-0 p-0 pt-2 justify-between items-center">
          <Button asChild>
            <Link href={""}> Read more &rsaquo;</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LatestPublicationCard;
