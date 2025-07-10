import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { getUsersListByRank } from "@/actions/user.actions";
import { formatRelativeTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
export async function UserRanking() {
  const users = await getUsersListByRank();
  return (
    <Card className="space-y-4 my-4 p-4">
      <h2 className="font-bold text-lg">Top Utilisateur</h2>
      <div className="space-y-4">
        {users &&
          users.slice(0, 5).map((user, index) => (
            <div key={user.name} className="flex items-center gap-3">
              <Link href={`#`}>
                <Avatar className="bg-gray-50">
                  <AvatarImage
                    src={user.image || `/api/avatar?username=${user.username}`}
                    alt="Author avatar"
                  />
                  <AvatarFallback>
                    {user.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
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
