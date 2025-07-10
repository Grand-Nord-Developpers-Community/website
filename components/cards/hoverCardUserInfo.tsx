import { CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Post } from "@/types";

type AuthorType = Exclude<Post, undefined>["author"];

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    // <HoverCard >
    //   <HoverCardTrigger asChild>
    //     <Button variant="link" className="p-0">@{name}</Button>
    //   </HoverCardTrigger>
    //   <HoverCardContent className="w-[300px]">
    //     <div className="flex justify-between space-x-2">
    //       <Avatar>
    //         <AvatarImage src={image||""}/>
    //         <AvatarFallback>{name?.slice(0, 2)?.toUpperCase()||""}</AvatarFallback>
    //       </Avatar>
    //       <div className="space-y-1">
    //         <h4 className="text-sm font-semibold">{name}</h4>
    //         <p className="text-sm">{bio ? bio : "Pas de Bio maintenant !"}</p>
    // <div className="flex items-center pt-2">
    //   <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
    //   <span className="text-xs text-muted-foreground">
    //     Rejoint le{" "}
    //     {new Date(createdAt).toLocaleDateString("FR-fr", {
    //       dateStyle: "long",
    //     })}
    //   </span>
    // </div>
    //         <Button variant={"link"} className="px-0">Voir le profil</Button>
    //       </div>
    //     </div>
    //   </HoverCardContent>
    // </HoverCard>
    <Card className="my-5 w-full">
      <CardHeader className="relative p-4">
        <div className="flex items-start gap-5">
          <div className="relative">
            <Avatar className="bg-gray-50 w-20 h-20 rounded-lg object-cover">
              <AvatarImage
                className="size-full rounded-lg object-cover"
                src={image || `/api/avatar?username=${username}`}
              />
              <AvatarFallback className="size-full object-cover rounded-lg">
                {name?.slice(0, 2)?.toUpperCase() || ""}
              </AvatarFallback>
            </Avatar>
            <Badge
              variant="secondary"
              className="absolute -bottom-2 -right-2 font-mono"
            >
              {experiencePoints} Xp
            </Badge>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold line-clamp-1">{name}</h2>
            </div>
            <Badge variant="outline">
              {role === "user" ? "membre" : "Moderator"}
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
