CREATE TABLE IF NOT EXISTS "comment" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"postId" text NOT NULL,
	"forumId" text NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"score" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_reply" (
	"id" text PRIMARY KEY NOT NULL,
	"parentCommentId" text NOT NULL,
	"childCommentId" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "blog_comment";--> statement-breakpoint
DROP TABLE "blog_reaction";--> statement-breakpoint
DROP TABLE "forum_reply";--> statement-breakpoint
DROP TABLE "forum_vote";--> statement-breakpoint
ALTER TABLE "blog_post" ADD COLUMN "isDraft" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "forum_post" ADD COLUMN "textContent" text NOT NULL;--> statement-breakpoint
ALTER TABLE "forum_post" ADD COLUMN "score" integer DEFAULT 0;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_blog_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_forumId_forum_post_id_fk" FOREIGN KEY ("forumId") REFERENCES "public"."forum_post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_reply" ADD CONSTRAINT "comment_reply_parentCommentId_comment_id_fk" FOREIGN KEY ("parentCommentId") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_reply" ADD CONSTRAINT "comment_reply_childCommentId_comment_id_fk" FOREIGN KEY ("childCommentId") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
