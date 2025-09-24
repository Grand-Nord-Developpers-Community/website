"use client";
import { UserProfile } from "@/types";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

function ShareBtn({ user }: { user: UserProfile }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Profil ${user?.name}`,
          text: "Consulter mon profil membre GNDC",
          url: `https://gndc.tech/user/${user?.username}`,
        });
        toast.success("lien envoyé avec sucèss !!");
      } catch (error) {
        toast.error("une erreur lors de l'envoie " + error);
      }
    } else {
      toast("veuillez copier l'adresse URL et partagé");
    }
  };
  return (
    <Button
      //className="size-10 bg-white items-center justify-center flex rounded-full hover:bg-gray-200 border border-border"
      size="icon"
      variant={"outline"}
      className="rounded-full"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
}

export default ShareBtn;
