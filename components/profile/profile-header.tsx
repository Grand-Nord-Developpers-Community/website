import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { UserProfile } from "@/types";

export default function ProfileHeader({ user }: { user: UserProfile }) {
  const isAdmin = user.role === "admin" || user.role === "manager";
  const blogs = user.blogPosts.length;
  const forums = user.forumPosts.length;
  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full lg:w-[40%] px-4 flex justify-center">
        <div className="relative w-full -m-16 -ml-20 lg:-ml-16 ">
          <div className="flex gap-5  align-middle absolute w-full">
            <Avatar className="shadow-xl bg-gray-50 rounded-full w-[150px] grow-0 h-[150px] object-cover  border-4 border-primary ">
              <AvatarImage
                src={
                  user.image ||
                  `https://dummyjson.com/icon/${user.username}/150`
                }
                className="object-cover"
                alt={"lol"}
              />
              <AvatarFallback className="uppercase">
                {user?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="mt-20">
              <h1 className="text-2xl font-bold text-primary truncate max-sm:max-w-[200px]">
                {user.name}
              </h1>
              <p className="text-sm text-gray-400">@{user.username}</p>
              <div className="flex gap-2 mt-2">
                <Badge>{isAdmin ? "Moderateur" : "Membre"}</Badge>
                <Badge variant={"secondary"}>{user.experiencePoints} xp</Badge>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Inscrit {formatRelativeTime(user.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4 max-lg:mt-[100px]">
        <div className="flex justify-center py-4 lg:pt-4 pt-8">
          <div className="mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
              {user.activity.totalDaysActive}
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
  );
}
