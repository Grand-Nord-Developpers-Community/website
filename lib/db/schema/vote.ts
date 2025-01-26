import { postComment } from "./comment";
import { forumPost } from "./forum";
import { userTable as user } from "./user";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const userVote = pgTable("user_vote", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  commentId: text("commentId").references(() => postComment.id, {
    onDelete: "cascade",
  }),
  postId: text("postId").references(() => forumPost.id, {
    onDelete: "cascade",
  }),
  isUpvote: boolean("isUpvote").notNull(), // true for upvote, false for downvote
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});
export type Vote = typeof userVote.$inferSelect;
