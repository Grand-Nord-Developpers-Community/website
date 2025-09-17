"use client";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { PaginatedBlog } from "@/types";

import { Badge } from "@/components/ui/badge";
import Avatar from "@/components/avatar";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import { Column } from "@/components/datable/Datable";

export const columns: Column<PaginatedBlog[number]>[] = [
  {
    id: "preview",
    header: "IMAGE",
    cell: (row) => {
      return (
        <div className="relative aspect-video bg-gray-50 ">
          <Image
            src={row.preview}
            alt={row.title}
            fill
            className="rounded-lg object-contain"
          />
        </div>
      );
    },
  },
  {
    id: "title",
    header: "Titre",
    cell: (row) => {
      return <>{row.title}</>;
    },
  },
  {
    id: "createdAt",
    header: "Date",
    cell: (row) => {
      const r = row.createdAt;
      return <>{formatRelativeTime(r)}</>;
    },
  },
  {
    id: "author",
    header: "Auteur",
    cell: (row) => {
      const r = row.author;
      return (
        <Link href={`/user/${r.username}`} className="flex items-center gap-5">
          <Avatar className="size-10 " {...r} />
          <span className="hidden sm:block">{r.name}</span>
        </Link>
      );
    },
  },
  {
    id: "isDraft",
    header: "etat",
    cell: (row) => {
      const isDraft = row.isDraft;
      return (
        <Badge variant={isDraft ? "default" : "secondary"}>
          {isDraft ? "En cours" : "publier"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: (row) => <CellAction data={row} />,
  },
];
