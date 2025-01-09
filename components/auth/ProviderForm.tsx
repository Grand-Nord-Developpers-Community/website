"use client";

import { loginWithGithub, loginWithGoogle } from "@/lib/api/auth/login";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const ProviderForm = () => {
  const githubMutation = useMutation({
    mutationFn: async () => {
      return await loginWithGithub();
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  const googleMutation = useMutation({
    mutationFn: async () => {
      return await loginWithGoogle();
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <Button
        onPress={() => googleMutation.mutate()}
        isLoading={googleMutation.isPending}
        startContent={<Icon icon="flat-color-icons:google" width={24} />}
        variant="flat">
        Continue with Google
      </Button>
      <Button
        onPress={() => githubMutation.mutate()}
        isLoading={githubMutation.isPending}
        startContent={
          <Icon className="text-default-500" icon="fe:github" width={24} />
        }
        variant="flat">
        Continue with Github
      </Button>
    </div>
  );
};
