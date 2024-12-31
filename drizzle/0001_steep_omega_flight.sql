ALTER TABLE "user" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "streak" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastActive" timestamp;