import { InferSelectModel } from "drizzle-orm";
import { userTable as user } from "./user";
import { blogPost } from "./blog";
import { forumPost } from "./forum";
import {
  foreignKey,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const blogComment = pgTable(
  "blog_comment",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    content: text("content").notNull(),
    score: integer("score").default(0),
    authorId: text("authorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("postId")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    parentId: text("parentId"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (blogComment) => ({
    selfRef: foreignKey({
      columns: [blogComment.parentId],
      foreignColumns: [blogComment.id],
    }).onDelete("cascade"),
  })
);
export type BlogComment = InferSelectModel<typeof blogComment>;

// export const forumReply = pgTable("forum_reply", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   content: text("content").notNull(),
//   authorId: text("authorId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
//   postId: text("postId")
//     .notNull()
//     .references(() => forumPost.id, { onDelete: "cascade" }),
//   createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
//   updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
// });

export const forumReply = pgTable(
  "forum_reply",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    content: text("content").notNull(),
    score: integer("score").default(0),
    authorId: text("authorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("postId")
      .notNull()
      .references(() => forumPost.id, { onDelete: "cascade" }),
    parentId: text("parentId"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (forumReply) => ({
    selfRef: foreignKey({
      columns: [forumReply.parentId],
      foreignColumns: [forumReply.id],
    }).onDelete("cascade"),
  })
);
export type ForumReply = InferSelectModel<typeof forumReply>;
