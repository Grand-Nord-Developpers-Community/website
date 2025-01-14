import {
  pgTable,
  text,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  name: text("name"),
  username: text("username").unique(),
  password: text("password"),
  email_verified: boolean("email_verified").notNull().default(false),
  two_factor_secret: text("two_factor_secret"),
  image: text("image"),
  bio: text("bio"),
  role: text("role").default("user").$type<"user" | "admin" | "manager">(),
  experiencePoints: integer("experiencePoints").default(0),
  location: text("location"),
  phoneNumber: text("phoneNumber"),
  githubLink: text("githubLink"),
  twitterLink: text("twitterLink"),
  instagramLink: text("instagramLink"),
  websiteLink: text("websiteLink"),
  streak: integer("streak").default(1),
  lastActive: timestamp("lastActive", { mode: "date" }),
  isCompletedProfile: boolean("isCompletedProfile").default(false),
  isCheckProfile: boolean("isCheckProfile").default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type User = typeof userTable.$inferSelect;
export type SessionUser = Pick<
  User,
  "id" | "email" | "name" | "role" | "image" | "isCompletedProfile"|"bio"|"username"
>;
