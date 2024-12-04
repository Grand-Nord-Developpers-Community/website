import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").unique().notNull(),
  password: text("password"),
  name: text("name"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  bio:text("bio"),
  role: text("role").default("user").$type<"user" | "admin" | "super admin">(),
  experiencePoints: integer("experiencePoints").default(0),
  location: text("location"),
  phoneNumber: text("phoneNumber"),
  githubLink: text("githubLink"),
  twitterLink: text("twitterLink"),
  instagramLink: text("instagramLink"),
  websiteLink: text("websiteLink"),
  streak: integer("streak").default(0),
  lastActive: timestamp("lastActive", { mode: "date" }),
  isCompletedProfile:boolean("isCompletedProfile").default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type User= InferSelectModel<typeof user>

export const account = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const session = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const blogPost = pgTable("blog_post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  preview :text("preview").notNull(),
  previewHash :text("previewHash").notNull(),
  description :text("description").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),
  authorId: text("authorId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});
export type Blog = InferSelectModel<typeof blogPost>

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
export type BlogComment = InferSelectModel<typeof blogComment>

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
  type: text("type").$type<"like" | "love" | "haha" | "wow" | "sad" | "angry">().notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const forumPost = pgTable("forum_post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type Forum = InferSelectModel<typeof forumPost>

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

export type ForumReply = InferSelectModel<typeof forumReply>

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
  replyId: text("replyId")
    .references(() => forumReply.id, { onDelete: "cascade" }),
  voteType: text("voteType").$type<"upvote" | "downvote">().notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const event = pgTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  datetime: timestamp("datetime", { mode: "date" }).notNull(),
  link: text("link"),
  creatorId: text("creatorId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type Event = InferSelectModel<typeof event>
// Relations
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