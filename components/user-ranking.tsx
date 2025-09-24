import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { getUsersListByRank } from "@/actions/user.actions";
import { formatRelativeTime } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import Avatar from "./avatar";
import { Button } from "./ui/button";
export async function UserRanking() {
  const users = await getUsersListByRank();
  return (
    <Card className="space-y-4 my-4 p-4 relative">
      <div className="absolute z-[10] bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
      <Button
        variant={"secondary"}
        asChild
        className="absolute z-[15] bottom-5 rounded-full left-1/2 text-sm  -translate-x-1/2 shadow-sm"
        size={"sm"}
      >
        <Link href="/leaderboard">Voir tout le classement</Link>
      </Button>
      <h2 className="font-bold text-lg">Top Utilisateur</h2>
      <div className="space-y-4">
        {users &&
          users.slice(0, 5).map((user, index) => (
            <div key={user.name} className="flex items-center gap-3">
              <Link href={`#`}>
                <Avatar className="bg-gray-50" {...user} />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={user.username ? `/user/${user.username}` : "#"}
                  className="font-medium hover:text-secondary line-clamp-1"
                >
                  {user.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  Rejoint {formatRelativeTime(new Date(user.createdAt))}
                </p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Trophy className="h-4 w-4" />
                {user.experiencePoints}
              </div>
            </div>
          ))}
        {!users && (
          <div className="bg-gray-100 h-40 flex items-center justify-center rounded">
            <p className="text-gray-500">Erreur chargement ...</p>
          </div>
        )}
      </div>
    </Card>
  );
}
