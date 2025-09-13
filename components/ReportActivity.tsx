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
        try {
          await processActivity(userId);
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, []);
  return null;
}
