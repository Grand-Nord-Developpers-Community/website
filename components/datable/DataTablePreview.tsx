"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PreviewProps = {
  title: string;
  /** Any React node – you can pass a mini DataTable or a simple list */
  content: React.ReactNode;
  /** CTA to full page */
  fullHref: string;
  /** optional footer extra */
  footerExtra?: React.ReactNode;
};

export default function DataTablePreview({
  title,
  content,
  fullHref,
  footerExtra,
}: PreviewProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex items-center justify-between">
        {footerExtra ?? <span />}
        <Link href={fullHref}>
          <Button variant="outline" size="sm">
            Voir tout
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
