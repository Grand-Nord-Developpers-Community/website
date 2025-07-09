"use client";
import { startTransition, useEffect } from "react";
import { processActivity } from "@/actions/activity.actions";

export default function ReportActivity({
  userId,
}: {
  userId: string | undefined;
}) {
  useEffect(() => {
    if (userId) {
      startTransition(async () => {
        await processActivity(userId);
      });
    }
  }, []);
  return null;
}
