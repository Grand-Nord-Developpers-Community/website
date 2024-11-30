"use client"
import {cn} from "@/lib/utils"
import {useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoaderIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { login } from "@/actions/user.actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { LoginSchema } from "@/schemas/login-schema"
import { useRouter } from "next/navigation"
//import FacebookLoginButton from "./facebook-login-button"
import GithubLoginButton from "./github-login-button"

interface UserAuthFormProps {
  className?: string;
}
export default function SignIn({ className }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDesactivate, setIsDesactivate] = useState<boolean>(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    const res = await login(data)
	
    if (res.success) {
      setIsLoading(false);
      toast.success("<Bienvenue/> !!");
      //router.replace("/user/dashboard")
      window.location.href = "/account/complete"
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
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                //@ts-ignore
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="nom@email.com" disabled={isLoading||isDesactivate} />
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
                      <Input  {...field} type="password" placeholder="mot de passe" disabled={isLoading||isDesactivate} />
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
      <GithubLoginButton isDesactivate={isLoading}  onDesactivate={()=>setIsDesactivate(true)} />
    </div>
  )
}
