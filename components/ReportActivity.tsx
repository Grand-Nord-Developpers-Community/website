"use client";
import { startTransition, useEffect } from "react";
import { processActivity } from "@/actions/activity.actions";

export default function ReportActivity({
  userId,
}: {
  userId: string; // Maintenant on s'attend à une valeur string valide
}) {
  useEffect(() => {
    startTransition(async () => {
      try {
        await processActivity(userId);
      } catch (e) {
        console.log(e);
      }
    });
  }, [userId]);
  return null;
}
