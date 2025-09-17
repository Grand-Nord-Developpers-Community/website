"use client";
import React, { useState } from "react";
import UserDialog from "./userDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function AddMemberButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="sm:mr-2 h-4 w-4" />
        <span className="hidden sm:block">Ajouter un membre</span>
      </Button>
      <UserDialog open={isOpen} onOpenChange={(v) => setIsOpen(v)} />
    </>
  );
}

export default AddMemberButton;
