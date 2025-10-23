import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MessageCircle,
  MoreVertical,
  Pencil,
  ThumbsUp,
  Timer,
  Trash2,
} from "lucide-react";
import { calculateReadingTime, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";
import { ChipsTag } from "./ui/chips";
interface Post {
  id: string;
  slug?: string;
  tags?: string | null;
  type: "blog" | "forum";
  title: string;
  views?: number;
  content?: string;
  replies?: number;
  likes?: number;
  isDraft?: boolean;
  date: Date;
  rawContent?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PostCard({
  id,
  title,
  slug,
  tags,
  type,
  content,
  date,
  isDraft,
  views,
  rawContent,
  likes,
  replies,
  onEdit,
  onDelete,
}: Post) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2 hover:text-secondary">
            <Link
              href={`${type === "blog" ? `/blog/${slug}${isDraft ? "/preview" : ""}` : `/forum/${id}`}`}
            >
              {title}
            </Link>
          </CardTitle>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>
          {!isDraft && <p>Posté {formatRelativeTime(date)}</p>}
          {type === "blog" && isDraft && (
            <span className="p-1 px-2 bg-secondary text-white text-xs rounded-sm">
              Brouillon
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{content}</p>
        {!isDraft && (
          <div className="flex gap-4 items-center mt-3 text-gray-500">
            <span className="flex gap-1 items-center">
              <Eye className="w-4 h-4" />
              {views ?? 0}
            </span>
            <span className="flex gap-1 items-center">
              <MessageCircle className="w-4 h-4" />
              {replies}
            </span>
            {type === "blog" && (
              <span className="flex gap-1 items-center">
                <Timer className="w-4 h-4" />
                {calculateReadingTime(rawContent!)} min
              </span>
            )}
            <span className="flex gap-1 items-center">
              <ThumbsUp className="w-4 h-4" />
              {likes ?? 0}
            </span>
          </div>
        )}
        {tags && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.split(',').map((tag, index) => (
              <ChipsTag key={index} tag={tag} className="" onClick={() => {console.log(tag + ' is clicked')}}/>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
