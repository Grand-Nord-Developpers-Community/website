"use client";
import React, { useRef, useState } from "react";
import { Editor, EditorRef } from "@/components/editor";
import { Controller, useForm } from "react-hook-form";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Content } from "@tiptap/react";
import { cn } from "@/lib/utils";
export default function Home() {
  const editorRef = useRef<EditorRef>();
  const [value, setValue] = useState<Content>("");
  return (
    <React.Fragment>
      <main className="w-full h-full">
        <Editor
              ref={editorRef}
              wrapperClassName='flex flex-col h-full overflow-hidden'
              contentClassName='max-w-6xl mx-auto w-full h-[calc(100vh-95px)] overflow-y-auto overflow-x-hidden'
              fixedMenuClassName='border-b border-gray-200 w-full'
              toolBarClassName="w-full max-w-6xl mx-auto px-8  z-0 backdrop-none border-none"
              footerClassName="bg-toolbar  "
              content={"<h1>hello</h1><p>lol</p><pre><code class=\"language-javascript\">const person = {\n    name: 'John',\n    age: 30,\n    greet() {\n        console.log('Hello, ' + this.name);\n    }\n};</code></pre>"}
              editorProps={{
                attributes: {
                  class:
                    "py-6 px-8 prose prose-base prose-blue prose-headings:scroll-mt-[80px] dark:prose-invert",
                },
              }}
              onUpdate={({ editor }) => {
                const html = !editor.isEmpty ? editor.getHTML() : "";
                setValue(html);
              }}
            /> 
        {/*<MinimalTiptapEditor
          throttleDelay={0}
          className={cn("w-full h-full border-none", {
            //'border-destructive focus-within:border-destructive': form.formState.errors.description
          })}
          editorContentClassName="max-w-6xl mx-auto w-full h-[calc(100vh-50px)] overflow-y-auto overflow-x-hidden"
          output="html"
          content={"<h1>hello</h1><p>lol</p>"}
          placeholder="Type your description here..."
          //onCreate={handleCreate}
          autofocus={true}
          immediatelyRender={true}
          editable={true}
          injectCSS={true}
          editorClassName="focus:outline-none p-5"
        />*/}
      </main>
    </React.Fragment>
  );
}
