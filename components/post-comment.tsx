"use client";
import React, { useState, useCallback } from "react";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Comment from "@/components/commentComponent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
//import { MinimalTiptapEditor } from "./minimal-tiptap";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addpostComment, createForumPost } from "@/actions/forum.actions";
import { getUserSession } from "@/actions/user.actions";
type FormValues = z.infer<typeof commentSchema>;
import type { Editor } from "@tiptap/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { commentSchema } from "@/schemas/comment-schema";
import { Content } from "@radix-ui/react-dropdown-menu";

// const MinimalTiptapEditor = dynamic(
//   () =>
//     import("./minimal-tiptap/minimal-tiptap").then((module) => module.default),
//   {
//     ssr: false,
//   }
// );
interface Props {
  postId: string;
  parentId?: string | null;
  content?: string;
  onSucessCallBack?: () => void;
}

export default function ForumPostComponent({
  onSucessCallBack,
  postId,
  parentId = null,
  content = "",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      parentId: parentId,
      postId: postId,
      content: content,
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
        const res = await addpostComment(form.getValues());

        //);
        /*if (res.sucess) {
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
        }*/
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu de votre question</FormLabel>
                <FormControl>
                  <Comment
                    {...field}
                    throttleDelay={1000}
                    className={cn("h-[200px] min-h-56 w-full rounded-xl", {
                      "border-destructive focus-within:border-destructive":
                        form.formState.errors.content,
                    })}
                    editorContentClassName="overflow-auto h-full"
                    output="html"
                    placeholder="Comment here..."
                    editable={!loading}
                    onCreate={handleCreate}
                    injectCSS={true}
                    immediatelyRender={true}
                    editorClassName="focus:outline-none px-5 py-4 h-full"
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
    </>
  );
}
