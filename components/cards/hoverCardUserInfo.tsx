import { CalendarIcon } from "lucide-react";
import { type Post } from "@/types";

type AuthorType = Exclude<Post, undefined>["author"];

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Avatar from "../avatar";

export default function HoverCardProfile({
  name,
  bio,
  image,
  createdAt,
  experiencePoints,
  role,
  username,
}: AuthorType) {
  return (
    <Card className="my-5 w-full">
      <CardHeader className="relative p-4">
        <div className="flex items-start gap-5">
          <div className="relative">
            <Avatar
              className="bg-gray-50 w-20 h-20 rounded-lg object-cover"
              username={username}
              image={image}
              name={name}
            />

            <Badge
              variant="secondary"
              className="absolute -bottom-2 -right-2 font-mono"
            >
              {experiencePoints} Xp
            </Badge>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl hover:text-secondary sm:text-2xl font-bold line-clamp-1">
                <Link href={`/user/${username}`}>{name}</Link>
              </h2>
            </div>
            <Badge variant="outline">
              {role.name === "user" ? "membre" : "Moderator"}
            </Badge>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Rejoint le{" "}
                {new Date(createdAt).toLocaleDateString("FR-fr", {
                  dateStyle: "long",
                })}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <p className="text-sm text-muted-foreground">
          {bio ? bio : "Pas de Bio disponible !"}
        </p>
        {/*<div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4" />
            <span className="text-sm">sarahdev.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Github className="w-4 h-4" />
            <span className="text-sm">sarahdev</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Twitter className="w-4 h-4" />
            <span className="text-sm">@sarahdev</span>
          </div>
        </div>*/}
        {/*<div className="flex gap-2 text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold">1.2k</span> posts
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">15.4k</span> comments
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">42.8k</span> reactions
          </div>
        </div>*/}
      </CardContent>
    </Card>
  );
}
