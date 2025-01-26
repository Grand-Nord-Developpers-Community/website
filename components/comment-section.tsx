"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Button as ButtonX } from "@/components/ui/button-more";
import { Textarea } from "@/components/ui/textarea";
import { Comment, CommentSkeleton } from "./Comment";
import CommentInput from "./commentComponent";
import { SessionUser } from "@/lib/db/schema";
import EmptyAnswerIcon from "@/assets/svgs/undraw_public-discussion_693m.svg";
import {
  ReplyWithAuthor,
  addForumReply,
  getPostReplies,
} from "@/actions/forum.actions";
import { getTotalReplies } from "@/lib/utils";
import { useAlertStore } from "./stores/useAlert";
import Link from "next/link";

export default function CommentThread({
  postId,
  user,
}: {
  postId: string;
  user: SessionUser | null;
}) {
  const [comments, setComments] = useState<ReplyWithAuthor[]>([]);
  const { openAlert } = useAlertStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchAllComments() {
      const reply = await getPostReplies(postId);
      //toast.message(JSON.stringify(reply));
      setComments(reply);
      if (reply) {
        setIsLoading(false);
      }
    }
    fetchAllComments();
  }, []);
  const [newComment, setNewComment] = useState("");

  const handleVote = (commentId: string, increment: boolean) => {
    setComments((prevComments) =>
      updateCommentScore(prevComments, commentId, increment)
    );
  };

  const updateCommentScore = (
    comments: ReplyWithAuthor[],
    targetId: string,
    increment: boolean
  ): ReplyWithAuthor[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return { ...comment, score: comment.score + (increment ? 1 : -1) };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentScore(comment.replies, targetId, increment),
        };
      }
      return comment;
    });
  };

  const handleDelete = (commentId: string) => {
    setComments((prevComments) =>
      deleteCommentAndChildren(prevComments, commentId)
    );
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
    const res = await addForumReply({
      content: content,
      parentId,
      postId: postId,
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

  const handleEdit = (commentId: string, newContent: string) => {
    setComments((prevComments) =>
      updateCommentContent(prevComments, commentId, newContent)
    );
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
    const res = await addForumReply({
      content: newComment,
      parentId: null,
      postId: postId,
    });
    //console.log(newComment);

    if (res.success) {
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
        parentId: result?.parentId!,
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment("");
    }
    if (res.error) {
      if (res.notLoggedIn) {
        openAlert();
      }
      //toast.error(res.error);
    }
  };

  const renderComments = (commentsToRender: ReplyWithAuthor[], depth = 0) => {
    return commentsToRender.map((comment) => (
      <div
        key={comment.id}
        className={`space-y-4 ${depth > 0 ? "ml-4 sm:ml-8 pl-4 sm:pl-8 border-l-2 border-gray-200" : ""}`}
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
    <div className="w-full py-4 space-y-4">
      <h2 className="text-lg font-semibold">
        {isLoading ? "-" : getTotalReplies(comments)} Réponse
        {getTotalReplies(comments) > 1 ? "s" : ""}
      </h2>
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
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name || "Avatar"}
                />
                <AvatarFallback>
                  {user?.name?.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CommentInput
                throttleDelay={1000}
                className={"h-[200px] min-h-56 w-full rounded-xl"}
                editorContentClassName="overflow-auto h-full"
                output="html"
                value={newComment}
                placeholder="Add comment here..."
                editable={true}
                onChange={(e) => setNewComment(e)}
                editorClassName="focus:outline-none px-5 py-4 h-full"
              />
            </div>
            <Button onClick={handleAddComment}>Envoyer</Button>
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
