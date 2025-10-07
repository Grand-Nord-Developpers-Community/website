// components/user/UserDialog.tsx
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserListBody } from "./userList";

export default function UserDialog({
  open,
  onOpenChange,
  title,
  pageSize = 5,
  onUserClick,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title?: string;
  pageSize?: number;
  onUserClick?: (id: string) => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] bg-card">
          <DrawerHeader>
            <DrawerTitle>Liste des utilisateur</DrawerTitle>
            <DrawerDescription className="sr-only">
              Liste avec recherche et défilement infini
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4">
            <UserListBody onUserClick={onUserClick} pageSize={pageSize} />
            <div className="mt-3 flex items-center justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fermer
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle>Liste des utilisateur</DialogTitle>
          <DialogDescription className="sr-only">
            Liste avec recherche et défilement infini
          </DialogDescription>
        </DialogHeader>

        <UserListBody onUserClick={onUserClick} pageSize={pageSize} />

        <div className="mt-3 flex items-center justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
