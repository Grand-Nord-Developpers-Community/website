import { formatRelativeTime } from "@/lib/utils";
import { PaginatedBlog } from "@/types";
import React from "react";
import { CellAction } from "./tables/cell-action";
import Image from "next/image";
import Avatar from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
function Content({ data: p }: { data: PaginatedBlog[number] }) {
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative aspect-video w-32 bg-gray-50 ">
            <Image
              src={p.preview}
              alt={p.title}
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <div className="truncate text-sm font-medium max-w-sm">{p.title}</div>
            <Badge variant={p.isDraft ? "default" : "secondary"}>
              {p.isDraft ? "En cours" : "publier"}
            </Badge>
            <div className="text-xs text-gray-500">
              {formatRelativeTime(p.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Avatar {...p.author} />
            <p>{p.author.name}</p>
          </div>
          <div className="flex gap-2">
            <CellAction data={p} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
