"use client";
import React, { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/images/brand/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogIn, UserPlus } from "lucide-react";
import { z } from "zod";
import { MinimalTiptapEditor } from "./minimal-tiptap";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { forumPublishSchema } from "@/schemas/forum-schema";
import { toast } from "sonner";
import { createForumPost } from "@/actions/forum.actions";
import { getUserSession } from "@/actions/user.actions";
type FormValues = z.infer<typeof forumPublishSchema>;
import type { Editor } from "@tiptap/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface Props {
  onSucessCallBack?: () => void;
}
export default function ForumPostComponent({ onSucessCallBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(forumPublishSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const session = await getUserSession();
    if (session) {
      try {
        const res = await createForumPost(values.title, values.content);
        if (res.sucess) {
          toast.message("Votre question à été soumis avec succès !!");
          form.reset();
          setTimeout(() => {
            console.log("==Clearing editor==");
            editorRef.current?.commands.clearContent();
            console.log("Success: Editor cleared");
          }, 2000);

          setTimeout(() => {
            console.log("==Resetting editor==");
            editorRef.current?.commands.setContent("");
            console.log("Success: Editor reset");
          }, 3000);

          if (onSucessCallBack) onSucessCallBack();
        }
        setTimeout(() => {}, 2000);
      } catch (e) {
        console.log("Erreur : " + e);
        toast.message("Une erreure est survenu : " + e);
      } finally {
        setLoading(false);
      }
    } else {
      setOpen(true);
    }
  };
  function handleLogin() {
    setOpen(false);
    router.push("/login");
  }
  function handleSignIn() {
    setOpen(false);
    router.push("/sign-up");
  }

  function handleChange(v: boolean) {
    setLoading(false);
    setOpen(v);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre de votre question</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Titre de la question"
                    className={cn("w-full", {
                      "border-destructive focus-visible:ring-0":
                        form.formState.errors.title,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu de votre question</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    //@ts-ignore
                    ref={editorRef}
                    throttleDelay={0}
                    className={cn("h-full min-h-56 w-full rounded-xl", {
                      "border-destructive focus-within:border-destructive":
                        form.formState.errors.content,
                    })}
                    editorContentClassName="overflow-auto h-full flex grow"
                    output="html"
                    placeholder="Saisir votre question ..."
                    editable={!loading}
                    //onCreate={handleCreate}
                    injectCSS={true}
                    immediatelyRender={true}
                    editorClassName="focus:outline-none px-5 py-4 h-full grow"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="w-full"
            disabled={loading}
            onClick={() => {
              form.handleSubmit(onSubmit)();
            }}
          >
            {loading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            Envoyer
          </Button>
        </form>
      </Form>
      <Dialog open={open} onOpenChange={handleChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
            </DialogTitle>
            <DialogDescription>
              Pour continuer cette action, vous devriez vous connectez.
              S&apos;il vous plait choisissez une option.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleLogin}
              className="w-full sm:w-auto"
            >
              <LogIn className="mr-2 h-4 w-4" /> Se connecter
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignIn}
              className="w-full sm:w-auto"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Créer un compte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
