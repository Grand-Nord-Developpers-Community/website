"use client";

import { loginWithGithub } from "@/actions/user.actions";
import { GithubIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function GithubLoginButton({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  const router = useRouter();

  const onClick = () => {
    loginWithGithub();
  };

  return (
    <Button
      variant="outline"
      className="border border-black text-black hover:bg-black hover:text-white"
      type="button"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GithubIcon className="mr-2 h-4 w-4" />
      )}{" "}
      GitHub
    </Button>
  );
}
