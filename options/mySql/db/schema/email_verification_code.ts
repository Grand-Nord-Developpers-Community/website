import { userTable } from "./user";
import {
  char,
  datetime,
  mysqlTable,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

export const emailVerificationCodeTable = mysqlTable(
  "email_verification_code",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    code: varchar("code", { length: 255 }).notNull(),
    user_id: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => userTable.id),
    email: varchar("email", { length: 255 }).notNull(),
    expires_at: datetime("expires_at", { mode: "date" }).notNull(),
  }
);
