import {  oauthAccountTable, userTable as user } from "@/lib/db/schema";
import { relations } from "drizzle-orm";
import { blogPost } from "./blog";
import { apiToken } from "./api_token";
import { userVote } from "./vote";
import { userLike } from "./like";
import { postComment } from "./comment";
import { forumPost } from "./forum";
import { event } from "./event";
import { userActivity } from "./activity";
import { devicesTable } from "./device";
import { notificationPreferencesTable } from "./notification";
import {
  permissionsTable,
  rolePermissionsTable,
  rolesTable,
} from "./role-permission";
export const userRelations = relations(user, ({ many, one }) => ({
  blogPosts: many(blogPost),
  forumPosts: many(forumPost),
  postReplies: many(postComment),
  events: many(event),
  votes: many(userVote),
  likes: many(userLike),
  activity: one(userActivity, {
    fields: [user.id],
    references: [userActivity.userId],
  }),
  oauthAccounts: many(oauthAccountTable),
  devices: many(devicesTable),
  role: one(rolesTable, {
    fields: [user.role_id],
    references: [rolesTable.id],
  }),
  notificationPreferences: one(notificationPreferencesTable, {
    fields: [user.id],
    references: [notificationPreferencesTable.userId],
  }),
}));

export const blogPostRelations = relations(blogPost, ({ one, many }) => ({
  author: one(user, {
    fields: [blogPost.authorId],
    references: [user.id],
  }),
  replies: many(postComment),
  likes: many(userLike),
}));

export const forumPostRelations = relations(forumPost, ({ one, many }) => ({
  author: one(user, {
    fields: [forumPost.authorId],
    references: [user.id],
  }),
  replies: many(postComment),
  votes: many(userVote),
}));

export const postCommentRelations = relations(postComment, ({ one, many }) => ({
  author: one(user, {
    fields: [postComment.authorId],
    references: [user.id],
  }),
  post: one(forumPost, {
    fields: [postComment.postId],
    references: [forumPost.id],
  }),
  blog: one(blogPost, {
    fields: [postComment.blogId],
    references: [blogPost.id],
  }),
  parent: one(postComment, {
    fields: [postComment.parentId],
    references: [postComment.id],
  }),
  replies: many(postComment, { relationName: "parentChild" }),
  votes: many(userVote),
}));

export const notificationPreferencesRelations = relations(
  notificationPreferencesTable,
  ({ one }) => ({
    user: one(user, {
      fields: [notificationPreferencesTable.userId],
      references: [user.id],
    }),
  })
);

export const userVoteRelations = relations(userVote, ({ one }) => ({
  user: one(user, {
    fields: [userVote.userId],
    references: [user.id],
  }),
  comment: one(postComment, {
    fields: [userVote.commentId],
    references: [postComment.id],
  }),
  post: one(forumPost, {
    fields: [userVote.postId],
    references: [forumPost.id],
  }),
}));

export const userLikeRelations = relations(userLike, ({ one }) => ({
  user: one(user, {
    fields: [userLike.userId],
    references: [user.id],
  }),
  post: one(blogPost, {
    fields: [userLike.postId],
    references: [blogPost.id],
  }),
}));

export const userTokenRelations = relations(apiToken, ({ one }) => ({
  user: one(user, {
    fields: [apiToken.userId],
    references: [user.id],
  })
}));

export const userActivityRelations = relations(userActivity, ({ one }) => ({
  user: one(user, {
    fields: [userActivity.userId],
    references: [user.id],
  }),
}));
export const roleRelations = relations(rolesTable, ({ many }) => ({
  users: many(user),
  permissions: many(permissionsTable),
}));

export const permissionRelations = relations(permissionsTable, ({ many }) => ({
  roles: many(rolePermissionsTable),
}));

export const deviceRelations = relations(devicesTable, ({ one }) => ({
  user: one(user, {
    fields: [devicesTable.userId],
    references: [user.id],
  }),
}));

export const eventRelations = relations(event, ({ one }) => ({
  creator: one(user, {
    fields: [event.creatorId],
    references: [user.id],
  }),
}));
export const oauthAccountRelations = relations(
  oauthAccountTable,
  ({ one }) => ({
    user: one(user, {
      fields: [oauthAccountTable.user_id],
      references: [user.id],
    }),
  })
);
