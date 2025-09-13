import {
  pgTable,
  text,
  boolean,
  timestamp,
  integer,
  json,
} from "drizzle-orm/pg-core";
import { IRole, rolesTable } from "./role-permission";

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
  experiencePoints: integer("experiencePoints").default(0),
  location: text("location"),
  phoneNumber: text("phoneNumber"),
  githubLink: text("githubLink"),
  twitterLink: text("twitterLink"),
  instagramLink: text("instagramLink"),
  websiteLink: text("websiteLink"),
  streak: integer("streak").default(1),
  skills: json("skills").$type<{ id: string; text: string }[]>().default([]),
  lastActive: timestamp("lastActive", { mode: "date" }),
  isCompletedProfile: boolean("isCompletedProfile").default(false),
  isCheckProfile: boolean("isCheckProfile").default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  role_id: integer("role_id")
    .references(() => rolesTable.id)
    .notNull()
    .default(1), //=> to fix when adding role or permision
});

export type User = typeof userTable.$inferSelect;
type SessionUserSimple = Pick<
  User,
  | "id"
  | "email"
  | "name"
  | "role_id"
  | "image"
  | "isCompletedProfile"
  | "bio"
  | "username"
>;
export type SessionUser = SessionUserSimple & {
  role: IRole["name"];
};
