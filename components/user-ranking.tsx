import Image from "next/image"
import Link from "next/link"
import { Trophy } from 'lucide-react'

interface TopUser {
  name: string
  avatar: string
  points: number
  joinDate: string
}

export function UserRanking({ users }: { users: TopUser[] }) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Top Users of the Week</h2>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={user.name} className="flex items-center gap-3">
            <Link href={`/users/${user.name}`}>
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/users/${user.name}`} className="font-medium hover:text-blue-600">
                {user.name}
              </Link>
              <p className="text-sm text-muted-foreground">Since {user.joinDate}</p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Trophy className="h-4 w-4" />
              {user.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

