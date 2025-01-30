"use client";
import { Twitter, Facebook, Linkedin as LinkedIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Editor, EditorRef } from "@/components/editor";
import TableOfContent from "@/components/editor/components/table-of-content";
import { TocItem } from "@/components/editor/lib/table-of-contents";
import CommentSection from "@/components/comment-section";
import ProfilCard from "@/components/cards/hoverCardUserInfo";
import React, { useEffect, useRef, useState } from "react";
import { BlogType } from "@/interfaces/publication";
import { getBlogPost, getBlogPostPreview } from "@/actions/blog.actions";
import { SessionUser } from "@/lib/db/schema";
import BlogLikeCard from "./blogLikeCard";
export type Post =
  | Awaited<ReturnType<typeof getBlogPost>>
  | Awaited<ReturnType<typeof getBlogPostPreview>>;

interface PostDetailProps {
  post: Post;
  user: SessionUser | null;
}

const PostDetail = ({ post, user }: PostDetailProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [tocItemActive, setTocItemActive] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);

  const editorRef = useRef<EditorRef>(null);
  const contentRef = useRef<HTMLElement>(null);

  const handleItemClick = (e: any, id: string) => {
    e.preventDefault();
    //@ts-ignore
    const editor = editorRef.current.getEditor();
    const element = editor.view.dom.querySelector(`[id="${id}"]`);

    //@ts-ignore
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerHeight * 0.05;

    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (tocItems.length === 0) return;

    const tocElements = tocItems.map((item) => item.node);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const currentIndex = tocElements.findIndex(
            (item) => item.id === entry.target.id
          );

          if (entry.isIntersecting) {
            setTocItemActive(entry.target.id);
          } else if (
            !entry.isIntersecting &&
            entry.intersectionRatio < 1 &&
            entry.intersectionRatio > 0 &&
            entry.boundingClientRect.top > 0
          ) {
            const item = tocElements[currentIndex - 1]?.getAttribute("id");
            setTocItemActive(item);
          }
        }),
      { threshold: 1, rootMargin: "0px 0px -75% 0px" }
    );

    tocElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      tocElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [tocItems]);

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowProgress(true);
          } else {
            setShowProgress(false);
          }
        });
      },
      {
        rootMargin: "0px 0px -90% 0px",
        threshold: 0,
      }
    );

    observer.observe(contentRef.current);

    return () => {
      contentRef?.current && observer.unobserve(contentRef.current);
    };
  }, [contentRef.current]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex gap-6">
            {/* Share Buttons */}
            {!post?.isDraft && (
              <div className="hidden lg:flex flex-col items-center space-y-4 sticky top-24 h-fit">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedIn className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Article Content */}
            <div className="flex-grow w-full">
              <article ref={contentRef} className="w-full justify">
                <Editor
                  ref={editorRef}
                  editable={false}
                  disableEditor={true}
                  content={post?.content || ""}
                  onUpdateToC={(items) => setTocItems(items)}
                  editorProps={{
                    attributes: {
                      class:
                        "prose lg:prose-lg prose-blue dark:prose-invert w-full",
                    },
                  }}
                />
              </article>
              {/* Mobile Share Buttons */}
              {!post?.isDraft && (
                <div className="flex lg:hidden justify-center space-x-4 pt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Share on LinkedIn"
                  >
                    <LinkedIn className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          {!post?.isDraft && (
            <BlogLikeCard
              id={post?.id!}
              //value={post?.likes.map((l) => l.isLike === true).length!}
              user={user}
              //@ts-ignore
              likes={post?.likes!}
            />
          )}
          {/* Comment Section */}
          {!post?.isDraft && (
            <CommentSection
              user={user}
              blogId={post?.id}
              //@ts-ignore
              commentLists={post?.replies}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="relative lg:col-span-1 max-h-[calc(100vh-4rem)] lg:sticky lg:top-15 max-sm:max-h-none  ">
          <div className="absolute z-[10] bottom-0 inset-x-0 h-36 bg-gradient-to-t from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
          <div className="absolute z-[10] top-0 inset-x-0 h-10 bg-gradient-to-b from-white dark:from-white/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out" />
          <div className="pt-5 w-full space-y-8 scrollbar-hide h-full overflow-y-auto">
            {/* About Me */}
            <div className="p-0">
              <h3 className="text-lg font-bold">Auteur</h3>
              {/*@ts-ignor*/}
              <ProfilCard {...post!.author} />
              <TableOfContent
                items={tocItems}
                onItemClick={handleItemClick}
                activeItemId={tocItemActive!}
              />
              {/* Ad Block */}
              {!post?.isDraft && (
                <div className="border rounded-lg p-4 my-5">
                  <h3 className="text-lg font-semibold mb-4">Publicité</h3>
                  <div className="bg-gray-100 h-40 flex items-center justify-center rounded">
                    <p className="text-gray-500">Espace publicitère</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
