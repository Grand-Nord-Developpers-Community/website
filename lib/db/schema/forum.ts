import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import {userTable as user} from "./user"
export const forumPost = pgTable("forum_post", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    authorId: text("authorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    // views: integer("views").default(0),
    // likes: integer("likes").default(0),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  });
  
  export type Forum = InferSelectModel<typeof forumPost>;
  
  export const forumReply = pgTable("forum_reply", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    content: text("content").notNull(),
    authorId: text("authorId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("postId")
      .notNull()
      .references(() => forumPost.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  });
  
  export type ForumReply = InferSelectModel<typeof forumReply>;
  
  export const forumVote = pgTable("forum_vote", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("postId")
      .notNull()
      .references(() => forumPost.id, { onDelete: "cascade" }),
    replyId: text("replyId").references(() => forumReply.id, {
      onDelete: "cascade",
    }),
    voteType: text("voteType").$type<"upvote" | "downvote">().notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  });
  
