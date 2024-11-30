"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LoaderIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { register } from "@/actions/user.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { RegisterSchema } from "@/schemas/register-schema";
import { useRouter } from "next/navigation";
//import FacebookLoginButton from "./facebook-login-button"
import GithubLoginButton from "./github-login-button";

interface UserAuthFormProps {
  className?: string;
}

export default function SignUpForm({ className }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isDesactivate, setIsDesactivate] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    setIsLoading(true);
    const res = await register(data);
    if (res.success) {
      setIsLoading(false);
      toast.success("Votre compte a été avec success !!");
      router.replace("/login");
    } else {
      setIsLoading(false);
      toast.error(res.message);
    }
  }

  return (
    <div className={cn("grid gap-6 mt-3", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <div className="grid gap-0">
              <FormField
                control={form.control}
                name="email"
                //@ts-ignore
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="nom@gmail.com" className="mt-0" disabled={isLoading||isDesactivate} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-0">
              <FormField
                control={form.control}
                name="password"
                //@ts-ignore
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="mot de passe"  disabled={isLoading||isDesactivate}   />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-0">
              <FormField
                control={form.control}
                name="confirmPassword"
                //@ts-ignore
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmation mot de passe</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="confirmation mot de passe" disabled={isLoading||isDesactivate} className="mt-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading||isDesactivate} className="text-white">
              {isLoading && (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Créer mon compte
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
      <GithubLoginButton isDesactivate={isLoading}  onDesactivate={()=>setIsDesactivate(true)} />
    </div>
  );
}
