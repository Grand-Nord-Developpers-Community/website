import { ScoringPoints } from "@/constants/scoring";
import { db } from "@/lib/db";
import { userTable as user } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export type ActionType = keyof typeof ScoringPoints;
export async function addUserXP(userId: string, action: ActionType) {
  const points = (ScoringPoints[action] as number) ?? 0;

  if (points === 0) return;

  await db
    .update(user)
    .set({ experiencePoints: sql`${user.experiencePoints} + ${points}` })
    .where(eq(user.id, userId));
}
export async function removeUserXP(userId: string, action: ActionType) {
  const points = ScoringPoints[action];
  if (!points) return;

  await db
    .update(user)
    .set({
      experiencePoints: sql`${user.experiencePoints} - ${points}`,
    })
    .where(eq(user.id, userId));
}
