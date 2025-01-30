import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CommentInput from "./commentComponent";
import { AlertModal } from "./modal/alert-modal";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  MessageSquare,
  Loader,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SessionUser } from "@/lib/db/schema";
import { ReplyWithAuthor } from "@/actions/post_comment.actions";
import { useAlertStore } from "./stores/useAlert";
import { formatRelativeTime } from "@/lib/utils";

interface CommentProps {
  comment: ReplyWithAuthor;
  currentUser: SessionUser | null;
  depth: number;
  onVote: (id: string, increment: boolean) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onReply: (id: string, content: string) => Promise<boolean>;
  onEdit: (id: string, content: string) => Promise<boolean>;
}

export function Comment({
  comment,
  depth,
  onVote,
  onDelete,
  onReply,
  onEdit,
  currentUser,
}: CommentProps) {
  const { openAlert } = useAlertStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModel] = useState(false);
  const isAuthor = currentUser?.id === comment.author.id;
  const v = comment.votes.reduce(
    (total, vote) => total + (vote.isUpvote ? 1 : -1),
    0
  );
  const isCurrentUserVoted = comment.votes.find(
    (vote) => vote.userId === currentUser?.id
  );
  const handleEdit = async () => {
    setIsLoading(true);
    if (await onEdit(comment.id, editContent)) {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    if (await onDelete(comment.id)) {
      setIsLoading(false);
    }
  };

  const handleReply = async () => {
    setIsLoading(true);
    if (await onReply(comment.id, replyContent)) {
      setIsReplying(false);
      setReplyContent("");
      setIsLoading(false);
    }
  };

  const handleVote = async (id: string, isVoted: boolean) => {
    if (!currentUser) {
      openAlert();
      return false;
    }
    setIsLoading(true);
    if (await onVote(id, isVoted)) {
      setIsReplying(false);
      setReplyContent("");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`bg-white relative rounded-lg p-2 sm:p-4 shadow-sm border border-gray-200 ${depth === 2 ? "border-l-4 border-l-primary" : ""}`}
    >
      {!isReplying && !isEditing && (
        <span className="absolute bottom-2 right-4 text-sm text-gray-500 ">
          {formatRelativeTime(comment.createdAt)}
        </span>
      )}
      <div className="flex items-start">
        <div>
          <Avatar className="space-x-2 sm:space-x-0 sm:space-y-2 mr-3 sm:mr-4 mb-2">
            <AvatarImage
              src={comment.author?.image || ""}
              alt={comment.author?.name || "Avatar"}
            />
            <AvatarFallback>
              {comment.author?.name?.slice(0, 2)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* <div className="flex flex-col items-center bg-gray-50 rounded-lg p-2 space-x-0 space-y-2 mr-3 sm:mr-4">
            <button
              onClick={() => onVote(comment.id, true)}
              className="text-gray-500 hover:bg-primary/20 rounded-lg w-[95%] flex  hover:text-primary transition-colors"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <span className="text-primary font-medium">{comment.score}</span>
            <button
              onClick={() => onVote(comment.id, false)}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div> */}
          <UpVoteComponent
            id={comment.id}
            onVote={handleVote}
            loading={isLoading}
            value={v}
            isCurrentUserVoted={isCurrentUserVoted}
          />
          {/* <div
            className="flex flex-col items-center rounded-full bg-white border border-border space-x-0 space-y-2 mr-3 sm:mr-4"
            style={{ padding: "6px" }}
          >
            <button
              //onClick={() => handleVote("up")}
              onClick={() => onVote(comment.id, true)}
              className={`rounded-full p-1 transition-all duration-200 ${
                isCurrentUserVoted && isCurrentUserVoted.isUpvote
                  ? "bg-gray-100 text-blue-500"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
              aria-label="Upvote"
            >
              <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <span className="my-1 text-sm font-medium text-gray-700">
              {comment.votes.reduce(
                (total, vote) => total + (vote.isUpvote ? 1 : -1),
                0
              )}
            </span>

            <button
              //onClick={() => handleVote("down")}
              onClick={() => onVote(comment.id, false)}
              className={`rounded-full p-1 transition-all duration-200 ${
                isCurrentUserVoted && !isCurrentUserVoted.isUpvote
                  ? "bg-gray-100 text-blue-500"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
              aria-label="Downvote"
            >
              <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div> */}
        </div>

        <div className="flex-1 space-y-2 ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <span className="font-medium">{comment.author.name}</span>
                  {isAuthor && (
                    <span className="bg-primary text-[10px] text-white px-2 py-0.5 rounded">
                      you
                    </span>
                  )}
                  <span className="bg-secondary text-[10px] text-white px-2 py-0.5 rounded">
                    {comment.author.exp} Xp
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  @{comment.author.username}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                {isAuthor ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 px-2 sm:px-3"
                      onClick={() => setOpenModel(true)}
                    >
                      <Trash2 className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Supprimer</span>
                    </Button>
                    <AlertModal
                      onConfirm={handleDelete}
                      onClose={() => setOpenModel(false)}
                      isOpen={openModal}
                      loading={isLoading}
                    />

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 hover:bg-primary/10 px-2 sm:px-3"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Editer</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 hover:bg-primary/10 px-2 sm:px-3"
                    onClick={() => {
                      if (currentUser) {
                        setIsReplying(true);
                      } else {
                        openAlert();
                      }
                    }}
                    disabled={depth >= 2}
                  >
                    <MessageSquare className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Repondre</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <CommentInput
                throttleDelay={1000}
                className={"h-[100px] min-h-56 w-full rounded-xl"}
                editorContentClassName="overflow-auto h-full"
                editorClassName="focus:outline-none px-2 py-4 h-full"
                value={editContent}
                editable={!isLoading}
                onChange={(v) => setEditContent(v as string)}
                //className="min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                  Retour
                </Button>
                <Button
                  onClick={handleEdit}
                  disabled={isLoading}
                  className="flex gap-2"
                >
                  {isLoading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Modifier
                </Button>
              </div>
            </div>
          ) : (
            <>
              <RenderContent value={comment.content} />
              {/* <CommentInput
                throttleDelay={1000}
                className={"h-[100px] min-h-56 w-full rounded-xl"}
                editorContentClassName="overflow-auto h-full"
                editorClassName="focus:outline-none px-5 py-4 h-full"
                value={comment.content}
                editable={false}
                //handleChangeCallback={setEditContent}
                //className="min-h-[100px]"
              /> */}
            </>
          )}
        </div>
      </div>
      {isReplying && currentUser && (
        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={currentUser?.image || ""}
                alt={currentUser?.name || "Avatar"}
              />
              <AvatarFallback>
                {currentUser?.name?.slice(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>Votre réponse</span>
          </div>

          <CommentInput
            throttleDelay={1000}
            className={"h-[100px] min-h-56 w-full rounded-xl"}
            editorContentClassName="overflow-auto h-full"
            editorClassName="focus:outline-none px-2 py-4 h-full"
            placeholder={`Reply to @${comment.author.username}...`}
            value={replyContent}
            editable={!isLoading}
            onChange={(v) => setReplyContent(v as string)}
            //className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsReplying(false)}>
              Retour
            </Button>
            <Button
              onClick={handleReply}
              disabled={isLoading}
              className="flex gap-2"
            >
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              REPLY
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import RenderContent from "./renderContent";
import UpVoteComponent from "./upVoteComponent";

interface CommentSkeletonProps {
  depth?: number;
}

export function CommentSkeleton({ depth = 0 }: CommentSkeletonProps) {
  return (
    <div
      className={`space-y-4 ${depth > 0 ? "ml-4 sm:ml-8 pl-4 sm:pl-8 border-l-2 border-gray-200" : ""}`}
    >
      <div className="bg-white rounded-lg p-2 sm:p-4 shadow-sm border border-gray-200">
        <div className="flex items-start">
          <div className="flex flex-col items-center bg-gray-50 rounded-lg p-2 space-x-0 space-y-2 mr-3 sm:mr-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
      {depth < 2 && (
        <>
          <CommentSkeleton depth={depth + 1} />
          {depth === 0 && <CommentSkeleton depth={depth + 1} />}
        </>
      )}
    </div>
  );
}
