import { notFound } from "next/navigation";
import React from "react";
import ImageWrapper from "@/components/imageWrapper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBlogPost } from "@/actions/blog.actions";

import PostDetail from "@/components/blogContent";
import Link from "next/link";
export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const post = await getBlogPost(slug as string);

  if (!post) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="bg-primary">
        <div className="relative screen-wrapper py-12 max-md:pb-[180px]">
          <div className="w-full gap-5 flex max-md:flex-wrap items-center justify-between">
            <div className="space-y-4">
              {/*<span className="inline-block text-purple-600 font-medium tracking-wide text-sm uppercase">
                Business
              </span>*/}
              <span className="text-gray-400"><Link href="..">&larr; Retour au publication</Link></span>
              <h1 className="max-md:w-full text-4xl md:text-5xl font-bold tracking-tight text-secondary">
                {post.title}
              </h1>
              <p className="text-lg text-gray-100">{post.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={post.author.image ?? ""}
                      alt={post.author.name!}
                    />
                    <AvatarFallback>
                      {post.author?.name!.slice(0, 2)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {post.author.name}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>
                        Posté le{" "}
                        {new Date(post.createdAt).toLocaleDateString("FR-fr", {
                          dateStyle: "long",
                        })}
                      </span>
                      {/*<span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" /> 5 min read
                      </span>
                      <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" /> 1.5k views
                      </span>
                      <span className="flex items-center">
                        <Heart className={`mr-1 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} /> {likes} likes
                      </span>*/}
                    </div>
                  </div>
                </div>
                {/*<div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleLike}>
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </div>*/}
              </div>
            </div>
            <div className="relative bg-gray-300 aspect-[5/3] max-md:absolute max-md:bottom-0 max-md:left-1/2 max-md:-translate-x-1/2 max-md:translate-y-1/2  max-md:w-[95%] max-md:h-[250px]  h-[400px] rounded-xl overflow-hidden flex items-center justify-center text-white">
              <ImageWrapper
                className="w-full object-cover h-full object-top "
                src={post.preview}
                hash={post.previewHash}
                width={1280}
                height={680}
                alt={post.description}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="screen-wrapper py-12 max-md:mt-[120px]">
        {/* Content */}
        <PostDetail post={post} />
        {/*<RelatedPosts />*/}
      </div>
    </div>
  );
}
