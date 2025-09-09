"use client";

import { useState } from "react";
import type { JobPayloads } from "@/workers/jobs";
import { addJob } from "@/actions/qeues.action";
import { toast } from "sonner";

const events: (keyof JobPayloads)[] = [
  "BLOG_CREATED",
  "BLOG_LIKED",
  "COMMENT_ADDED",
  "FORUM_CREATED",
  "UPVOTED",
  "USER_NEW",
  "CUSTOM_EVENT",
];

export default function TestWorkerPage() {
  const [event, setEvent] = useState<keyof JobPayloads>("BLOG_CREATED");

  async function handleTrigger() {
    // Provide mock data for each case
    //@ts-ignore
    //https://gndc.tech/blog/$%7BblogId%7D
    const mockData: JobPayloads[typeof event] = (() => {
      switch (event) {
        case "BLOG_CREATED":
          return { blogId: "b1", title: "My Blog", authorId: "u1" };
        case "BLOG_LIKED":
          return { blogId: "b1", userId: "u2" };
        case "COMMENT_ADDED":
          return { commentId: "c1", blogId: "b1", userId: "u3" };
        case "FORUM_CREATED":
          return { forumId: "f1", creatorId: "u4" };
        case "UPVOTED":
          return { forumId: "f1", updaterId: "u5" };
        case "USER_NEW":
          return { userId: "c2" };
        case "CUSTOM_EVENT":
          return { payload: { test: true, timestamp: Date.now() } };
      }
    })();
    const r = await addJob(event, mockData);
    toast.message(JSON.stringify(r));
    // try {
    // } catch (error) {
    //   toast.error(JSON.stringify(error));
    // }
    //alert(`Triggered job: ${event}`);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Test Worker Jobs</h1>

      <select
        value={event}
        onChange={(e) => setEvent(e.target.value as keyof JobPayloads)}
        className="border rounded p-2"
      >
        {events.map((ev) => (
          <option key={ev} value={ev}>
            {ev}
          </option>
        ))}
      </select>

      <button
        onClick={handleTrigger}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Trigger
      </button>
    </div>
  );
}
