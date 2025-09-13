"use client";
import { Product } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { PaginatedBlog } from "@/types";

import { Badge } from "@/components/ui/badge";
import Avatar from "@/components/avatar";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

export const columns: ColumnDef<PaginatedBlog[number]>[] = [
  {
    accessorKey: "preview",
    header: "IMAGE",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-video ">
          <Image
            src={row.getValue("preview")}
            alt={row.getValue("name")}
            fill
            className="rounded-lg object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const r = row.original.createdAt;
      return <>{formatRelativeTime(r)}</>;
    },
  },
  {
    accessorKey: "author",
    header: "Auteur",
    cell: ({ row }) => {
      const r = row.original.author;
      return (
        <Link href={`/user/${r.username}`} className="flex items-center gap-5">
          <Avatar className="size-10 " {...r} />
          <span className="hidden sm:block">{r.name}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "isDraft",
    header: "etat",
    cell: ({ row }) => {
      const isDraft = row.getValue("isDraft");
      return (
        <Badge variant={isDraft ? "default" : "secondary"}>
          {isDraft ? "En cours" : "publier"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
