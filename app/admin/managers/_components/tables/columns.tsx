"use client";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { PaginatedBlog, User } from "@/types";

import { Badge } from "@/components/ui/badge";
import Avatar from "@/components/avatar";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import { Column } from "@/components/datable/Datable";

export const columns: Column<User[number]>[] = [
  {
    id: "avatar",
    header: "IMAGE",
    cell: (row) => {
      return <Avatar className="size-12" {...row} />;
    },
  },
  {
    id: "Nom",
    header: "Titre",
    cell: (row) => {
      return <>{row.name}</>;
    },
  },
  {
    id: "Inscrit",
    header: "inscrit",
    cell: (row) => {
      const r = row.createdAt;
      return <>{formatRelativeTime(r)}</>;
    },
  },
  {
    id: "XP",
    header: "xp",
    cell: (p) => <span className="line-clamp-1">{p?.experiencePoints} XP</span>,
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
    header: "actions",
    cell: (row) => <CellAction data={row} />,
  },
];
