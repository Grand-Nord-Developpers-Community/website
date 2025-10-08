CREATE TABLE IF NOT EXISTS "notification_preferences" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email_blog_updates" boolean DEFAULT true NOT NULL,
	"email_forums_question" boolean DEFAULT true NOT NULL,
	"email_news_hebdomadaire" boolean DEFAULT true NOT NULL,
	"email_leaderboard_hebdomadaire" boolean DEFAULT true NOT NULL,
	"notif_blog_updates" boolean DEFAULT true NOT NULL,
	"notif_forums_question" boolean DEFAULT true NOT NULL,
	"notif_news_hebdomadaire" boolean DEFAULT true NOT NULL,
	"notif_leaderboard_hebdomadaire" boolean DEFAULT true NOT NULL,
	"notif_upvote" boolean DEFAULT true NOT NULL,
	"notif_comment" boolean DEFAULT true NOT NULL,
	"notif_blog_like" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification_preferences" ADD CONSTRAINT "notification_preferences_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
