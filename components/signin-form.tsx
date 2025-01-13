"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

//import { login } from "@/actions/user.actions";
import { loginWithPassword } from "@/lib/api/auth/login";
import { redirect } from "next/navigation";
//import { signIn, auth, providerMap } from "@/lib/auth"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { LoginSchema } from "@/schemas/login-schema";
import { useRouter } from "next/navigation";
//import FacebookLoginButton from "./facebook-login-button"
import ProviderButton from "./github-login-button";

interface UserAuthFormProps {
  className?: string;
  props: {
    searchParams: { callbackUrl: string | undefined };
  };
}
export default function SignIn({ className, props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDesactivate, setIsDesactivate] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    try {
      const res = await loginWithPassword(data);
      //if (res.data) {
      toast.success("<Bienvenue/> !!");
      router.replace(res?.data?.redirectUrl);
        // window.location.href = "/account/complete";
      //}
    } catch (e) {
      console.log(e)
      toast.error(JSON.stringify(e));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6 mt-3", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                //@ts-ignore
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="nom@email.com"
                        disabled={isLoading || isDesactivate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                //@ts-ignore
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="mot de passe"
                        disabled={isLoading || isDesactivate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || isDesactivate}
              variant="secondary"
            >
              {isLoading && (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Se connecter
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative ">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Ou continuez avec
          </span>
        </div>
      </div>
      {/* {Object.values(providerMap).map((provider) => (
        <form
          action={async () => {
            "use server"
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`/error-auth?error=${error.type}`)
              }
 
              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))} */}
      <ProviderButton
        isDesactivate={isLoading}
        onDesactivate={() => setIsDesactivate(true)}
        props={props}
      />
      {/* <GithubLoginButton
        isDesactivate={isLoading}
        onDesactivate={() => setIsDesactivate(true)}
      /> */}
    </div>
  );
}
