ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_blog_post_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_forumId_forum_post_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "postId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" DROP COLUMN IF EXISTS "forumId";--> statement-breakpoint
ALTER TABLE "comment" DROP COLUMN IF EXISTS "userId";