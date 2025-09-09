"use server";
import type { JobPayloads } from "@/workers/jobs";
import { notificationQueue } from "@/workers";

export async function addJob<K extends keyof JobPayloads>(
  name: K,
  data: JobPayloads[K]
) {
  console.log("==== fired notifQue ====");
  console.log(name, data);
  return notificationQueue.add(name, data);
}
