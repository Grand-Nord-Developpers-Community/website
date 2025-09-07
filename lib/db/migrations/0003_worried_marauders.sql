ALTER TABLE "members" ADD COLUMN "is_leader" text DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "bio" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "linkedin" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "github" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "twitter" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "instagram" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "website" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "facebook" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "is_approved" text DEFAULT false NOT NULL;