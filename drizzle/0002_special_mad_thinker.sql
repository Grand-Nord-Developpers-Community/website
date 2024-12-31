ALTER TABLE "blog_post" ALTER COLUMN "preview" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_post" ADD COLUMN "previewHash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_post" ADD COLUMN "description" text NOT NULL;