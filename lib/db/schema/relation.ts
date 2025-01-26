import { userTable as user } from "@/lib/db/schema";
import { relations } from "drizzle-orm";
import { blogPost } from "./blog";
import { forumReply, blogComment } from "./comment";
import { forumPost } from "./forum";
import { event } from "./event";

export const userRelations = relations(user, ({ many }) => ({
  blogPosts: many(blogPost),
  blogComments: many(blogComment),
  forumPosts: many(forumPost),
  forumReplies: many(forumReply),
  events: many(event),
}));

export const blogPostRelations = relations(blogPost, ({ one, many }) => ({
  author: one(user, {
    fields: [blogPost.authorId],
    references: [user.id],
  }),
  comments: many(blogComment),
}));

export const forumPostRelations = relations(forumPost, ({ one, many }) => ({
  author: one(user, {
    fields: [forumPost.authorId],
    references: [user.id],
  }),
  replies: many(forumReply),
  //votes: many(forumVote),
}));

export const blogCommentRelations = relations(blogComment, ({ one, many }) => ({
  author: one(user, {
    fields: [blogComment.authorId],
    references: [user.id],
  }),
  post: one(forumPost, {
    fields: [blogComment.postId],
    references: [forumPost.id],
  }),
  parent: one(blogComment, {
    fields: [blogComment.parentId],
    references: [blogComment.id],
  }),
  comments: many(forumReply, { relationName: "parentChild" }),
  //votes: many(forumVote),
}));

export const forumReplyRelations = relations(forumReply, ({ one, many }) => ({
  author: one(user, {
    fields: [forumReply.authorId],
    references: [user.id],
  }),
  post: one(forumPost, {
    fields: [forumReply.postId],
    references: [forumPost.id],
  }),
  parent: one(forumReply, {
    fields: [forumReply.parentId],
    references: [forumReply.id],
  }),
  replies: many(forumReply, { relationName: "parentChild" }),
  //votes: many(forumVote),
}));

export const eventRelations = relations(event, ({ one }) => ({
  creator: one(user, {
    fields: [event.creatorId],
    references: [user.id],
  }),
}));
