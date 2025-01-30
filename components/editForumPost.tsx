import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import ForumPost from "@/components/forum-post-component";
import { Forum } from "./question-card";
import { open } from "inspector/promises";
interface Props {
  post: Omit<Forum[number], "author" | "score" | "replies">;
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}
export default function EditForumPost({
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier votre question</DialogTitle>
          <qDialogDescription>
            Remplir les informations ci-dessous pour modifier votre question
          </qDialogDescription>
        </DialogHeader>
        <div className="w-full">
          <ForumPost
            forum={post}
            onSucessCallBack={() => {
              setOpen(false);
              onSuccess();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
