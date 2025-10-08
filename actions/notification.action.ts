"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notificationPreferencesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface UpdatePreferencesInput {
  emailBlogUpdates: boolean;
  emailForumsQuestion: boolean;
  emailNewsHebdomadaire: boolean;
  emailLeaderboardHebdomadaire: boolean;
  notifBlogUpdates: boolean;
  notifForumsQuestion: boolean;
  notifNewsHebdomadaire: boolean;
  notifLeaderboardHebdomadaire: boolean;
  notifUpvote: boolean;
  notifComment: boolean;
  notifBlogLike: boolean;
}

export async function updateNotificationPreferences(
  data: UpdatePreferencesInput,
  userId: string
) {
  try {
    // Vérifier si les préférences existent déjà
    const existingPreferences = await db
      .select()
      .from(notificationPreferencesTable)
      .where(eq(notificationPreferencesTable.userId, userId))
      .limit(1);

    if (existingPreferences.length > 0) {
      // Mettre à jour les préférences existantes
      await db
        .update(notificationPreferencesTable)
        .set({
          emailBlogUpdates: data.emailBlogUpdates,
          emailForumsQuestion: data.emailForumsQuestion,
          emailNewsHebdomadaire: data.emailNewsHebdomadaire,
          emailLeaderboardHebdomadaire: data.emailLeaderboardHebdomadaire,
          notifBlogUpdates: data.notifBlogUpdates,
          notifForumsQuestion: data.notifForumsQuestion,
          notifNewsHebdomadaire: data.notifNewsHebdomadaire,
          notifLeaderboardHebdomadaire: data.notifLeaderboardHebdomadaire,
          notifUpvote: data.notifUpvote,
          notifComment: data.notifComment,
          notifBlogLike: data.notifBlogLike,
          updatedAt: new Date(),
        })
        .where(eq(notificationPreferencesTable.userId, userId));
    } else {
      // Créer de nouvelles préférences
      await db.insert(notificationPreferencesTable).values({
        id: crypto.randomUUID(),
        userId,
        emailBlogUpdates: data.emailBlogUpdates,
        emailForumsQuestion: data.emailForumsQuestion,
        emailNewsHebdomadaire: data.emailNewsHebdomadaire,
        emailLeaderboardHebdomadaire: data.emailLeaderboardHebdomadaire,
        notifBlogUpdates: data.notifBlogUpdates,
        notifForumsQuestion: data.notifForumsQuestion,
        notifNewsHebdomadaire: data.notifNewsHebdomadaire,
        notifLeaderboardHebdomadaire: data.notifLeaderboardHebdomadaire,
        notifUpvote: data.notifUpvote,
        notifComment: data.notifComment,
        notifBlogLike: data.notifBlogLike,
      });
    }

    revalidatePath("/preferences");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour des préférences:", error);
    return { success: false, error: "Erreur serveur" };
  }
}

export async function getNotificationPreferences() {
  try {
    const user = await auth();
    if (!user) {
      return null;
    }
    const userId = user.user?.id!;
    const preferences = await db
      .select()
      .from(notificationPreferencesTable)
      .where(eq(notificationPreferencesTable.userId, userId))
      .limit(1);

    if (preferences.length === 0) {
      // Créer des préférences par défaut
      const defaultPreferences = {
        id: crypto.randomUUID(),
        userId: userId,
        emailBlogUpdates: true,
        emailForumsQuestion: true,
        emailNewsHebdomadaire: true,
        emailLeaderboardHebdomadaire: true,
        notifBlogUpdates: true,
        notifForumsQuestion: true,
        notifNewsHebdomadaire: true,
        notifLeaderboardHebdomadaire: true,
        notifUpvote: true,
        notifComment: true,
        notifBlogLike: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.insert(notificationPreferencesTable).values(defaultPreferences);
      return defaultPreferences;
    }

    return preferences[0];
  } catch (error) {
    console.error("Erreur lors de la récupération des préférences:", error);
    return null;
  }
}
