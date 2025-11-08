'use client';

import dynamic from "next/dynamic";

const SyntaxHighlighter = dynamic(() => import("./SyntaxHighlighter"), {
  ssr: false,
});

interface Props {
  language: string;
  content: string;
}

export default function ClientSyntaxHighlighter({ language, content }: Props) {
  return <SyntaxHighlighter language={language} content={content} />;
}