import React from "react";

import {
  Avatar as AvatarWrapper,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import clsx from "clsx";
type Props = {
  username: string | null;
  image: string | null;
  className?: string;
  name: string | null;
};
function Avatar({ username, name, image, className }: Props) {
  return (
    <AvatarWrapper className={clsx("h-8 bg-gray-50 w-8 rounded-lg", className)}>
      <AvatarImage
        className="object-cover size-full object-top"
        src={image || `/api/avatar?username=${username}`}
        alt={name || ""}
      />
      <AvatarFallback className="rounded-lg">
        {name?.slice(0, 2)?.toUpperCase() || "CN"}
      </AvatarFallback>
    </AvatarWrapper>
  );
}

export default Avatar;
