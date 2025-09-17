import { formatRelativeTime } from "@/lib/utils";
import { PaginatedBlog, PaginatedForum } from "@/types";
import React from "react";
import { CellAction } from "./tables/cell-action";
import Image from "next/image";
import Avatar from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
function Content({ data: p }: { data: PaginatedForum[number] }) {
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="min-w-0 space-y-2">
            <div className="truncate  font-medium max-w-[10rem] md:max-w-sm">{p.title}</div>
            <p className="line-clamp-2 text-sm  ">{p.textContent}</p>
            <div className="text-xs text-gray-500">
              {formatRelativeTime(p.createdAt)} · {p.replies.length} réponses
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Avatar {...p.author} />
            <p className="text-xs">{p.author.name}</p>
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
