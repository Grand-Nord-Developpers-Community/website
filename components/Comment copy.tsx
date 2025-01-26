import React, { useState } from "react";
import CommentInput from "./CommentInput";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SessionUser } from "@/lib/db/schema";
import { ReplyWithAuthor } from "@/actions/forum.actions";
import { formatRelativeTime } from "@/lib/utils";

// function timeSince(date) {
//   var seconds = Math.floor((new Date() - date) / 1000);

//   var interval = seconds / 31536000;

//   if (interval > 1) {
//     return (
//       Math.floor(interval) + ` year${Math.floor(interval) === 1 ? "" : "s"} ago`
//     );
//   }
//   interval = seconds / 2592000;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) +
//       ` month${Math.floor(interval) === 1 ? "" : "s"} ago`
//     );
//   }
//   interval = seconds / 86400;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) + ` day${Math.floor(interval) === 1 ? "" : "s"} ago`
//     );
//   }
//   interval = seconds / 3600;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) + ` hour${Math.floor(interval) === 1 ? "" : "s"} ago`
//     );
//   }
//   interval = seconds / 60;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) +
//       ` minute${Math.floor(interval) === 1 ? "" : "s"} ago`
//     );
//   }
//   interval = seconds / 60;
//   if (interval > 10) {
//     return (
//       Math.floor(seconds) +
//       ` second${Math.floor(interval) === 1 ? "" : "s"} ago`
//     );
//   }
//   return "just now";
// }

