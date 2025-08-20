"use client";
import { useTrackActivity } from "@/hooks/useTrackActivity";
import { useEffect } from "react";

export type pageTrackerType = "blog" | "forum" | "app" | "event";

export const ReportView: React.FC<{ id?: string; type: pageTrackerType }> = ({
  id,
  type,
}) => {
  useEffect(() => {
    const entries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const isReload = entries[0]?.type === "reload";

    if (isReload) {
      fetch("/api/icr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, type: type }),
      });
    }
  }, []); //before [id,type]

  return null;
};
