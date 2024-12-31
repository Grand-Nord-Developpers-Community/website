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
import { fetcher } from "@/lib/utils";
import {preload} from "swr";
import {toast} from "sonner"
type ProfileFormData = z.infer<typeof completeProfileSchema>;
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
export default function ProfileCompletion({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router=useRouter()
  async function onSubmit(data: ProfileFormData) {
    setIsLoading(true);
    const res = await updateUserProfileCompletion(userId, data);

    if (res.success) {
      //router.replace("/user/dashboard")
      preload('/api/user/profile', fetcher);
      router.push("/user");
      //setIsLoading(false);
      //window.location.href = "/user/";
    } else {
      setIsLoading(false);
      toast.error(res.message);
    }
  }
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      name: "",
      bio: "",
      websiteLink: "",
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <Image
        src="/bg-complete.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="relative z-20 w-full max-w-md">
        <Image
          loading="lazy"
          src={Logo}
          alt="logo GNDC"
          className="mx-auto my-3"
          width={130}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="backdrop-blur-md bg-white bg-opacity-90 rounded-lg p-4 shadow-lg border border-white border-opacity-30 space-y-2"
          >
            <h2 className="text-2xl max-sm:text-md font-bold text-center text-primary mb-6">
              Completer votre profile
            </h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Votre nom ou pseudo"
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
                      className="bg-white"
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
