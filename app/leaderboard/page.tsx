import HeadingPage from "@/sections/common/HeadingPage";
import { Trophy } from "lucide-react";
import AdBlock from "@/components/adblock";
import { getPaginatedForums } from "@/actions/forum.actions";
import { getBlogPostsPaginated } from "@/actions/blog.actions";
import ListBrief from "@/components/list";
import { getUsersListByRank } from "@/actions/user.actions";
import InfiniteLeaderboard from "./leaderboard";

export default async function LeaderboardPage() {
  const users = await getUsersListByRank(0, 10);
  const forums = await getPaginatedForums(0, 5);
  const blogs = await getBlogPostsPaginated(0, 5, undefined, false);
  return (
    <div className="w-full">
      <HeadingPage
        title={"Leaderboard"}
        subtitle={"classement des utilisateurs GNDC"}
        subClassName={"max-sm:block"}
        descClassName={"mb-5"}
        withPattern={true}
        icon={
          <div className="p-4 bg-secondary text-white rounded-full flex items-center justify-center w-fit">
            <Trophy className="h-6 w-6" />
          </div>
        }
      />
      <main className="screen-wrapper py-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          <div className="lg:col-span-2 space-y-6">
            {/* Podium */}
            <InfiniteLeaderboard initialUsers={users} />
          </div>
          <div className="relative lg:col-span-1 sm:max-h-[calc(100vh-4rem)] lg:sticky lg:top-10 max-sm:max-h-none  ">
            <div className="absolute z-[10] bottom-0 inset-x-0 h-36 bg-gradient-to-t from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
            {/* <div className="absolute z-[10] top-0 inset-x-0 h-10 bg-gradient-to-b from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" /> */}
            <div className="w-full  space-y-5 scrollbar-hide h-full overflow-y-auto">
              <ListBrief forums={forums} />
              <ListBrief blogs={blogs} />
              {/* Ad Block */}
              <AdBlock />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
