"use client";
import { useState } from "react";
//import { loginWithGithub } from "@/actions/user.actions";
import GoogleLogo from "@/assets/svgs/google-logo.svg";
import { loginWithGoogle } from "@/lib/api/auth/login";
import { GithubIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function GoogleLoginButton({
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
      await loginWithGoogle();
    } catch (e) {
      toast.error(JSON.stringify(e) as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      className="border border-gray-400"
      type="button"
      disabled={isLoading || isDesactivate}
      onClick={onClick}
    >
      {isLoading ? (
        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GoogleLogo className="mr-2 h-4 w-4" />
      )}{" "}
      Connecter vous avec Google
    </Button>
  );
}
