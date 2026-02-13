import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const apiToken = pgTable("api_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  token: text("token").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  expiresAt: timestamp("expiresAt", { mode: "date" }),
});
