"use client";

import { useEffect } from "react";
export type pageTrackerType = "blog" | "forum";
export const ReportView: React.FC<{ id: string; type: pageTrackerType }> = ({
  id,
  type,
}) => {
  useEffect(() => {
    fetch("/api/icr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, type: type }),
    });
  }, [id, type]);

  return null;
};
