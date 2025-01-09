"use client";

import { logout } from "@/lib/api/auth/logout";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

export const LogoutButton = () => {
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await logout();
    },
  });
  return (
    <Button
      onPress={() => logoutMutation.mutate()}
      isLoading={logoutMutation.isPending}>
      Logout
    </Button>
  );
};
