"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export default function CommentSection() {
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', content: 'Great article! Very informative.', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, author: 'Jane Smith', content: 'I learned a lot from this. Thanks for sharing!', avatar: '/placeholder.svg?height=40&width=40' },
  ])
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, author: 'You', content: newComment, avatar: '/placeholder.svg?height=40&width=40' }])
      setNewComment('')
    }
  }

  return (
    <div className="pt-4 border-border border-t mt-4">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{comment.author}</h4>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full"
        />
        <Button type="submit">Post Comment</Button>
      </form>
    </div>
  )
}

