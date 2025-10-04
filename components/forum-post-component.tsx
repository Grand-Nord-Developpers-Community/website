"use client";
import React, { useState, useCallback } from "react";
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
//import { MinimalTiptapEditor } from "./minimal-tiptap";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { forumPublishSchema } from "@/schemas/forum-schema";
import { toast } from "sonner";
import { createForumPost, updateForumPost } from "@/actions/forum.actions";
import { getUserSession } from "@/actions/user.actions";
type FormValues = z.infer<typeof forumPublishSchema>;
import type { Editor } from "@tiptap/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Forum } from "./question-card";
import MinimalTiptapEditor from "./minimal-tiptap/minimal-tiptap";

// const MinimalTiptapEditor = dynamic(
//   () =>
//     import("./minimal-tiptap/minimal-tiptap").then((module) => module.default),
//   {
//     ssr: false,
//   }
// );
interface Props {
  forum?: {
    id: string;
    title: string;
    content: string;
  };
  onSucessCallBack?: () => void;
}

export default function ForumPostComponent({ forum, onSucessCallBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(forumPublishSchema),
    defaultValues: {
      title: forum?.title || "",
      content: forum?.content || "",
    },
  });
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const session = await getUserSession();
    if (session) {
      try {
        //const text = editorRef.current?.getHTML();
        if (textContent && textContent?.length < 10) {
          throw "Entrer aussi du texte !!!";
        }
        //toast.message(textContent);

        const res = !forum
          ? await createForumPost(values.title, values.content, textContent!)
          : await updateForumPost(
              forum.id,
              values.title,
              values.content,
              textContent!
            );
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

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("content") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("content"));
      }
      editorRef.current = editor;
    },
    [form]
  );

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
                    throttleDelay={0}
                    className={cn(
                      "h-full min-h-56 max-h-40  w-full rounded-xl",
                      {
                        "border-destructive focus-within:border-destructive":
                          form.formState.errors.content,
                      }
                    )}
                    editorContentClassName="w-full overflow-auto h-full flex grow"
                    output="html"
                    placeholder="Saisir votre question ..."
                    editable={!loading}
                    onCreate={handleCreate}
                    injectCSS={true}
                    immediatelyRender={true}
                    editorClassName="focus:outline-none px-5 py-4 h-full grow w-full"
                    onTransaction={(t) => {
                      setTextContent(t.editor.getText());
                      //toast.message(t.editor.getText());
                    }}
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
            {!forum ? "Envoyer" : "Modifier"}
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
