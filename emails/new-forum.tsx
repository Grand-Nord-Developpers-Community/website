import { Button, Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl } from "./base-layout";
import { cn } from "@/lib/utils";

export interface NewForumProps {
  title: string;
  author: string;
  id: string;
  userName: string;
}

export default function NewForum({
  title,
  author,
  id,
  userName,
}: NewForumProps) {
  return (
    <LayoutEmail title={`${title}`}>
      <Section className="text-[#3c4149]">
        <Text>Salut {userName} ,</Text>
        <Text>{author} vient de poser une question :</Text>
        <Heading className="py-2 font-bold">{title}</Heading>
        <Button
          className={cn(
            "px-4 py-3 text-small gap-2 rounded-medium",
            "inline-flex items-center justify-center",
            "rounded-md bg-blue-500 text-white"
          )}
          href={`${baseUrl}/forum/${id}`}
        >
          Consulter la question
        </Button>
      </Section>
    </LayoutEmail>
  );
}
