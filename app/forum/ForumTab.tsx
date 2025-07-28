"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

export function ForumTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.push(`/forum?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={tab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="all">Tout</TabsTrigger>
        <TabsTrigger value="unanswered">Pas de réponse</TabsTrigger>
        <TabsTrigger value="answered">Avec réponse</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
