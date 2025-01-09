import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const oauthAccountTable = pgTable(
  "oauth_account",
  {
    provider_id: text("provider_id").notNull(),
    provider_user_id: text("provider_user_id").notNull(),
    user_id: text("user_id")
      .notNull()
      .references(() => userTable.id,{ onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.provider_id, table.provider_user_id] }),
    };
  }
);
