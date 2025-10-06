"use client";
import { useEffect, useRef } from "react";

export type pageTrackerType = "blog" | "forum" | "app" | "event";

export const ReportView: React.FC<{ id?: string; type: pageTrackerType }> = ({
  id,
  type,
}) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const trackView = async () => {
      try {
        // Create a unique key for this view in sessionStorage
        //const sessionKey = `tracked_${type}_${id || "global"}`;

        // Check if we've already tracked this view in this session
        // if (
        //   typeof window !== "undefined" &&
        //   sessionStorage.getItem(sessionKey)
        // ) {
        //   return;
        // }

        // Mark as tracked immediately to prevent race conditions
        hasTracked.current = true;

        // Track the view
        const response = await fetch("/api/icr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, type: type }),
          // Add keepalive to ensure request completes even if user navigates away
          keepalive: true,
        });

        if (response.ok && typeof window !== "undefined") {
          // Store in sessionStorage only after successful tracking
          //sessionStorage.setItem(sessionKey, "true");
        } else {
          // Reset if tracking failed so it can retry
          hasTracked.current = false;
          console.error("Failed to track view:", response.status);
        }
      } catch (error) {
        // Reset if tracking failed so it can retry
        hasTracked.current = false;
        console.error("Error tracking view:", error);
      }
    };

    // Small delay to ensure component is mounted and avoid race conditions during hydration
    const timeoutId = setTimeout(trackView, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, type]);

  return null;
};
