import { blogPost } from "./blog";
import { userTable as user } from "./user";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const userLike = pgTable("user_like", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  postId: text("postId").references(() => blogPost.id, {
    onDelete: "cascade",
  }),
  isLike: boolean("isLike").notNull(), // true for upvote, false for downvote
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});
export type Like = typeof userLike.$inferSelect;
