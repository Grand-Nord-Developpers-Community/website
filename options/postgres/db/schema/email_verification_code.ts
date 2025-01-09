import { pgTable, primaryKey, text, uuid, date, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const emailVerificationCodeTable = pgTable("email_verification_code", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => userTable.id),
  email: text("email").notNull(),
  expires_at: timestamp("expires_at", { mode: "date" }).notNull(),
});
