"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Button as ButtonX } from "@/components/ui/button-more";
import { Comment, CommentSkeleton } from "./Comment";
import CommentInput from "./commentComponent";
import { SessionUser } from "@/lib/db/schema";
import EmptyAnswerIcon from "@/assets/svgs/undraw_public-discussion_693m.svg";
import {
  ReplyWithAuthor,
  addpostComment,
  deletePostComment,
  getPostReplies,
  updatePostComment,
} from "@/actions/post_comment.actions";
import { getTotalReplies } from "@/lib/utils";
import { useAlertStore } from "./stores/useAlert";
import Link from "next/link";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { Editor } from "@tiptap/react";
import { upVotePost } from "@/actions/vote.actions";

export default function CommentThread({
  postId = null,
  blogId = null,
  user,
}: {
  postId?: string | null;
  blogId?: string | null;
  user: SessionUser | null;
}) {
  const editorRef = useRef<Editor | null>(null);
  const [comments, setComments] = useState<ReplyWithAuthor[]>([]);
  const { openAlert } = useAlertStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [clearContent, setClearContent] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const commentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasFetched) {
          const reply = await getPostReplies({ postId, blogId });
          setComments(reply);
          setIsLoading(false);
          setHasFetched(true);
          observer.disconnect();
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // trigger when 10% visible
      }
    );

    if (commentRef.current) {
      observer.observe(commentRef.current);
    }

    return () => {
      if (commentRef.current) {
        observer.unobserve(commentRef.current);
      }
    };
  }, [postId, blogId, hasFetched]);
  const [newComment, setNewComment] = useState("");

  const handleVote = async (commentId: string, isUpVote: boolean) => {
    if (!user) {
      openAlert();
      return false;
    }
    const previous = structuredClone(comments);
    setComments((prev) => updateCommentScore(prev, commentId, isUpVote));
    try {
      const res = await upVotePost({
        postId,
        commentId,
        isUpvote: isUpVote,
        userId: user.id,
      });

      if (res.error) {
        console.log(res.error);
        setComments(previous); // rollback
        return false;
      }

      return true;
    } catch (e) {
      console.error(e);
      setComments(previous); // rollback
      return false;
    }
  };

  const updateCommentScore = (
    comments: ReplyWithAuthor[],
    targetId: string,
    isUpVote: boolean
  ): ReplyWithAuthor[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        const existingVote = comment.votes.find((v) => v.userId === user?.id);
        let updatedVotes;

        if (existingVote) {
          if (existingVote.isUpvote === isUpVote) {
            // User toggles off their vote
            updatedVotes = comment.votes.filter((v) => v.userId !== user?.id);
          } else {
            // User switches vote direction
            updatedVotes = comment.votes.map((v) =>
              v.userId === user?.id ? { ...v, isUpvote: isUpVote } : v
            );
          }
        } else {
          // New vote
          updatedVotes = [
            ...comment.votes,
            { isUpvote: isUpVote, userId: user!.id },
          ];
        }

        return { ...comment, votes: updatedVotes };
      }

      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentScore(comment.replies, targetId, isUpVote),
        };
      }

      return comment;
    });
  };

  const handleDelete = async (commentId: string) => {
    let sucess = false;
    try {
      const res = await deletePostComment(commentId);
      if (res.sucess) {
        setComments((prevComments) =>
          deleteCommentAndChildren(prevComments, commentId)
        );
        sucess = true;
        return true;
      }
    } catch (e) {
      toast.error(e as string);
      sucess = false;
      return false;
      //console.log(e);
    } finally {
      return sucess;
    }
  };

  const deleteCommentAndChildren = (
    comments: ReplyWithAuthor[],
    targetId: string
  ): ReplyWithAuthor[] => {
    return comments.filter((comment) => {
      if (comment.id === targetId) {
        return false;
      }
      if (comment.replies.length > 0) {
        comment.replies = deleteCommentAndChildren(comment.replies, targetId);
      }
      return true;
    });
  };

  const handleReply = async (parentId: string, content: string) => {
    if (!user) {
      openAlert();
      //return false;
    }
    const res = await addpostComment({
      content: content,
      parentId,
      postId,
      blogId,
    });
    //console.log(newComment);

    if (res.success) {
      let result = res.result;
      const newReply: ReplyWithAuthor = {
        author: {
          ...result?.author!,
          exp: result?.author?.experiencePoints!,
        },
        content: result?.content!,
        createdAt: result?.createdAt!,
        id: result?.id!,
        score: result?.score!,
        replies: [],
        votes: [],
        parentId: result?.parentId!,
      };
      setComments((prevComments) =>
        addReplyToComment(prevComments, parentId, newReply)
      );
      return true;
    }
    return false;
  };

  const addReplyToComment = (
    comments: ReplyWithAuthor[],
    parentId: string,
    newReply: ReplyWithAuthor
  ): ReplyWithAuthor[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [newReply, ...comment.replies] };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  };

  const handleEdit = async (commentId: string, newContent: string) => {
    let success = false;
    try {
      const res = await updatePostComment(commentId, newContent);
      if (res.success) {
        setComments((prevComments) =>
          updateCommentContent(prevComments, commentId, newContent)
        );
        success = true;
        return true;
      }
    } catch (e) {
      toast.error(e as string);
      success = false;
      return false;
      //console.log(e);
    } finally {
      return success;
    }
  };

  const updateCommentContent = (
    comments: ReplyWithAuthor[],
    targetId: string,
    newContent: string
  ): ReplyWithAuthor[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          content: newContent,
        };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentContent(comment.replies, targetId, newContent),
        };
      }
      return comment;
    });
  };

  const handleAddComment = async () => {
    setIsReplying(true);
    try {
      const res = await addpostComment({
        content: newComment,
        parentId: null,
        postId,
        blogId,
      });

      if (true) {
        let result = res.result;
        const newComment: ReplyWithAuthor = {
          author: {
            ...result?.author!,
            exp: result?.author?.experiencePoints!,
          },
          content: result?.content!,
          createdAt: result?.createdAt!,
          id: result?.id!,
          score: result?.score!,
          replies: [],
          votes: [],
          parentId: result?.parentId!,
        };
        setComments((prevComments) => [...prevComments, newComment]);
        setNewComment("");
        setClearContent(true);
        setTimeout(() => {
          console.log("==Clearing editor==");
          setClearContent(false);
          //console.log(editorRef.current?.commands);
          //editorRef.current?.commands.clearContent();
          //console.log("Success: Editor cleared");
        }, 2000);

        // setTimeout(() => {
        //   console.log("==Resetting editor==");
        //   editorRef.current?.commands.setContent("");
        //   console.log("Success: Editor reset");
        // }, 3000);

        setIsReplying(false);
      }
      if (res.error) {
        if (res.notLoggedIn) {
          openAlert();
        }
        setIsReplying(false);
        //toast.error(res.error);
      }
    } catch (e) {
      toast.error(e as string);
    } finally {
      setIsReplying(false);
    }
  };

  const renderComments = (commentsToRender: ReplyWithAuthor[], depth = 0) => {
    return commentsToRender.map((comment) => (
      <div
        key={comment.id}
        className={`space-y-4 w-full ${depth > 0 ? "ml-4 sm:ml-8 pl-4 sm:pl-8 border-l-2 border-gray-200" : ""}`}
      >
        <Comment
          comment={comment}
          onVote={handleVote}
          onDelete={handleDelete}
          onReply={handleReply}
          onEdit={handleEdit}
          depth={depth}
          currentUser={user}
        />
        {comment.replies.length > 0 &&
          depth < 2 &&
          renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="w-full py-4 space-y-4" ref={commentRef}>
      <h2 className="text-lg font-semibold">
        {isLoading ? "-" : getTotalReplies(comments)}{" "}
        {blogId ? "Commentaire" : "Réponse"}
        {getTotalReplies(comments) > 1 ? "s" : ""}
      </h2>
      {/* <span>{JSON.stringify(comments)}</span> */}
      {isLoading ? (
        <>
          <CommentSkeleton />
        </>
      ) : (
        renderComments(comments)
      )}
      {!isLoading && comments.length === 0 && (
        <>
          <EmptyAnswerIcon className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
          <h2 className="text-lg mx-auto text-center font-medium my-3 text-gray-400">
            Pas de reponse pour l&apos;instant !
          </h2>
        </>
      )}
      <div className="bg-white p-2 py-4 border border-border rounded-lg shadow-sm mt-4">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-4 max-sm:flex-col">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "Avatar"}
                  />
                  <AvatarFallback>
                    {user?.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="sm:hidden">Votre Réponse</span>
              </div>

              <CommentInput
                //@ts-ignore
                ref={editorRef}
                throttleDelay={1000}
                className={"h-[200px] min-h-56 w-full rounded-xl"}
                editorContentClassName="overflow-auto h-full"
                output="html"
                value={newComment}
                placeholder="Add comment here..."
                editable={!isReplying}
                onChange={(e) => setNewComment(e as string)}
                clearContent={clearContent}
                editorClassName="focus:outline-none px-5 py-4 h-full"
              />
            </div>
            <Button
              className="w-fit flex gap-2 ml-auto"
              onClick={handleAddComment}
              disabled={isReplying}
            >
              {isReplying && (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Envoyer
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <p>
              Pour pouvoir interagir il faudrait vous connecter ou créer un
              compte !
            </p>
            <div className="flex gap-4">
              <Button variant="secondary" asChild>
                <Link href="/login"> Se connecter</Link>
              </Button>
              <ButtonX variant="ringHover" asChild>
                <Link href="/sign-up">Créer un compte</Link>
              </ButtonX>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
