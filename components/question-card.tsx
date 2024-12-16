import Image from "next/image"
import Link from "next/link"
import { ArrowBigUp, ArrowBigDown, Eye, MessageSquare } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface QuestionCardProps {
  id: string
  title: string
  author: {
    name: string
    avatar: string
  }
  stats: {
    answers: number
    upvotes: number
    downvotes: number
    views: number
  }
  tags: string[]
  timeAgo: string
  image?: string
}

export function QuestionCard({
  id,
  title,
  author,
  stats,
  tags,
  timeAgo,
  image
}: QuestionCardProps) {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Link href={`/users/${author.name}`}>
          <Image
            src={author.avatar}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div className="flex-1 space-y-2">
          <Link href={`/questions/${id}`} className="block">
            <h2 className="text-lg font-semibold hover:text-blue-600">{title}</h2>
          </Link>
          {image && (
            <Image
              src={image}
              alt="Question image"
              width={200}
              height={150}
              className="rounded-md"
            />
          )}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-blue-50">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ArrowBigUp className="h-5 w-5 text-green-500 cursor-pointer" />
              <span>{stats.upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowBigDown className="h-5 w-5 text-red-500 cursor-pointer" />
              <span>{stats.downvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {stats.answers} Answers
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {stats.views} Views
            </div>
            <span className="ml-auto">Asked {timeAgo}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

