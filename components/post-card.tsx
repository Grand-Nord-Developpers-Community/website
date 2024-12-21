import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {  MoreVertical, Pencil, Trash2 } from 'lucide-react'
import {
  formatRelativeTime
} from "@/lib/utils"
import Link from "next/link"
interface Post {
  id: string;
  slug?:string;
  type:"blog"|"forum"
  title: string;
  content?: string;
  date: Date;
  onEdit: (id: string) => void, onDelete: (id: string) => void 
}

export default function PostCard({ id,title,slug,type,content,date, onEdit, onDelete }: Post) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2 hover:text-secondary"><Link href={`${type==="blog"?`/blog/${slug}`:`/forum/${id}`}`}>{title}</Link></CardTitle>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>Posté {formatRelativeTime(date)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{content}</p>
      </CardContent>
    </Card>
  )
}

