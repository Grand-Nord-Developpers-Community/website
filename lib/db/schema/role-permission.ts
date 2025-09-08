import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const rolesTable = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const permissionsTable = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const rolePermissionsTable = pgTable("role_permissions", {
  role_id: integer("role_id")
    .references(() => rolesTable.id)
    .notNull(),
  permission_id: integer("permission_id")
    .references(() => permissionsTable.id)
    .notNull(),
});
export type IRole = typeof rolesTable.$inferSelect;
