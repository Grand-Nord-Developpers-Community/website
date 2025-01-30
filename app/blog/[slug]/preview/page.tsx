import { notFound } from "next/navigation";
import React from "react";
import ImageWrapper from "@/components/imageWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBlogPostPreview } from "@/actions/blog.actions";
import PostDetail from "@/components/blogContent";
import Link from "next/link";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import { auth } from "@/lib/auth";
import { calculateReadingTime } from "@/lib/utils";

export const revalidate = 60;
export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const post = await getBlogPostPreview(slug as string);
  const { user } = await auth();
  if (!post) {
    notFound();
  }

  const isUserAuthorized =
    user?.id === post.authorId ||
    user?.role === "admin" ||
    user?.role === "manager";

  if (!isUserAuthorized) {
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
              <span className="text-gray-400">
                <Link href="..">&larr; Retour au publication</Link>
              </span>
              <h1 className="max-md:w-full text-4xl max-sm:text-2xl md:text-5xl font-bold tracking-tight text-secondary">
                {post.title}
              </h1>
              {post.isDraft && (
                <p className="text-white bg-secondary p-2 mt-5 w-fit text-sm">
                  Brouillon
                </p>
              )}
              <p className="text-lg text-gray-100 max-sm:text-base">
                {post.description}
              </p>
              <div className="flex max-sm:flex-col  sm:items-center sm:space-x-6">
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
                      <div className="max-sm:hidden flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />{" "}
                          {calculateReadingTime(post.content)} min lire
                        </span>
                      </div>
                      <span className="flex items-center">
                        {/*<Heart className={`mr-1 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} /> {likes} likes*/}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sm:hidden mt-5 flex justify-center items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />{" "}
                    {calculateReadingTime(post.content)} min lire
                  </span>
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
            <div className="relative bg-gray-300 aspect-[6/3] max-md:absolute max-md:bottom-0 max-md:left-1/2 max-md:-translate-x-1/2 max-md:translate-y-1/2  max-md:w-[95%] max-md:h-[250px]  h-[400px] rounded-xl overflow-hidden flex items-center justify-center text-white">
              <ImageWrapper
                className="w-full object-cover h-full object-center "
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
        <PostDetail post={post} user={user} />
        {/*<RelatedPosts />*/}
      </div>
    </div>
  );
}
