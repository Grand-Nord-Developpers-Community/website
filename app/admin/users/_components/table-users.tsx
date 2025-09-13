"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { type Column } from "@/components/datable/Datable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { deleteUser, getPaginatedUsers as pg } from "@/actions/user.actions";
import { toast } from "sonner";
import { formatRelativeTime } from "@/lib/utils";
import Avatar from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { getPaginatedUsers, getTotalUser } from "@/actions/queries/user";
import { useSession } from "@/components/auth/SessionProvider";
import { useDebounce } from "@/hooks/use-debounce";
import { Heading } from "@/components/ui/heading";
import { useConfirm } from "@omit/react-confirm-dialog";

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
  const page = Number(sp.get("page") ?? initialPage);
  const size = Number(sp.get("size") ?? initialSize);
  const key = getPaginatedUsers(page, size).queryKey;
  const [q, setQ] = React.useState("");
  const s = useDebounce<string>(q, 1000);
  const { user } = useSession();
  const { data, isLoading, isError, error } = useQuery(
    getPaginatedUsers(page, size, s)
  );
  const { data: total } = useQuery(getTotalUser());
  const rows = data ?? [];
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
  const confirm = useConfirm();

  const handeClick = async () => {
    const result = await confirm({
      title: "Êtes vous sûre de vouloir continuer?",
      description: "Cette action ne pas être refait.",
      cancelText: "Retour",
      cancelButton: {
        variant: "outline",
        className: "max-sm:mt-2",
      },
      confirmText: "Continuer",
      confirmButton: {
        variant: "destructive",
      },
    });
    if (result) {
      //toast.success("OK !!");
      handleConfirmDelete();
    }
  };
  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteMutation.mutate(selectedId);
    }
    setSelectedId(null);
  };

  const columns: Column<User[number]>[] = [
    {
      id: "Avatar",
      header: "Avatar",
      cell: (p) => <Avatar className="size-12" {...p} />,
      className: "w-[88px]",
    },
    {
      id: "Nom",
      header: "Nom",
      cell: (p) => (
        <span className="line-clamp-1">
          {p?.name} {user!.id === p.id && <b>(vous)</b>}
        </span>
      ),
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
      id: "Role",
      header: "role",
      cell: (p) => (
        <Badge variant={p.role.name === "admin" ? "secondary" : "default"}>
          {p.role.name}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: <span className="sr-only">Actions</span>,
      cell: (p) => (
        <div className="flex justify-end gap-2">
          <Button
            size={"sm"}
            variant={"destructive"}
            disabled={p.id === user?.id}
            onClick={async () => {
              setSelectedId(p.id);
              await handeClick();
            }}
          >
            supprimer
          </Button>
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
      <Heading
        title="Utilisateurs"
        description="liste totales des utilisateurs"
      />
      <DataTable<User[number]>
        rows={data}
        total={total}
        page={page}
        className="mt-5"
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
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">{formatRelativeTime(p.createdAt)}</div>
              <div className="flex gap-2">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  disabled={p.id === user?.id}
                  onClick={async () => {
                    setSelectedId(p.id);
                    await handeClick();
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
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
    </>
  );
}
