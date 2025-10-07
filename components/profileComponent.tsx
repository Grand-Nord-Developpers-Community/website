"use client";
import { useState } from "react";
import Image from "next/image";
import { LoaderIcon } from "lucide-react";
import { updateUserProfileCompletion } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeProfileSchema } from "@/schemas/profile-schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Logo from "@/assets/images/brand/logo.png";
import LogoDark from "@/assets/images/brand/logo-dark.png";
import { fetcher } from "@/lib/utils";
import { preload } from "swr";
import { toast } from "sonner";
type ProfileFormData = z.infer<typeof completeProfileSchema>;
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SessionUser } from "@/lib/db/schema";
export default function ProfileCompletion({ user }: { user: SessionUser }) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      username: user.username ?? "",
      name: user.name ?? "",
      bio: user?.bio ?? "",
      websiteLink: "",
    },
  });
  const { setError } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  async function onSubmit(data: ProfileFormData) {
    setIsLoading(true);
    try {
      const res = await updateUserProfileCompletion(user.id, data);

      if (res.success) {
        //router.replace("/user/dashboard")
        preload("/api/user/profile", fetcher);
        //router.push("/user");
        router.replace("/user/dashboard");
        //setIsLoading(false);
        //window.location.href = "/user/";
      } else {
        if (res.username) {
          setError("username", {
            message: "ce username est déjà pris !!",
          });
        } else {
          console.log(res.message);
          //toast.error(JSON.stringify(res.message) as string);
        }
      }
    } catch (e) {
      console.log(e);
      //toast.error(JSON.stringify(e) as string);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <Image
        src="/bg-complete.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={50}
        className="z-0"
      />

      <div className="relative z-20 w-full max-w-md">
        <Image
          loading="lazy"
          className="mx-auto my-3 "
          src={Logo}
          alt="logo GNDC"
          width={130}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="backdrop-blur-md bg-card bg-opacity-90 rounded-lg p-4 shadow-lg border border-border border-opacity-30 space-y-2"
          >
            <h2 className="text-2xl max-sm:text-md font-bold text-center text-primary mb-6">
              Completer votre profile
            </h2>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identifiant (unique)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Votre @pseudo unique"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Votre nom"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Écrivez quelques phrases sur vous même"
                      //className="bg-white"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre site web (optionnel) </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://votre-site.com"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              completer
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
