"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ForumPost from "@/components/forum-post-component";
export default function ForumDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nouveau forum</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Poser votre question</DialogTitle>
          <DialogDescription>
            Remplir les informations ci-dessous pour poser votre question
          </DialogDescription>
        </DialogHeader>
        <ForumPost
          onSucessCallBack={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
