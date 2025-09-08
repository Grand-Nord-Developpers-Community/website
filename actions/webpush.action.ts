"use server";
import { eq } from "drizzle-orm";
import { devicesTable } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function subscribeUser(sub: any) {
  const { user } = await auth();
  if (!user) {
    return {
      success: false,
      message: "user-not-auth",
    };
  }

  const existingSubscription = await db.query.devicesTable.findFirst({
    where: eq(devicesTable.userId, user.id),
  });

  if (existingSubscription) {
    await db
      .update(devicesTable)
      .set({
        pushSubscription: sub,
      })
      .where(eq(devicesTable.id, existingSubscription.id));
  } else {
    await db.insert(devicesTable).values({
      pushSubscription: sub,
      userId: user.id,
    });
  }

  return { success: true };
}
