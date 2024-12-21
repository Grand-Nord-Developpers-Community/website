"use client"
import { EditorRender } from "@/components/minimal-tiptap";

export default function RenderContent({content}:{content:string}) {
  return (
    <>
                    <EditorRender 
                      className={"h-full pb-5 min-h-10 w-full rounded-xl"}
                      editorContentClassName="overflow-auto h-full flex grow"
                      editable={false}
                      value={content}
                      editorClassName="focus:outline-none h-full grow"
                    />

    </>
  )
}

