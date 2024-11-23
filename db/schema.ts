import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp, json } from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const blog = pgTable("Blog", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  title: varchar("title").notNull(),
  summary: varchar("summary").notNull(),
  content: varchar("content").notNull(),
  tags: json("tags").notNull(),
  published_by: uuid("published_by")
    .notNull()
    .references(() => user.id),
});
export type Blog = Omit<InferSelectModel<typeof blog>, "tags"> & {
  tags: Array<string>;
};
