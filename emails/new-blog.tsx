import { Button, Heading, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl } from "./base-layout";
import { cn } from "@/lib/utils";

export interface NewBlogProps {
  title: string;
  author: string;
  slug: string;
  adminName: string;
}

export default function NewBlog({
  title,
  author,
  slug,
  adminName,
}: NewBlogProps) {
  return (
    <LayoutEmail title={`${title}`}>
      <Section className="text-[#3c4149]">
        <Text>Salut {adminName} ,</Text>
        <Text>{author} vient d'écrire un nouveau blog :</Text>
        <Heading className="text-lg py-2 font-normal">{title}</Heading>
        <Button
          className={cn(
            "px-4 py-3 text-small gap-2 rounded-medium",
            "inline-flex items-center justify-center",
            "rounded-md bg-blue-500 text-white"
          )}
          href={`${baseUrl}/blog/${slug}/preview`}
        >
          Voir le blog
        </Button>
      </Section>
    </LayoutEmail>
  );
}
