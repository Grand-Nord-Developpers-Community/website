"use client";

import { logout } from "@/lib/api/auth/logout";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const onLogoutClick = async () => {
    try {
      await logout();
    } catch (e) {
      toast(e as string);
    }
  };

  return (
    <>
      <Button onClick={onLogoutClick}>Sign out</Button>
    </>
  );
}
