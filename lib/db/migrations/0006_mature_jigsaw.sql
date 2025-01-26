ALTER TABLE "blog_comment" ADD COLUMN "score" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "blog_comment" ADD COLUMN "parentId" text;--> statement-breakpoint
ALTER TABLE "forum_reply" ADD COLUMN "score" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "forum_reply" ADD COLUMN "parentId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_comment" ADD CONSTRAINT "blog_comment_parentId_blog_comment_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."blog_comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_reply" ADD CONSTRAINT "forum_reply_parentId_forum_reply_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."forum_reply"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
