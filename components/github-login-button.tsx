"use client";
import { useState } from "react";
//import { loginWithGithub } from "@/actions/user.actions";
import { loginWithGithub } from "@/lib/api/auth/login";
import { GithubIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function GithubLoginButton({
  isDesactivate = false,
  onDesactivate,
  props,
}: {
  isDesactivate: boolean;
  onDesactivate: () => void;
  props: {
    searchParams: { callbackUrl: string | undefined };
  };
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);
    onDesactivate();
    try {
      await loginWithGithub();
    } catch (e) {
      toast.error(JSON.stringify(e) as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="border border-black text-black hover:bg-black hover:text-white"
      type="button"
      disabled={isLoading || isDesactivate}
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