interface Props {
  user: SessionUser | null;
  comment: ReplyWithAuthor;
  setShowModal: any;
  setCommentToDelete: any;
  editComment: any;
  addReply: any;
  parentId: string | null;
  replyingTo: string;
  reply: any;
}
function Comment({
  comment,
  user,
  setShowModal,
  setCommentToDelete,
  editComment,
  addReply,
  parentId,
  replyingTo,
  reply,
}: Props) {
  const [content, setContent] = useState(comment.content);
  const [newContentBuffer, setNewContentBuffer] = useState(comment.content);
  const [replyBuffer, setReplyBuffer] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);

  // Delete comment
  function deleteClickHandler() {
    setShowModal(true);
    setCommentToDelete(comment.id);
  }

  // Edit Comment
  function editClickHandler() {
    setEditMode(true);
  }

  function cancelEditClickHandler() {
    setEditMode(false);
    setNewContentBuffer(content);
  }

  function editChangeHandler(e) {
    setNewContentBuffer(e.target.value);
  }

  function updateEditClickHandler() {
    setEditMode(false);
    editComment(comment.id, newContentBuffer);
  }

  // Reply to comment
  function replyClickHandler() {
    setReplyMode(true);
  }

  function replyChangeHandler(e) {
    setReplyBuffer(e.target.value);
  }

  function replyConfirmClickHandler() {
    if (replyBuffer === "") return;
    setReplyMode(false);
    setReplyBuffer("");
    const originalId = reply ? parentId : comment.id;
    addReply(originalId, comment.author.name, replyBuffer);
  }

  function cancelReplyClickHandler() {
    setReplyMode(false);
    setReplyBuffer("");
  }

  // Rating a comment
  function plusClickHandler() {
    //rateComment(comment.id, 1);
  }

  function minusClickHandler() {
    //rateComment(comment.id, -1);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Comment */}
      <div
        className={`
        bg-white rounded-lg px-6 pt-6 pb-5 flex flex-col md:flex-row md:space-x-6        
      `}
      >
        {/* Desktop rating indicator */}
        <div className="hidden md:flex bg-veryLightGray pt-3 pb-2 h-24 w-10 rounded-lg flex-col items-center space-y-[15px]">
          {/* plus */}
          <svg
            width="11"
            height="11"
            xmlns="http://www.w3.org/2000/svg"
            onClick={plusClickHandler}
          >
            <path
              className={`${
                user ? "hover:fill-moderateBlue cursor-pointer" : ""
              }`}
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill={`${comment.score === 1 ? "hsl(238, 40%, 52%)" : "#C5C6EF"}`}
            />
          </svg>

          <p className="font-semibold text-moderateBlue">{comment.score}</p>

          {/* minus */}
          <svg
            width="11"
            height="3"
            xmlns="http://www.w3.org/2000/svg"
            onClick={minusClickHandler}
          >
            <path
              className={`${
                user ? "hover:fill-moderateBlue cursor-pointer" : ""
              }`}
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill={`${
                comment.score === -1 ? "hsl(238, 40%, 52%)" : "#C5C6EF"
              }`}
            />
          </svg>
        </div>

        {/* Main comment container */}
        <div className="w-full flex flex-col gap-3">
          {/* Header */}
          <div className="flex flex-row items-center gap-4 w-full">
            {/* PFP */}
            <Avatar>
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name || "Avatar"}
              />
              <AvatarFallback>
                {user?.name?.slice(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <div className="flex flex-row items-center">
              <p className="font-semibold text-darkBlue">
                {comment.author.name}
              </p>
              {comment.author.id === user?.id && (
                <span className="bg-moderateBlue text-white font-semibold ml-2 px-1.5 py-0.5 rounded-sm text-xs">
                  you
                </span>
              )}
            </div>

            {/* Date */}
            <p className="font-normal text-grayishBlue">
              {formatRelativeTime(comment.createdAt)}
            </p>

            {/* Actions */}
            {user && (
              <div className="hidden md:block ml-auto">
                {comment.id !== user.id ? (
                  // Reply Button
                  <div
                    className="group flex flex-row items-center space-x-2 cursor-pointer"
                    onClick={replyClickHandler}
                  >
                    <svg
                      width="14"
                      height="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="group-hover:fill-lightGrayishBlue"
                        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                        fill="#5357B6"
                      />
                    </svg>

                    <p className="font-semibold text-moderateBlue group-hover:text-lightGrayishBlue">
                      Reply
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row gap-6">
                    {/* Delete Button */}
                    <div
                      className="group flex flex-row items-center space-x-2 ml-auto cursor-pointer"
                      onClick={deleteClickHandler}
                    >
                      <svg
                        width="12"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-hover:fill-paleRed"
                          d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                          fill="#ED6368"
                        />
                      </svg>

                      <p className="font-semibold text-softRed group-hover:text-paleRed">
                        Delete
                      </p>
                    </div>

                    {/* Edit Button */}
                    <div
                      className="group flex flex-row items-center space-x-2 ml-auto cursor-pointer"
                      onClick={editClickHandler}
                    >
                      <svg
                        width="14"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-hover:fill-lightGrayishBlue"
                          d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                          fill="#5357B6"
                        />
                      </svg>

                      <p className="font-semibold text-moderateBlue group-hover:text-lightGrayishBlue">
                        Edit
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          {/*{!editMode && (
            <div
              className={`
            text-grayishBlue rounded-lg
            ${reply ? "pr-2" : "pr-8"}            
          `}
              onInput={editChangeHandler}
            >
              {comment.replies. && (
                <span className="text-moderateBlue font-semibold mr-1 cursor-pointer hover:text-lightGrayishBlue select-none">
                  @{comment.replying_to}
                </span>
              )}
              {comment.content}
            </div>
          )}*/}

          {/* Text input (Editing) */}
          {editMode && (
            <textarea
              className="border-solid border-2 border-grayishBlue/10 rounded-lg w-full h-full px-5 py-2 outline-none resize-none focus-visible:border-moderateBlue text-darkBlue"
              rows={4}
              placeholder="Add a comment..."
              name=""
              id=""
              value={newContentBuffer}
              onChange={editChangeHandler}
            ></textarea>
          )}

          {/* Footer/Edit button */}
          {editMode && (
            <div className="flex flex-row w-full justify-end gap-6">
              <button
                className="bg-grayishBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-50"
                onClick={cancelEditClickHandler}
              >
                CANCEL
              </button>
              <button
                className="bg-moderateBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-lightGrayishBlue"
                onClick={updateEditClickHandler}
              >
                UPDATE
              </button>
            </div>
          )}
        </div>

        {/* Mobile comment footer */}
        <div className="md:hidden w-full mt-4 flex flex-row items-center">
          {/* Rating indicator */}
          <div className="flex bg-veryLightGray py-2 h-10 w-24 rounded-lg flex-row items-center justify-evenly md:hidden">
            {/* plus */}
            <svg
              width="11"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
              onClick={plusClickHandler}
            >
              <path
                className="cursor-pointer"
                d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                fill={`${
                  comment.score === 1 ? "hsl(238, 40%, 52%)" : "#C5C6EF"
                }`}
              />
            </svg>

            <p className="font-semibold text-moderateBlue">{comment.score}</p>

            {/* minus */}
            <svg
              width="11"
              height="3"
              xmlns="http://www.w3.org/2000/svg"
              onClick={minusClickHandler}
            >
              <path
                className="cursor-pointer"
                d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                fill={`${
                  comment.score === -1 ? "hsl(238, 40%, 52%)" : "#C5C6EF"
                }`}
              />
            </svg>
          </div>

          {/* Actions */}
          {user && (
            <div className="block md:hidden ml-auto">
              {comment.author.id !== user.id ? (
                // Reply Button
                <div
                  className="group flex flex-row items-center space-x-2 cursor-pointer"
                  onClick={replyClickHandler}
                >
                  <svg
                    width="14"
                    height="13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="group-hover:fill-lightGrayishBlue"
                      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      fill="#5357B6"
                    />
                  </svg>

                  <p className="font-semibold text-moderateBlue group-hover:text-lightGrayishBlue">
                    Reply
                  </p>
                </div>
              ) : (
                <div className="flex flex-row gap-6">
                  {/* Delete Button */}
                  <div
                    className="group flex flex-row items-center space-x-2 ml-auto cursor-pointer"
                    onClick={deleteClickHandler}
                  >
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="group-hover:fill-paleRed"
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        fill="#ED6368"
                      />
                    </svg>

                    <p className="font-semibold text-softRed group-hover:text-paleRed">
                      Delete
                    </p>
                  </div>

                  {/* Edit Button */}
                  <div
                    className="group flex flex-row items-center space-x-2 ml-auto cursor-pointer"
                    onClick={editClickHandler}
                  >
                    <svg
                      width="14"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="group-hover:fill-lightGrayishBlue"
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6"
                      />
                    </svg>

                    <p className="font-semibold text-moderateBlue group-hover:text-lightGrayishBlue">
                      Edit
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reply input */}
      {replyMode && (
        <CommentInput
          user={user}
          value={replyBuffer}
          replyClickHandler={replyConfirmClickHandler}
          onChange={replyChangeHandler}
          cancelClickHandler={cancelReplyClickHandler}
          reply
          sendClickHandler={undefined}
        />
      )}
    </div>
  );
}

export default Comment;
