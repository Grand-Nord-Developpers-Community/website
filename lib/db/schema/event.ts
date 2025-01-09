import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import {userTable as user} from "./user"

export const event = pgTable("event", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    location: text("location").notNull(),
    datetime: timestamp("datetime", { mode: "date" }).notNull(),
    link: text("link"),
    creatorId: text("creatorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  });
  
  export type Event = InferSelectModel<typeof event>;
  