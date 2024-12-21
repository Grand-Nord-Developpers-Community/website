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
import { getBlogPost } from "@/actions/blog.actions";

export type Post = Awaited<ReturnType<typeof getBlogPost>>;

interface PostDetailProps {
  post: Post;
}

const PostDetail = ({ post }: PostDetailProps) => {
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

  const calculateReadingTime = () => {
    const wpm = 225;
    const words = editorRef.current
      ?.getEditor()
      ?.storage.characterCount.words();
    const time = Math.ceil(words / wpm);
    return time;
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

            {/* Article Content */}
            <div className="flex-grow">
              <article ref={contentRef}>
                <Editor
                  ref={editorRef}
                  editable={false}
                  content={post?.content || ""}
                  onUpdateToC={(items) => setTocItems(items)}
                  editorProps={{
                    attributes: {
                      class: "prose lg:prose-lg prose-blue dark:prose-invert",
                    },
                  }}
                />
              </article>
              {/* Mobile Share Buttons */}
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
            </div>
          </div>

          {/* Comment Section */}
          <CommentSection />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="w-full space-y-8 scrollbar-hide lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
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
              <div className="border rounded-lg p-4 my-5">
                <h3 className="text-lg font-semibold mb-4">Publicité</h3>
                <div className="bg-gray-100 h-40 flex items-center justify-center rounded">
                  <p className="text-gray-500">Espace publicitère</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
