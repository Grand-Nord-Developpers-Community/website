"use client";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={pending ? "button" : "submit"}
      aria-disabled={pending}
      className="relative text-white"
    >
      {children}
      {pending && (
        <span className="animate-spin absolute right-4">
          <LoaderIcon />
        </span>
      )}
      <span aria-live="polite" className="sr-only" role="status">
        {pending ? "Chargement" : "Envoyer"}
      </span>
      {/* <Button disabled={isLoading} className="text-white">
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {view === "login" ? "Se connecter" : "Créer mon compte"}
          </Button> */}
    </Button>
  );
}
