import { userTable as user } from "./user";
import {
  boolean,
  integer,
  pgTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
export const blogPost = pgTable("blog_post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  preview: text("preview").notNull(),
  isDraft: boolean("isDraft").default(true),
  like: integer("like").default(0),
  previewHash: text("previewHash").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),
  tags: varchar("tags"),
  authorId: text("authorId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});
export type Blog = InferSelectModel<typeof blogPost>;
