import {userTable as user} from "./user";
import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
export const blogPost = pgTable("blog_post", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    preview: text("preview").notNull(),
    previewHash: text("previewHash").notNull(),
    description: text("description").notNull(),
    content: text("content").notNull(),
    slug: text("slug").notNull().unique(),
    // views: integer("views").default(0),
    // likes: integer("likes").default(0),
    authorId: text("authorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  });
  export type Blog = InferSelectModel<typeof blogPost>;
  
  export const blogComment = pgTable("blog_comment", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    content: text("content").notNull(),
    authorId: text("authorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("postId")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  });
  export type BlogComment = InferSelectModel<typeof blogComment>;
  
  export const blogReaction = pgTable("blog_reaction", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("postId")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    type: text("type")
      .$type<"like" | "love" | "haha" | "wow" | "sad" | "angry">()
      .notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  });