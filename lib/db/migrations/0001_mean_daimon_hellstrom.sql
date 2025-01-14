ALTER TABLE "user" ADD COLUMN "isCheckProfile" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");