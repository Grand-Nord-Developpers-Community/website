// components/user/FollowListBody.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getInfiniteUsers } from "@/actions/queries/user";
import { User } from "@/types";
import Avatar from "@/components/avatar";
import { useUpdateUserRole } from "@/actions/mutations/user";
import { toast } from "sonner";

type Mode = "followers" | "followings";

export function UserListBody({
  pageSize = 5,
  onUserClick,
}: {
  pageSize?: number;
  onUserClick?: (id: string) => void;
}) {
  // client search over loaded items
  const [q, setQ] = React.useState("");
  const debounced = useDebounced(q, 200);
  const inf = useInfiniteQuery(getInfiniteUsers(pageSize, debounced, ["user"]));

  const allUsers = inf.data?.pages.flatMap((page) => page) ?? [];

  // infinite sentinel
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && inf.hasNextPage && !inf.isFetchingNextPage)
          inf.fetchNextPage();
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inf.hasNextPage, inf.isFetchingNextPage, inf.fetchNextPage]);

  return (
    <>
      {/* search */}
      <div className="mb-3">
        <Input
          placeholder={"Rechercher un utilisateur"}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* list */}
      <div className="max-h-[65vh] overflow-auto rounded border">
        {inf.isPending ? (
          <SkeletonList rows={3} />
        ) : allUsers.length === 0 ? (
          <div className="p-6 text-center text-sm text-neutral-500">
            Aucun résultat.
          </div>
        ) : (
          <>
            <ul className="divide-y">
              {allUsers.map((u) => (
                <Row key={u.id} u={u} onUserClick={onUserClick} />
              ))}
            </ul>
            <div ref={sentinelRef} />
            {inf.isFetchingNextPage && <SkeletonList rows={3} />}
            {!inf.hasNextPage && allUsers.length > 0 && (
              <div className="p-3 text-center text-xs text-neutral-500">
                Fin de la liste
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Row({
  u,
  onUserClick,
}: {
  u: User[number];
  onUserClick?: (id: string) => void;
}) {
  const updateUserRoleMutation = useUpdateUserRole();

  const handleAddUser = async () => {
    updateUserRoleMutation.mutate({
      userId: u.id,
      role: "manager",
    });
  };
  return (
    <li className="flex items-center gap-3 p-3">
      <Avatar {...u} className="size-10" />
      <div className={cn("flex-1 text-left")}>
        <div className="truncate text-sm font-medium">{u.name}</div>
        <div className="truncate text-xs text-neutral-500">
          {u.experiencePoints} xp
        </div>
      </div>
      <Button
        disabled={updateUserRoleMutation.isPending}
        onClick={async () => await handleAddUser()}
      >
        Ajouter
      </Button>
    </li>
  );
}

function SkeletonList({ rows = 6 }: { rows?: number }) {
  return (
    <ul className="divide-y">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 p-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="flex-1">
            <div className="mb-1 h-4 w-1/2 rounded bg-muted" />
            <div className="h-3 w-1/3 rounded bg-muted" />
          </div>
          <div className="h-9 w-20 rounded bg-muted" />
        </li>
      ))}
    </ul>
  );
}

function useDebounced<T>(value: T, delay = 250) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
