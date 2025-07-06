import { userTable as user } from "./user";
import { pgTable, integer, timestamp, date, text } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
export const userActivity = pgTable("user_activity", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  lastSeen: timestamp("last_seen", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  currentStreak: integer("current_streak").notNull().default(1),
  lastActiveDate: timestamp("lastActiveDate", { mode: "date" }).notNull(),
  totalDaysActive: integer("total_days_active").notNull().default(0),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
export type Activity = InferSelectModel<typeof userActivity>;
