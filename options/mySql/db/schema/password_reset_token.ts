import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { userTable } from "./user";

export const passwordResetTokenTable = mysqlTable("password_reset_token", {
  id: varchar("id", { length: 255 }).primaryKey(),
  user_id: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  expires_at: datetime("expires_at", { mode: "date" }).notNull(),
});

export type PasswordResetTokenTable =
  typeof passwordResetTokenTable.$inferSelect;