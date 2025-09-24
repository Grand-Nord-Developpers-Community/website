"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Crown, Trophy, Loader2 } from "lucide-react";
import Avatar from "@/components/avatar";
import clsx from "clsx";
import { getUsersListByRank } from "@/actions/user.actions";
import { rankStyle } from "@/constants/data";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type User = Awaited<ReturnType<typeof getUsersListByRank>>;
interface LeaderboardResponse {
  //@ts-ignore
  users: User[number];
  hasMore: boolean;
  nextCursor?: number;
}

interface LeaderboardResponse {
  //@ts-ignore
  users: User[number];
  hasMore: boolean;
  nextCursor?: number;
}
function LeaderboardSkeletonRow() {
  return (
    <div className="flex items-center justify-between py-4 px-4 rounded-xl border border-border shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Position number */}
        <div className="w-6">
          <Skeleton className="h-6 w-4" />
        </div>

        {/* Avatar */}
        <Skeleton className="w-12 h-12 rounded-full" />

        {/* User info */}
        <div className="space-y-2">
          {/* Name */}
          <Skeleton className="h-4 w-24 sm:w-32" />
          {/* Username */}
          <Skeleton className="h-3 w-16 sm:w-20" />
        </div>
      </div>

      {/* XP section */}
      <div className="flex items-center space-x-2">
        {/* Trophy icon placeholder */}
        <Skeleton className="h-5 w-5" />
        {/* XP text */}
        <Skeleton className="h-5 w-12" />
      </div>
    </div>
  );
}
// API function to fetch paginated users
async function fetchLeaderboardUsers({
  pageParam = 0,
}): Promise<LeaderboardResponse> {
  const response = await fetch(`/api/leaderboard?offset=${pageParam}&limit=5`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

interface InfiniteLeaderboardProps {
  initialUsers?: User;
}

export default function InfiniteLeaderboard({
  initialUsers,
}: InfiniteLeaderboardProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboardUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    initialData: {
      pages: [
        {
          users: initialUsers || [],
          hasMore: initialUsers ? initialUsers.length >= 10 : false,
          nextCursor: initialUsers
            ? initialUsers.length >= 10
              ? 2
              : undefined
            : undefined,
        },
      ],
      pageParams: [0],
    },
  });

  // Fetch next page when in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all users from all pages
  const allUsers = data?.pages.flatMap((page) => page.users) || [];

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading leaderboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Podium - Show top 3 */}
      <div className="flex items-end justify-center my-12">
        {allUsers.slice(0, 3).map((user, i) => {
          const position = i + 1;
          return (
            <div
              key={user.username}
              className={clsx(
                `flex flex-col items-center ${position === 1 ? "mx-4 sm:mx-16 -mt-6" : "mx-2"}`,
                {
                  "order-1": position === 2,
                  "order-2": position === 1,
                  "order-3": position === 3,
                }
              )}
            >
              {/* Crown for 1st place */}
              {position === 1 && (
                <div className="mb-2">
                  <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </div>
              )}

              {/* Avatar */}
              <div className={`relative ${position === 1 ? "mb-4" : "mb-3"}`}>
                <Avatar
                  className={clsx(
                    `${position === 1 ? "w-20 h-20" : "w-16 h-16"} border-4 ${rankStyle[i].border}`
                  )}
                  {...user}
                />

                {/* Position indicator circle */}
                <div
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${rankStyle[i].bg} ${rankStyle[i].border} border-2 flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">
                    {position}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h3
                className={`font-semibold truncate max-sm:max-w-28 mb-1 text-center ${position === 1 ? "text-lg" : "text-base"}`}
              >
                {user.name}
              </h3>

              {/* Score */}
              <div
                className={`font-semibold ${position === 1 ? "text-2xl text-yellow-400" : position === 2 ? "text-xl text-cyan-400" : "text-xl text-green-400"}`}
              >
                {user.experiencePoints} xp
              </div>

              {/* Username */}
              {/* <p className="text-slate-400 truncate max-w-28 text-sm">
                @{user.username}
              </p> */}
            </div>
          );
        })}
      </div>

      {/* Leaderboard List - Starting from position 4 */}
      <div className="space-y-1">
        {allUsers.slice(3).map((user, i) => (
          <div
            key={user.username}
            className="flex items-center justify-between py-4 px-2 sm:px-4 rounded-xl border border-border shadow-sm"
          >
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-secondary font-semibold text-lg w-6">
                {i + 4}
              </span>
              <Avatar className="w-12 h-12" {...user} />
              <Link href={`/user/${user.username}`}>
                <p className="font-semibold text-primary truncate max-sm:max-w-48">
                  {user.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  @{user.username}
                </p>
              </Link>
            </div>
            <div className="flex items-center text-lg space-x-2">
              <Trophy className="size-5 text-yellow-400" />
              <span className="text-yellow-400">
                {user.experiencePoints} xp
              </span>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isFetchingNextPage && (
          <>
            {Array.from({ length: 3 }, (_, i) => (
              <LeaderboardSkeletonRow key={i} />
            ))}
          </>
        )}

        {/* Intersection observer target */}
        {hasNextPage && <div ref={ref} className="h-4 w-full" />}

        {/* End of results indicator */}
        {!hasNextPage && allUsers.length > 10 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            fin de la listes des utilisateurs
          </div>
        )}
      </div>
    </div>
  );
}
