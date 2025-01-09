import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  username: text("username"),
  password: text("password"),
  email_verified: boolean("email_verified").notNull().default(false),
  two_factor_secret: text("two_factor_secret"),
});

export type User = typeof userTable.$inferSelect