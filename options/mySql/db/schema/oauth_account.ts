import {
  mysqlTable,
  primaryKey,
  varchar
} from "drizzle-orm/mysql-core";
import { userTable } from "./user";

export const oauthAccountTable = mysqlTable(
  "oauth_account",
  {
    provider_id: varchar("provider_id", { length: 255 }).notNull(),
    provider_user_id: varchar("provider_user_id", { length: 255 }).notNull(),
    user_id: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => userTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.provider_id, table.provider_user_id] }),
    };
  }
);