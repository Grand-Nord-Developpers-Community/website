import { formatRelativeTime } from "@/lib/utils";
import { PaginatedBlog, User } from "@/types";
import React from "react";
import { CellAction } from "./tables/cell-action";
import Image from "next/image";
import Avatar from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
function Content({ data: p }: { data: User[number] }) {
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Avatar className="size-16" {...p} />
          <div className="min-w-0 space-y-2">
            <div className="truncate  font-medium ">{p.name}</div>
            <Badge
              variant={p.role.name === "manager" ? "default" : "secondary"}
            >
              {p.role.name}
            </Badge>
            <div className="text-xs text-gray-500">{p.experiencePoints} xp</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            inscrit {formatRelativeTime(p.createdAt)}
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
