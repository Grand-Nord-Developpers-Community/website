"use client";
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
import { PaginatedBlog } from "@/types";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: PaginatedBlog[number];
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  // default visibility based on data (adjust field if different)
  const [visibility, setVisibility] = useState<"en cours" | "public">(
    data?.isDraft ? "public" : "en cours"
  );
  const router = useRouter();

  const onConfirm = async () => {};

  const handleVisibilityConfirm = async () => {
    setLoading(true);
    try {
      await fetch(`/api/admin/product/${data.id}/visibility`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visibility }),
      });
      setEditOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      {/* Visibility edit modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !loading && setEditOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-t-lg sm:rounded-lg p-6 m-4">
            <h3 className="text-lg font-medium mb-2">Modifier la visibilité</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Voulez-vous changer la visibilité du blog {data?.title} ?
            </p>

            <div className="flex gap-2 mb-4">
              <button
                className={`px-3 py-1 rounded ${
                  visibility === "en cours"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setVisibility("en cours")}
                disabled={loading}
              >
                en cours
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  visibility === "public"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setVisibility("public")}
                disabled={loading}
              >
                public
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setEditOpen(false)}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button onClick={handleVisibilityConfirm} disabled={loading}>
                {loading ? "Traitement..." : "Valider"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Modifier
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
