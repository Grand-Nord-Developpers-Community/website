"use client";
import React, { useRef, useEffect, useState } from "react";
import { Editor, EditorRef } from "@/components/editor";
import { Content } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/providers/BlogFormContext";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
export default function Home() {
  const editorRef = useRef<EditorRef>();
  const [editorValue, setEditorValue] = useState<Content>("");
  const { form, loading, success } = useFormContext();
  const { setValue } = form;
  useEffect(() => {
    if (!loading && success) {
      setValue("content", "", { shouldValidate: true });
      setEditorValue("");
    }
  }, [loading, success]);
  return (
    <React.Fragment>
      <main className="w-full h-full">
        <Editor
          //@ts-ignore
          ref={editorRef}
          wrapperClassName="flex flex-col h-full overflow-hidden"
          contentClassName="max-w-6xl mx-auto w-full h-[calc(100vh-95px)] overflow-y-auto overflow-x-hidden"
          fixedMenuClassName="border-b border-gray-200 w-full"
          toolBarClassName="w-full max-w-6xl mx-auto px-8  z-0 backdrop-none border-none"
          footerClassName="bg-toolbar  "
          content={editorValue}
          disableEditor={loading}
          editorProps={{
            attributes: {
              class:
                "py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert",
            },
          }}
          onUpdate={({ editor }) => {
            const html = !editor.isEmpty ? editor.getHTML() : "";
            setEditorValue(html);
            setValue("content", html, { shouldValidate: true });
          }}
        />
      </main>
    </React.Fragment>
  );
}
