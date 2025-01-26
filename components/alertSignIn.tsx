"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/assets/images/brand/logo.png";
import { LogIn, UserPlus } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useAlertStore } from "./stores/useAlert";

function AlertSignIn() {
  const router = useRouter();
  const { isOpen, closeAlert } = useAlertStore();
  function handleLogin() {
    closeAlert();
    router.push("/login");
  }
  function handleSignIn() {
    closeAlert();
    router.push("/sign-up");
  }
  const handleChange = (open: boolean) => {
    closeAlert();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
          </DialogTitle>
          <DialogDescription>
            Pour continuer cette action, vous devriez vous connectez. S&apos;il
            vous plait choisissez une option.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleLogin}
            className="w-full sm:w-auto"
          >
            <LogIn className="mr-2 h-4 w-4" /> Se connecter
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSignIn}
            className="w-full sm:w-auto"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Créer un compte
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AlertSignIn;
