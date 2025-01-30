"use client";
import * as React from "react";
import "./minimal-tiptap/styles/index.css";

import type { Content, Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MeasuredContainer } from "./minimal-tiptap/components/measured-container";
import SectionFive from "./minimal-tiptap/components/section/five";
import SectionFour from "./minimal-tiptap/components/section/four";
import SectionTwo from "./minimal-tiptap/components/section/two";
import useMinimalTiptapEditor, {
  UseMinimalTiptapEditorProps,
} from "./minimal-tiptap/hooks/use-minimal-tiptap";
import { LinkBubbleMenu } from "./minimal-tiptap/components/bubble-menu/link-bubble-menu";
export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
  clearContent?: boolean;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border py-2 pl-4 pr-10">
    <div className="flex max-w-6xl mx-auto w-full items-center gap-px">
      <SectionTwo
        editor={editor}
        activeActions={[
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
          "clearFormatting",
        ]}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={["orderedList", "bulletList"]}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={["codeBlock", "blockquote"]}
        mainActionCount={0}
      />
    </div>
  </div>
);

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(
  (
    {
      value,
      onChange,
      clearContent,
      className,
      editorContentClassName,
      ...props
    },
    ref
  ) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props,
    });

    React.useEffect(() => {
      if (clearContent) {
        setTimeout(() => {
          editor?.commands.clearContent();
        }, 1000);
        setTimeout(() => {
          editor?.commands.setContent("");
        }, 1000);
      }
    }, [clearContent]);

    if (!editor) {
      return null;
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
          className
        )}
      >
        <Toolbar editor={editor} />
        <EditorContent
          editor={editor}
          className={cn("minimal-tiptap-editor", editorContentClassName)}
        />
        <LinkBubbleMenu editor={editor} />
      </MeasuredContainer>
    );
  }
);

export const EditorRender = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
    immediatelyRender: true,
  });

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        "flex h-auto min-h-72 w-full flex-col border-input focus-within:border-primary",
        className
      )}
    >
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor", editorContentClassName)}
      />
    </MeasuredContainer>
  );
});

EditorRender.displayName = "EditorRender";

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
