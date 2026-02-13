import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const apiToken = pgTable("api_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  token: text("token").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  name: text("name"), // Identifying name for the token (e.g., "DeepSeek Agent")
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  expiresAt: timestamp("expiresAt", { mode: "date" }),
});

export const apiTokenPermission = pgTable("api_token_permission", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  apiTokenId: text("apiTokenId")
    .notNull()
    .references(() => apiToken.id, { onDelete: "cascade" }),
  scope: text("scope").array().notNull(), // e.g., ["blog", "forum"]
  permission: text("permission").array().notNull(), // e.g., ["read", "write"]
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});
