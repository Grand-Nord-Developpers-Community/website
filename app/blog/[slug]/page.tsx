"use client"
import React from "react"
import { useState } from 'react'
import Image from "next/image"
import { Twitter, Facebook, LinkedinIcon as LinkedIn, Instagram, Globe, Eye, Clock, Calendar, Edit, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CommentSection from "@/components/comment-section"
import RelatedPosts from "@/components/related-posts"

export default function BlogDetails() {
  const [likes, setLikes] = useState(128) // Initial like count
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block text-purple-600 font-medium tracking-wide text-sm uppercase">
                Business
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Business Loans That Are Fast In Services
              </h1>
              <p className="text-lg text-gray-600">
                Complete guide to getting business loans quickly and efficiently. Learn about the best practices and requirements for fast loan approval.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <time dateTime="2024-01-01">Jan 1, 2024</time>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" /> 5 min read
                      </span>
                      <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" /> 1.5k views
                      </span>
                      <span className="flex items-center">
                        <Heart className={`mr-1 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} /> {likes} likes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleLike}>
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-teal-500 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-20 bg-repeat"></div>
              <div className="relative h-full flex items-center justify-center p-8 text-white">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Business<br />Loans
                  </h2>
                  <p className="mt-2 text-lg">Fast Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex gap-6">
              {/* Share Buttons */}
              <div className="hidden lg:flex flex-col items-center space-y-4 sticky top-24 h-fit">
                <Button variant="outline" size="icon" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on Facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                  <LinkedIn className="h-4 w-4" />
                </Button>
              </div>

              {/* Article Content */}
              <div className="space-y-6 flex-grow">
                <p className="text-gray-600">
                  Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 
                  1500s, when an unknown printer took a galley of type and scrambled it to 
                  make a type specimen book.
                </p>
                <p className="text-gray-600">
                  Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 
                  1500s, when an unknown printer took a galley of type and scrambled it to 
                  make a type specimen book.
                </p>
                <blockquote className="border-l-4 border-purple-600 pl-4 py-2 my-8">
                  <p className="text-lg italic text-gray-800">
                    Lorem ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </blockquote>
                
                {/* Mobile Share Buttons */}
                <div className="flex lg:hidden justify-center space-x-4 pt-4">
                  <Button variant="outline" size="icon" aria-label="Share on Twitter">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Share on Facebook">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                    <LinkedIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <CommentSection />

            {/* Related Posts */}
            <RelatedPosts />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] ">
              {/* About Me */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">About Me</h3>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Sandra Milton" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <h4 className="mt-4 font-semibold">Sandra Milton</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    I am Sandra a Web/UI/UX Designer and Developer
                  </p>
                  <div className="flex gap-4 mt-4">
                    <a href="#" className="text-gray-600 hover:text-purple-600">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-purple-600">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-purple-600">
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Popular Feeds */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Popular Feeds</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex gap-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="Post thumbnail"
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div>
                        <h5 className="font-medium">Lorem ipsum is simply</h5>
                        <p className="text-sm text-gray-600">dummy text</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad Block */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Advertisement</h3>
                <div className="bg-gray-100 h-40 flex items-center justify-center rounded">
                  <p className="text-gray-500">Ad Space</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

