import Link from "next/link";
import { Trophy } from "lucide-react";
import { getNewUsersList } from "@/actions/user.actions";
import { formatRelativeTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default async function NewUsers() {
  const users = await getNewUsersList();
  return (
    <div className="space-y-4">
      {users &&
        users.slice(0, 5).map((user, index) => (
          <div key={user.name} className="flex items-center gap-3">
            <Link href={`#`}>
              <Avatar>
                <AvatarImage src={user.image || ""} alt="Author avatar" />
                <AvatarFallback>
                  {user.name?.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                href={`#`}
                className="font-medium hover:text-blue-600 line-clamp-1"
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
  );
}
