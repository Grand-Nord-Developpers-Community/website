"use server";

import { db } from "@/lib/db";
import { userActivity } from "@/lib/db/schema";
import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

const redis = Redis.fromEnv();

export async function getActivity(userId: string) {
  const activity = await db.query.userActivity.findFirst({
    columns: {
      id: false,
      userId: false,
    },
    where: eq(userActivity.userId, userId),
  });

  const isOnline = await redis.get<boolean>(`user:${userId}:is_online`);
  const lastSeenRedis = await redis.get<number>(`user:${userId}:last_seen`);

  const defaultActivity = {
    lastSeen: new Date(),
    currentStreak: 1,
    lastActiveDate: new Date(),
    totalDaysActive: 1,
  };

  return {
    activity: activity ?? defaultActivity,
    isOnline: !!isOnline,
    lastSeen: lastSeenRedis
      ? new Date(lastSeenRedis)
      : (activity?.lastSeen ?? defaultActivity.lastSeen),
  };
}

export async function getAnalytics(userId: string) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  console.log(userId);
  // Update Redis
  await redis.set(`user:${userId}:last_seen`, Date.now());
  await redis.set(`user:${userId}:is_online`, true, { ex: 300 });

  // Use Redis to avoid writing too often
  const lastWrite = await redis.get<string>(`user:${userId}:last_write`);
  const now = Date.now();
  if (lastWrite && now - parseInt(lastWrite) < 1000 * 60 * 30) {
    return new Response("Too soon", { status: 200 });
  }
  await redis.set(`user:${userId}:last_write`, now.toString());

  const [activity] = await db
    .select()
    .from(userActivity)
    .where(eq(userActivity.userId, userId));

  if (!activity) {
    await db.insert(userActivity).values({
      userId: userId,
      lastSeen: new Date(),
      currentStreak: 1,
      lastActiveDate: new Date(today),
      totalDaysActive: 1,
    });
  } else {
    const lastActive = new Date(activity.lastActiveDate);
    const lastActiveStr = lastActive.toISOString().slice(0, 10);

    if (lastActiveStr === today) {
      await db
        .update(userActivity)
        .set({ lastSeen: new Date() })
        .where(eq(userActivity.userId, userId));
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday =
        lastActive.toDateString() === yesterday.toDateString();

      await db
        .update(userActivity)
        .set({
          lastSeen: new Date(),
          lastActiveDate: new Date(today),
          currentStreak: isYesterday ? activity.currentStreak + 1 : 1,
          totalDaysActive: activity.totalDaysActive + 1,
        })
        .where(eq(userActivity.userId, userId));
    }
  }
}
export async function processActivity(userId: string) {
  const cookieStore = cookies();
  const cookieKey = `activity_last_processed_${userId}`;
  const lastProcessed = cookieStore.get(cookieKey)?.value;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (lastProcessed === today) {
    console.log("saved !!");
    return;
  }
  console.log("nope");
  const [activity] = await db
    .select()
    .from(userActivity)
    .where(eq(userActivity.userId, userId));

  const now = new Date();
  const defaultActivity = {
    userId: userId,
    lastSeen: now,
    currentStreak: 1,
    lastActiveDate: now,
    totalDaysActive: 1,
  };

  if (!activity) {
    await db.insert(userActivity).values(defaultActivity);
  } else {
    const last = new Date(activity.lastActiveDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const newStreak =
      last.toDateString() === yesterday.toDateString()
        ? activity.currentStreak + 1
        : 1;

    await db
      .update(userActivity)
      .set({
        lastSeen: now,
        currentStreak: newStreak,
        lastActiveDate: now,
        totalDaysActive: activity.totalDaysActive + 1,
      })
      .where(eq(userActivity.userId, userId));
  }

  await redis.set(`user:${userId}:last_seen`, Date.now());
  await redis.set(`user:${userId}:is_online`, true, { ex: 300 });

  cookieStore.set(cookieKey, today, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
  });
}
