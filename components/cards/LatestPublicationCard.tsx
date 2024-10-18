import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon, CircleUser } from "lucide-react";

import { Card, CardTitle, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import Publication from "@/interfaces/publication";

type PublicationCardProps = { publication: Omit<Publication, "created_at"> };

const LatestPublicationCard: FC<PublicationCardProps> = ({
  publication: { category, published_by, title, updated_at, featured_image },
}) => {
  return (
    <Card>
      <CardHeader className="p-2">
        <figure className="rounded-md overflow-hidden aspect-video">
          {featured_image?.src ? (
            <Image
              loading="lazy"
              src={featured_image.src}
              alt={featured_image.title || title}
              width={featured_image.width}
              height={featured_image.height}
            />
          ) : (
            <div>
              <Image
                loading="lazy"
                Icon
                strokeWidth={1}
                className="h-auto w-full bg-gray-200"
              />
            </div>
          )}
        </figure>

        <div className="p-4">
          <Button
            asChild
            variant="ghost"
            className="bg-blue-50 text-blue-700 mb-2"
            size="sm"
          >
            <Link href={`${"/blog#" + category}`} className="hover:underline">
              {category}
            </Link>
          </Button>

          <CardTitle>
            <Link href={"/blog/this"} className="hover:underline">
              {title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>

      <CardFooter className="px-4 justify-between items-center">
        <Link
          href={"/blog/this"}
          className="flex items-center gap-1 text-blue-950 hover:underline"
        >
          <Avatar>
            <AvatarImage asChild>
              <Image
                loading="lazy"
                src={published_by.profile_image}
                alt={"profile image of: " + published_by.name}
              />
            </AvatarImage>
            <AvatarFallback>
              <CircleUser strokeWidth={1.25} />
            </AvatarFallback>
          </Avatar>
          <span>{published_by.name}</span>
        </Link>

        <span>
          {Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
            updated_at
          )}
        </span>
      </CardFooter>
    </Card>
  );
};

export default LatestPublicationCard;
