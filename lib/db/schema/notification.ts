// db/schema.ts
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { userTable } from ".";

export const notificationPreferencesTable = pgTable(
  "notification_preferences",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),

    // Préférences Email
    emailBlogUpdates: boolean("email_blog_updates").default(true).notNull(),
    emailForumsQuestion: boolean("email_forums_question")
      .default(true)
      .notNull(),
    emailNewsHebdomadaire: boolean("email_news_hebdomadaire")
      .default(true)
      .notNull(),
    emailLeaderboardHebdomadaire: boolean("email_leaderboard_hebdomadaire")
      .default(true)
      .notNull(),

    // Préférences Notification (in-app)
    notifBlogUpdates: boolean("notif_blog_updates").default(true).notNull(),
    notifForumsQuestion: boolean("notif_forums_question")
      .default(true)
      .notNull(),
    notifNewsHebdomadaire: boolean("notif_news_hebdomadaire")
      .default(true)
      .notNull(),
    notifLeaderboardHebdomadaire: boolean("notif_leaderboard_hebdomadaire")
      .default(true)
      .notNull(),
    notifUpvote: boolean("notif_upvote").default(true).notNull(),
    notifComment: boolean("notif_comment").default(true).notNull(),
    notifBlogLike: boolean("notif_blog_like").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export type NotificationPreferences =
  typeof notificationPreferencesTable.$inferSelect;
export type InsertNotificationPreferences =
  typeof notificationPreferencesTable.$inferInsert;
