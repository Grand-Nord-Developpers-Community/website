"use client";
import { CellAction } from "./cell-action";
import { PaginatedForum } from "@/types";

import Avatar from "@/components/avatar";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import { Column } from "@/components/datable/Datable";
//@ts-ignore
export const columns: Column<PaginatedForum[number]>[] = [
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
    id: "reponse",
    header: "reponse",
    cell: (row) => {
      return <p>{row.replies.length} réponses</p>;
    },
  },
  ,
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
    id: "actions",
    header: "actions",
    cell: (row) => <CellAction data={row} />,
  },
];
