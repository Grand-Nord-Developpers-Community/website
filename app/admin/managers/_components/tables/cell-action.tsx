"use client";
import { useDeleteBlog, useToogleBlog } from "@/actions/mutations/blogs";
import { useUpdateUserRole } from "@/actions/mutations/user";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/constants/data";
import { IRole } from "@/lib/db/schema";
import { PaginatedBlog, User } from "@/types";
import { useConfirm } from "@omit/react-confirm-dialog";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: User[number];
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  // default visibility based on data (adjust field if different)
  const [role, setRole] = useState<IRole["name"]>(data.role.name);
  const { mutate: mDelete, isPending: isDeleting } = useUpdateUserRole();
  const { mutate: mToogle, isPending: isToogling } = useUpdateUserRole();
  const router = useRouter();
  const confirm = useConfirm();
  const onConfirm = async () => {
    mDelete({ userId: data.id, role: "user" });
    setOpen(false);
  };

  const handleVisibilityConfirm = async () => {
    if (role === "admin") {
      const result = await confirm({
        title: "Vous êtes sur le point de nommer un admin?",
        description: "Cette action ne pas être refait.",
        cancelText: "Retour",
        cancelButton: {
          variant: "outline",
          className: "max-sm:mt-2",
        },
        confirmText: "Continuer",
        confirmButton: {
          variant: "destructive",
        },
      });
      if (result) {
        mToogle({ userId: data.id, role: role });
      } else {
        setEditOpen(false);
        return;
      }
    }
    mToogle({ userId: data.id, role: role });
    setEditOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isDeleting || isToogling}
      />

      {/* Visibility edit modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !loading && setEditOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-t-lg sm:rounded-lg p-6 m-4">
            <h3 className="text-lg font-medium mb-2">Modifier le role</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Voulez-vous changer la modifier le role de{" "}
              <code className="bg-gray-50 p-1"> {data?.name}</code> ?
            </p>

            <div className="flex gap-2 mb-4">
              <button
                className={`px-3 py-1 rounded ${
                  role === "admin"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setRole("admin")}
                disabled={isToogling}
              >
                Admin
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  role === "manager"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setRole("manager")}
                disabled={isToogling}
              >
                Manager
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                Annuler
              </Button>
              <Button
                variant={"secondary"}
                onClick={handleVisibilityConfirm}
                disabled={isToogling}
              >
                {isToogling ? "Traitement..." : "Valider"}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <Button asChild variant={"outline"} size={"sm"}>
          <Link href={`/user/${data.username}`}>Ouvrir</Link>
        </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              disabled={data.role.name === "admin"}
              onClick={() => setEditOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" /> Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={data.role.name === "admin"}
              onClick={() => setOpen(true)}
            >
              <Trash className="mr-2 h-4 w-4" /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
