"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { type Column } from "@/components/datable/Datable";
//import EditPostDialog from "./EditPostDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useQuery as useRQ } from "@tanstack/react-query";
import { AlertModal } from "@/components/modal/alert-modal";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  deleteUser,
  getPaginatedUsers as pg,
  getTotalUsers,
} from "@/actions/user.actions";
import { toast } from "sonner";
import { formatRelativeTime } from "@/lib/utils";
import Avatar from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { getPaginatedUsers, getTotalUser } from "@/actions/queries/user";
import { useSession } from "@/components/auth/SessionProvider";

export type User = Awaited<ReturnType<typeof pg>>;
export default function MyPostsTablePage({
  initialPage = 0,
  initialSize = 5,
}: {
  initialPage?: number;
  initialSize?: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const page = Number(sp.get("page") ?? initialPage);
  const size = Number(sp.get("size") ?? initialSize);
  const key = getPaginatedUsers(page, size).queryKey;
  const { user } = useSession();
  const { data, isLoading, isError, error } = useQuery(
    getPaginatedUsers(page, size)
  );
  const { data: total } = useQuery(getTotalUser());
  const rows = data ?? [];
  // const total = data?.length ?? 0;

  // client-side search/filter (applied to current page only; if you want server search, expose it on the backend)
  const [q, setQ] = React.useState("");
  const [isCompleted, setIsCompleted] = React.useState<boolean | undefined>(
    undefined
  );
  const [subId, setSubId] = React.useState<string | undefined>();

  const filtered = React.useMemo(() => {
    const nq = q.trim().toLowerCase();
    return rows?.filter((p) => {
      const t = `${p.name} ${p.username}`.toLowerCase();
      const qmatch = nq ? t.includes(nq) : true;
      //const c = isCompleted ? p.isCompletedProfile : false;
      const isNotCurrentUser = p.id !== user?.id;
      return qmatch && isNotCurrentUser;
    });
  }, [rows, q, isCompleted]);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteUser(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: key,
      });

      const prevData = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old;
        return old?.content?.filter((p: User[number]) => p.id !== id!);
      });

      return { prevData };
    },
    onError: (err, id, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(key, context.prevData);
      }
      toast.error("Échec de la suppression : " + err + id);
    },
    onSuccess: () => {
      toast.success("Post supprimé");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: key,
      });
    },
  });

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteMutation.mutate(selectedId);
    }
    setOpenModal(false);
    setSelectedId(null);
  };

  const columns: Column<User[number]>[] = [
    {
      id: "image",
      header: "Visuel",
      cell: (p) => <Avatar className="size-12" {...p} />,
      className: "w-[88px]",
    },
    {
      id: "title",
      header: "Titre",
      cell: (p) => <span className="line-clamp-1">{p?.name}</span>,
      className: "max-w-[260px]",
    },
    {
      id: "XP",
      header: "xp",
      cell: (p) => (
        <span className="line-clamp-1">{p?.experiencePoints} XP</span>
      ),
      className: "max-w-[260px]",
    },
    {
      id: "Date",
      header: "Inscrit",
      cell: (p) => formatRelativeTime(p?.createdAt),
    },
    {
      id: "Profil",
      header: "profil complet",
      cell: (p) => (
        <Badge variant={p.isCompletedProfile ? "secondary" : "destructive"}>
          {p.isCompletedProfile ? "Complete" : "Incomplete"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: <span className="sr-only">Actions</span>,
      cell: (p) => (
        <div className="flex justify-end gap-2">
          {/* <Link href={`/announce/${p.id}/edit`}>
            <Button variant="ghost">Editer</Button>
          </Link> */}
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={() => {
              setSelectedId(p.id);
              setOpenModal(true);
            }}
          >
            supprimer
          </Button>
          {/* <EditPostDialog utilisateurs={p} token={token} pageSize={size} /> */}
          <Link target="_blank" href={`/user/${p.username}`}>
            <Button variant="ghost">Ouvrir</Button>
          </Link>
        </div>
      ),
      className: "text-right",
    },
  ];

  const toolbar = (
    <>
      <Input
        placeholder="Rechercher…"
        className="max-w-none w-full sm:max-w-sm"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {/* <Select
        value={catId ?? ""}
        onValueChange={(v) => setCatId(v || undefined)}
      >
        <SelectTrigger className="grow">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          {cats?.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      {/* <Select
        value={subId ?? ""}
        onValueChange={(v) => setSubId(v || undefined)}
        disabled={!catId || subsLoading}
      >
        <SelectTrigger className="grow">
          <SelectValue placeholder="Sous-catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          {subsByCat?.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      {/* <div className="ml-auto text-sm text-neutral-600">
        {filtered.length} / {rows.length} (page) • {total} total
      </div> */}
    </>
  );

  const go = (next: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(next));
    params.set("size", String(size));
    router.push(`/admin/users?${params.toString()}`);
  };

  const goSize = (next: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", "0");
    params.set("size", String(next));
    router.push(`/admin/users?${params.toString()}`);
  };

  return (
    <>
      <DataTable<User[number]>
        rows={filtered}
        total={total}
        page={page}
        pageSize={size}
        onPageChange={go}
        onPageSizeChange={goSize}
        columns={columns}
        getRowId={(p) => p.id}
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as Error)?.message}
        toolbar={toolbar}
        empty={<span>Aucun utilisateurs pour l’instant.</span>}
        renderCard={(p) => (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-16 overflow-hidden rounded">
                <Avatar className="size-12" {...p} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{p.username}</div>
                {/* <div className="text-xs text-neutral-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </div> */}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">{formatRelativeTime(p.createdAt)}</div>
              <div className="flex gap-2">
                {/* <Link href={`/announce/${p.id}/edit`}>
                  <Button variant="outline" size={"icon"}>
                    <Edit className="size-4" />
                  </Button>
                </Link> */}
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => {
                    setSelectedId(p.id);
                    setOpenModal(true);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
                {/* <EditPostDialog utilisateurs={p} token={token} pageSize={size} /> */}
                <Link target="_blank" href={`/user/${p.username}`}>
                  <Button variant="outline" size="icon" className="px-2 w-fit">
                    Ouvrir
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      />
      <AlertModal
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setOpenModal(false);
          setSelectedId(null);
        }}
        isOpen={openModal}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
