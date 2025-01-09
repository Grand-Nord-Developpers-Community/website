import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { userTable } from "./user";

export const sessionTable = mysqlTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at", {
    mode: "date",
  }).notNull(),
});