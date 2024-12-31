"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function AskQuestionForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Submitting question:", { title, content })
    // For demonstration, we'll just log and reset the form
    setTitle("")
    setContent("")
    // In a real application, you might redirect to the new question page
    // router.push(`/questions/${newQuestionId}`)
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question-title">Question Title</Label>
          <Input
            id="question-title"
            placeholder="What's your question? Be specific."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="question-content">Question Details</Label>
          <Textarea
            id="question-content"
            placeholder="Provide more context or details about your question..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[200px]"
          />
        </div>
        <Button type="submit" className="w-full">
          Post Your Question
        </Button>
      </form>
    </Card>
  )
}

