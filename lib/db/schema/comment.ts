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

export const postComment = pgTable(
  "post_comment",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    content: text("content").notNull(),
    score: integer("score").default(0),
    authorId: text("authorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("postId").references(() => forumPost.id, {
      onDelete: "cascade",
    }),
    blogId: text("blogId").references(() => blogPost.id, {
      onDelete: "cascade",
    }),
    parentId: text("parentId"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (postComment) => ({
    selfRef: foreignKey({
      columns: [postComment.parentId],
      foreignColumns: [postComment.id],
    }).onDelete("cascade"),
  })
);
export type postComment = InferSelectModel<typeof postComment>;
