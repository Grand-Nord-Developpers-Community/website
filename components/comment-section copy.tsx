"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Modal from "./modal/Modal";
import {
  ReplyWithAuthor,
  addForumReply,
  getPostReplies,
} from "@/actions/forum.actions";
import { SessionUser } from "@/lib/db/schema";
import { toast } from "sonner";

export default function CommentSection({
  postId,
  user,
}: {
  postId: string;
  user: SessionUser | null;
}) {
  const [comments, setComments] = useState<ReplyWithAuthor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState("");

  // Removes comment/reply from "comments" state
  async function deleteComment() {
    const id = commentToDelete;
    //await deleteCommentAPI(id);
    setComments((oldComments) => oldComments.filter((c) => c.id !== id));
  }

  // Edits comment
  async function editComment(id: string, newContent: string) {
    //await editCommentAPI(id, newContent);
    setComments((oldComments) =>
      oldComments.map((c) => (c.id === id ? { ...c, content: newContent } : c))
    );
  }

  // New Comment text input change handler
  function newCommentChangeHandler(e) {
    setNewCommentContent(e.target.value);
  }

  // Adds new top-level comment
  async function addNewComment(
    parentId = null,
    replyingTo = null,
    content: string
  ) {
    console.log("got here", parentId, content);

    if (content === "") return;

    const res = await addForumReply({
      content: content,
      parentId: parentId,
      postId: postId,
    });
    //console.log(newComment);

    if (res.success) {
      let result = res.result;
      const newComment: ReplyWithAuthor = {
        author: {
          ...user!,
        },
        content: result[0].content,
        createdAt: result[0].createdAt,
        id: result[0].id,
        score: result[0].score!,
        replies: [],
        parentId: result[0].parentId,
      };
      setComments((oldComments) => [...oldComments, newComment]);
    }

    if (parentId === null) setNewCommentContent("");
  }

  // Run on page load
  useEffect(() => {
    async function fetchAllComments() {
      const reply = await getPostReplies(postId);
      //toast.message(JSON.stringify(reply));
      setComments(reply);
    }
    fetchAllComments();
  }, []);

  return (
    <div className="bg-veryLightGray min-h-screen relative">
      {/* Modal */}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setCommentToDelete={setCommentToDelete}
          deleteComment={deleteComment}
        />
      )}
      <input type="text" value={JSON.stringify(comments)} />
      {/* Main container */}
      <div className="w-full">
        {/* Comments */}
        {comments
          .filter((c) => c.parentId === null)
          .map((comment) => (
            <div className="flex flex-col" key={comment.id}>
              {/* Base comment */}
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
                setShowModal={setShowModal}
                setCommentToDelete={setCommentToDelete}
                editComment={editComment}
                addReply={addNewComment}
                parentId={comment.parentId}
                replyingTo={comment.author.name!}
                reply={undefined}
                //rateComment={rateComment}
              />

              {/* replies container */}
              {comments.filter((c) => c.parentId === comment.parentId)
                .length !== 0 && (
                <div className="relative mt-4">
                  {/* Vertical bar */}
                  <div className="absolute w-[2px] bg-grayishBlue/10 left-0 md:left-10 top-0 bottom-2"></div>

                  {/* Replies */}
                  <div className="ml-4 md:ml-20 flex flex-col items-end gap-6">
                    {comments
                      .filter((c) => c.parentId === comment.id)
                      .map((reply) => (
                        <Comment
                          key={reply.id}
                          comment={reply}
                          user={user}
                          setShowModal={setShowModal}
                          setCommentToDelete={setCommentToDelete}
                          editComment={editComment}
                          addReply={addNewComment}
                          parentId={comment.id}
                          //rateComment={rateComment}
                          replyingTo={comment.author.name!}
                          reply
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}

        {/* Text Input */}
        <CommentInput
          user={user}
          value={newCommentContent}
          onChange={newCommentChangeHandler}
          sendClickHandler={() => addNewComment(null, null, newCommentContent)}
          reply={false}
          replyClickHandler={undefined}
          cancelClickHandler={undefined}
        />
      </div>
    </div>
  );
}
