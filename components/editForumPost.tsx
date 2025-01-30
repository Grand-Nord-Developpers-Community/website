"use client";
import React, { useEffect, useState } from "react";
import { Forum } from "./question-card";
interface Props {
  post: Omit<Forum[number], "author" | "score" | "replies">;
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}
import Dialog from "@/components/Dialog";
import ForumPost from "@/components/forum-post-component";

export default function ForumDialog({
  post,
  onSuccess,
  isOpen = false,
  onClose,
}: Props) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  function handleClose() {
    setOpen(false);
    onClose();
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <h2 className="text-lg font-semibold">Modifier votre question</h2>
        <p className="text-gray-500 mb-4">
          Remplir les informations ci-dessous pour modifier votre question
        </p>
        <ForumPost
          forum={post}
          onSucessCallBack={() => {
            setOpen(false);
            onSuccess();
          }}
        />
      </Dialog>
    </>
  );
}
