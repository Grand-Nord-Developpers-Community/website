"use server";
import type { JobPayloads } from "@/workers/jobs";
import { notificationQueue } from "@/workers";
import { handlers } from "@/workers/handler";

export async function addJob<K extends keyof JobPayloads>(
  name: K,
  data: JobPayloads[K]
) {
  console.log("==== fired notifQue ====");
  console.log(name, data);
  //without bullMq first
  //const handler = handlers[name as keyof JobPayloads];
  //@ts-ignore
  //return handler(data);
  return notificationQueue.add(name, data);
}
