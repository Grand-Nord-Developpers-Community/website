import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const passwordResetTokenTable = pgTable("password_reset_token", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => userTable.id,{ onDelete: "cascade" }),
  expires_at: timestamp("expires_at", { mode: "date" }).notNull(),
});

export type PasswordResetTokenTable =
  typeof passwordResetTokenTable.$inferSelect;
