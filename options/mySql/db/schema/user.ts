import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  mysqlTable,
  varchar
} from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  email: varchar("email", { length: 255 }).unique(),
  username: varchar("username", { length: 255 }),
  password: varchar("password", { length: 255 }),
  email_verified: boolean("email_verified").notNull().default(false),
  two_factor_secret: varchar("two_factor_secret", { length: 255 }),
});

export type User = typeof userTable.$inferSelect;
