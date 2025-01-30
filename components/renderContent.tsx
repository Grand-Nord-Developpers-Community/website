"use client";
import { EditorRender } from "@/components/minimal-tiptap";
interface Props {
  value: string;
  isEditable?: boolean;
  handleChangeCallback?: (v: string) => void;
  placeholder?: string;
}
export default function RenderContent({
  value,
  isEditable = false,
  handleChangeCallback,
  placeholder,
}: Props) {
  return (
    <>
      <EditorRender
        className={"h-full pb-5 min-h-20 w-full rounded-xl"}
        editorContentClassName="overflow-auto h-full flex grow"
        editable={isEditable}
        placeholder={placeholder ?? ""}
        onChange={(v) => {
          if (handleChangeCallback) {
            handleChangeCallback(v as string);
          }
        }}
        value={value}
        editorClassName="focus:outline-none h-full grow"
      />
    </>
  );
}
