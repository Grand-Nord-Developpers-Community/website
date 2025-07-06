import { useEffect } from "react";

export function useTrackActivity() {
  useEffect(() => {
    const last = localStorage.getItem("last_activity_call");
    const now = Date.now();
    if (last && now - parseInt(last) < 1000 * 60 * 5) return;

    fetch("/api/activity", { method: "POST" });
    localStorage.setItem("last_activity_call", now.toString());
  }, []);
}
