"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageWrapper from "@/components/imageWrapper";
import { BlogType } from "@/interfaces/publication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchPageViews } from "@/actions/utils.actions";
import { Eye, MessageCircle, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

function PostStats({
  views,
  replies,
  likes,
}: {
  views: number | null;
  replies: number;
  likes: number;
}) {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500 my-3">
      <div className="flex items-center">
        <Eye className="w-4 h-4 mr-1" />
        <span>{views}</span>
      </div>
      <div className="flex items-center">
        <MessageCircle className="w-4 h-4 mr-1" />
        <span>{replies}</span>
      </div>
      <div className="flex items-center">
        <Heart className="w-4 h-4 mr-1" />
        <span>{likes}</span>
      </div>
    </div>
  );
}
type BlogTy = BlogType[number];
interface BlogT extends BlogTy {
  view: number;
  className?: string;
  imageClassName?: string;
}
export const CardBlog = ({
  title,
  description,
  slug,
  preview,
  previewHash,
  author,
  createdAt,
  replies,
  likes,
  view,
  className = "",
  imageClassName = "",
}: BlogT) => {
  return (
    <div
      className={clsx("w-full md:w-[49%] lg:w-[32.5%] xl:w-[24.2%]", className)}
    >
      <div className="w-full mx-auto rounded-xl dark:bg-zinc-950 bg-zinc-50 overflow-hidden p-2 border pb-3  ">
        <div
          className={clsx(
            "w-full h-[200px] rounded-xl overflow-hidden shadow-[0px_0px_5px_#A1A1AA] dark:shadow-[0px_0px_12px_rgb(39,39,42,0.7)]",
            imageClassName
          )}
        >
          <ImageWrapper
            className={"w-full object-cover h-full object-center "}
            src={preview}
            hash={previewHash}
            width={1280}
            height={680}
            //placeholder="blur"
            //blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            alt={title}
          />
        </div>

        <div className={"text-gray-800 dark:text-gray-200 mb-2 relative"}>
          <div className="overflow-hidden overflow-ellipsis">
            <h3 className="text-lg font-bold tracking-tighter my-3 mb-1 line-clamp-1">
              <Link
                href={`/blog/${slug}`}
                className="transition-all hover:text-secondary"
              >
                {title}
              </Link>
            </h3>
          </div>
          <div className="my-3">
            <p className="text-sm leading-2 line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="px-0">
          {/*<Button className="w-full rounded-lg" asChild>
            <Link href={`/blog/${slug}`}>Learn more</Link>
          </Button>*/}
          <PostStats
            views={view}
            replies={replies.length}
            likes={likes.filter((l) => l.isLike === true).length || 0}
          />
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Link href={`/user/${author.username}`}>
                <Avatar className="bg-gray-50 h-10 w-10">
                  <AvatarImage
                    src={
                      author?.image || `/api/avatar?username=${author.username}`
                    }
                    alt="Author"
                  />
                  <AvatarFallback>
                    {author?.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <Link
                  className="text-sm hover:text-secondary font-medium"
                  href={`/user/${author.username}`}
                >
                  {author.name}
                </Link>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>publié le </span>
                  <span>
                    {new Date(createdAt).toLocaleDateString("FR-fr", {
                      dateStyle: "long",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
