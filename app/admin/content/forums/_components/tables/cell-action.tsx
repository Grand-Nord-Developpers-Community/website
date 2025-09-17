"use client";
import { useDeleteForum } from "@/actions/mutations/forums";
import { Button } from "@/components/ui/button";
import { PaginatedForum } from "@/types";
import { useConfirm } from "@omit/react-confirm-dialog";
import Link from "next/link";
import { Trash2 } from "lucide-react";
interface CellActionProps {
  data: PaginatedForum[number];
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const confirm = useConfirm();
  const { mutate: mDelete, isPending } = useDeleteForum();
  const handeClick = async () => {
    const result = await confirm({
      title: "Êtes vous sûre de vouloir continuer?",
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
      mDelete(data.id);
    }
  };
  const handleConfirmDelete = () => {
    // if (selectedId) {
    //   deleteMutation.mutate(selectedId);
    // }
    // setSelectedId(null);
  };
  return (
    <>
      <div className="flex justify-end gap-2">
        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={isPending}
          onClick={async () => {
            await handeClick();
          }}
        >
          <Trash2 className="size-4 text-white" />
        </Button>
        <Link target="_blank" href={`/forum/${data.id}`}>
          <Button variant="ghost">Ouvrir</Button>
        </Link>
      </div>
    </>
  );
};
