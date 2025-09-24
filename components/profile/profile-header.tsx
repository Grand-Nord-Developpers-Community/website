import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import Image from "next/image";
import { UserProfile } from "@/types";
import Avatar from "../avatar";
import {
  BadgeCheck,
  MoreVertical,
  Share2,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import bgImage from "@/assets/images/brand/bg-login.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ShareBtn from "./share-btn";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
export default function ProfileHeader({ user }: { user: UserProfile }) {
  const isAdmin = user?.role.name === "admin" || user?.role.name === "manager";
  const blogs = user?.blogPosts.length;
  const forums = user?.forumPosts.length;

  return (
    <>
      <div className="hidden lg:flex flex-wrap justify-between">
        <div className="w-full lg:w-[40%] px-4 flex justify-center">
          <div className="relative w-full -m-16 -ml-20 lg:-ml-16 max-sm:-mt-12 ">
            <div className="flex gap-5  align-middle absolute w-full">
              <Avatar
                className="bg-gray-50 rounded-full w-[150px] grow-0 h-[150px] max-sm:size-[100px] object-cover  border-4 border-primary "
                {...user!}
              />

              <div className="mt-20 max-sm:mt-16">
                <h1 className="text-2xl font-bold text-primary truncate max-sm:max-w-[200px]">
                  {user?.name}
                </h1>
                <p className="text-sm text-gray-400">@{user?.username}</p>
                <div className="flex gap-2 mt-2">
                  <Badge>{isAdmin ? "Moderateur" : "Membre"}</Badge>
                  <Badge variant={"secondary"}>
                    {user?.experiencePoints} xp
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Inscrit {formatRelativeTime(user?.createdAt!)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 max-lg:mt-[100px]">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {user?.activity?.totalDaysActive || 0}
                <span className="text-xs"> j</span>
              </span>
              <span className="text-sm text-blueGray-400">Activitées</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {forums}
              </span>
              <span className="text-sm text-blueGray-400">Forums</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {blogs}
              </span>
              <span className="text-sm text-blueGray-400">Blogs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className=" relative w-full h-[102px] bg-gray-500 border-b border-border overflow-hidden">
          <Image
            src={bgImage}
            alt="Arrière-plan du profil"
            className="w-full h-full object-cover "
            fill
          />
        </div>

        <div className="px-4 py-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <Avatar
              className="bg-gray-50 rounded-full w-[150px] grow-0 h-[150px] max-sm:size-[100px] object-cover  border-4 border-primary "
              {...user!}
            />
            <div className="flex items-center gap-2 mt-16">
              <ShareBtn user={user} />
            </div>
            {/* <div className="flex items-center gap-2 mt-16">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-xl font-bold text-black ">{user?.name}</h1>
                {isAdmin && (
                  <Tooltip delayDuration={1000}>
                    <TooltipTrigger asChild>
                      <ShieldCheck className="size-6 text-white fill-secondary" />
                    </TooltipTrigger>
                    <TooltipContent>Modérateur</TooltipContent>
                  </Tooltip>
                )}
              </div>
              <p className="text-gray-500">@{user?.username}</p>
            </div>

            {/* <p className="text-black">{user?.bio || "Pas de bio"}</p> */}
            <p className="text-gray-400 text-xs">
              Inscrit {formatRelativeTime(user?.createdAt!)}
            </p>
            <div className="flex items-center">
              <span className="font-bold text-black">
                {user?.activity.totalDaysActive}
              </span>
              <span className="text-gray-500 ml-1">j activitées</span>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
              <div className="flex items-center">
                <span className="font-bold text-black">{forums}</span>
                <span className="text-gray-500 ml-1">forums</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-black">{blogs}</span>
                <span className="text-gray-500 ml-1">Blogs</span>
              </div>

              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-black">
                  {user?.experiencePoints}
                </span>
                <span className="text-gray-500 ml-1">xp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
