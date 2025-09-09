import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * Enums
 */
export const regionEnum = pgEnum("region", [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest",
]);

export const domainEnum = pgEnum("domain", [
  "Tous les domaines",
  "Programmation",
  "Machine Learning",
  "Infographie",
  "Entreprenariat",
  "Réseaux et cloud",
  "Autres",
  "Cryptographie et Sécurité",
  "Marketing digital",
]);

/**
 * Table members
 */
export const members = pgTable(
  "members",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    fullName: varchar("full_name", { length: 150 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 30 }).notNull(),

    region: regionEnum("region").notNull(),
    domain: domainEnum("domain").notNull(),

    photoUrl: text("photo_url").notNull(),

    isLeader: text("is_leader").$type<boolean>().notNull().default(false),

    bio: text("bio").notNull(),

    linkedin: text("linkedin").notNull(),
    github: text("github").notNull(),
    twitter: text("twitter").notNull(),
    instagram: text("instagram").notNull(),
    website: text("website").notNull(),
    facebook: text("facebook").notNull(),
    isApproved: text("is_approved").$type<boolean>().notNull().default(false),

    // Tableau des langages de programmation maîtrisés
    languages: text("languages")
      .array()
      .$type<string[]>()
      .notNull()
      .default(sql`ARRAY[]::text[]`),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailUnique: uniqueIndex("members_email_unique").on(table.email),
    phoneUnique: uniqueIndex("members_phone_unique").on(table.phone),
  })
);

// Types utiles
export type Member = typeof members.$inferSelect; // lecture
export type NewMember = typeof members.$inferInsert; // insertion
