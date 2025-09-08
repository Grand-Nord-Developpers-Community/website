import { json, pgTable, text } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const devicesTable = pgTable("devices", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  pushSubscription: json("push_subscription").notNull(),
  userId: text("user_id")
    .references(() => userTable.id)
    .notNull(),
});
