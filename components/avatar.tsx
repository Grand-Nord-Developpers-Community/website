import React from "react";

import {
  Avatar as AvatarWrapper,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import clsx from "clsx";
import Link from "next/link";
type Props = {
  username: string | null;
  image: string | null;
  className?: string;
  name: string | null;
};
function Avatar({ username, name, image, className }: Props) {
  return (
    <AvatarWrapper
      asChild
      className={clsx("h-8 bg-gray-50 w-8 rounded-lg", className)}
    >
      <Link href={`/user/${username}`}>
        <AvatarImage
          className="object-cover size-full object-top"
          src={image || `/api/avatar?username=${username}`}
          alt={name || ""}
        />
        <AvatarFallback className="rounded-lg">
          {name?.slice(0, 2)?.toUpperCase() || "CN"}
        </AvatarFallback>
      </Link>
    </AvatarWrapper>
  );
}

export default Avatar;
