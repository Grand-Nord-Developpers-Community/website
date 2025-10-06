"use client";
import { useEffect, useRef } from "react";
import { processActivity } from "@/actions/activity.actions";

export default function ReportActivity({
  userId,
}: {
  userId: string; // Maintenant on s'attend à une valeur string valide
}) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const trackView = async () => {
      try {
        // Create a unique key for this view in sessionStorage
        const sessionKey = `tracked_${userId}`;

        // Check if we've already tracked this view in this session
        if (
          typeof window !== "undefined" &&
          sessionStorage.getItem(sessionKey)
        ) {
          return;
        }

        // Mark as tracked immediately to prevent race conditions
        hasTracked.current = true;

        // Track the view
        const response = await processActivity(userId);

        if (response.success && typeof window !== "undefined") {
          // Store in sessionStorage only after successful tracking
          sessionStorage.setItem(sessionKey, "true");
        } else {
          // Reset if tracking failed so it can retry
          hasTracked.current = false;
          console.error("Failed to track user:");
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
  }, [userId]);

  return null;
}
