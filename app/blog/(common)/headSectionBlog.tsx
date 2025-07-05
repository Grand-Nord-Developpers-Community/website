import type { Post } from "@/components/blogContent";
import ImageWrapper from "@/components/imageWrapper";
import { calculateReadingTime } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Edit, Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import type { SessionUser } from "@/lib/db/schema";
function headSectionBlog({
  post,
  views = 0,
  likes = 0,
  user,
}: {
  post: Post;
  views?: number;
  likes?: number;
  user: SessionUser | null;
}) {
  return (
    <div className="bg-primary">
      <div className="relative screen-wrapper py-12 max-md:pb-[180px]">
        <div className="w-full gap-5 flex max-md:flex-wrap items-center justify-between">
          <div className="space-y-4">
            <span className="text-gray-400">
              <Link href="..">&larr; Retour au publication</Link>
            </span>
            <h1 className="max-md:w-full text-4xl max-sm:text-2xl md:text-5xl font-bold tracking-tight text-secondary">
              {post!.title}
            </h1>
            {post!.isDraft && (
              <div className="flex gap-2 items-center mt-5">
                <div className="text-white bg-secondary p-2 max-sm:p-2.5  w-fit text-sm max-sm:text-xs">
                  Brouillon
                </div>
                {user && user.id == post?.authorId && (
                  <Button
                    variant="outline"
                    className="rounded-none max-sm:p-2"
                    size="sm"
                    asChild
                  >
                    <Link href={`/blog/${post!.slug}/edit`}>
                      <Edit className="mr-2 h-4 w-4 max-sm:w-1 max-sm:h-1" />{" "}
                      <span className="max-sm:text-xs">Editer</span>
                    </Link>
                  </Button>
                )}
              </div>
            )}
            <p className="text-lg text-gray-100 max-sm:text-base">
              {post!.description}
            </p>
            <div className="flex max-sm:flex-col  sm:items-center sm:space-x-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={post!.author.image ?? ""}
                    alt={post!.author.name!}
                  />
                  <AvatarFallback>
                    {post!.author?.name!.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">
                    {post!.author.name}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>
                      Posté le{" "}
                      {new Date(post!.createdAt).toLocaleDateString("FR-fr", {
                        dateStyle: "long",
                      })}
                    </span>
                    <div className="max-sm:hidden flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />{" "}
                        {calculateReadingTime(post!.content)} min lire
                      </span>
                      {!post!.isDraft && (
                        <>
                          <span className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />{" "}
                            {Intl.NumberFormat("en-US", {
                              notation: "compact",
                            }).format(views)}{" "}
                            vues
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="mr-1 h-4 w-4" />{" "}
                            {Intl.NumberFormat("en-US", {
                              notation: "compact",
                            }).format(likes)}{" "}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:hidden mt-5 flex justify-center items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />{" "}
                  {calculateReadingTime(post!.content)} min lire
                </span>
                {!post!.isDraft && (
                  <>
                    <span className="flex items-center">
                      <Eye className="mr-1 h-4 w-4" />{" "}
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(views)}{" "}
                      vues
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="mr-1 h-4 w-4" />{" "}
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(likes)}{" "}
                    </span>
                  </>
                )}
              </div>
              {/*<div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleLike}>
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Editer
                  </Button>
                </div>*/}
            </div>
          </div>
          <div className="relative bg-gray-300 aspect-[6/3] max-md:absolute max-md:bottom-0 max-md:left-1/2 max-md:-translate-x-1/2 max-md:translate-y-1/2  max-md:w-[95%] max-md:h-[250px]  h-[400px] rounded-xl overflow-hidden flex items-center justify-center text-white">
            <ImageWrapper
              className="w-full object-cover h-full object-center "
              src={post!.preview}
              hash={post!.previewHash}
              width={1280}
              height={680}
              alt={post!.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default headSectionBlog;
