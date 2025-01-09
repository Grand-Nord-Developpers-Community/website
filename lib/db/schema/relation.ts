import { userTable as user} from "@/lib/db/schema";
import { relations } from "drizzle-orm";
import { blogPost, blogComment, blogReaction } from "./blog";
import { forumPost, forumReply, forumVote } from "./forum";
import { event } from "./event";


export const userRelations = relations(user, ({ many }) => ({
    blogPosts: many(blogPost),
    blogComments: many(blogComment),
    blogReactions: many(blogReaction),
    forumPosts: many(forumPost),
    forumReplies: many(forumReply),
    forumVotes: many(forumVote),
    events: many(event),
  }));
  
  export const blogPostRelations = relations(blogPost, ({ one, many }) => ({
    author: one(user, {
      fields: [blogPost.authorId],
      references: [user.id],
    }),
    comments: many(blogComment),
    reactions: many(blogReaction),
  }));
  
  export const forumPostRelations = relations(forumPost, ({ one, many }) => ({
    author: one(user, {
      fields: [forumPost.authorId],
      references: [user.id],
    }),
    replies: many(forumReply),
    votes: many(forumVote),
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
    votes: many(forumVote),
  }));
  
  export const eventRelations = relations(event, ({ one }) => ({
    creator: one(user, {
      fields: [event.creatorId],
      references: [user.id],
    }),
  }));
  