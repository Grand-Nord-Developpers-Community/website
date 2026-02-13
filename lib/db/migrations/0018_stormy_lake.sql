CREATE TABLE IF NOT EXISTS "api_token_permission" (
	"id" text PRIMARY KEY NOT NULL,
	"apiTokenId" text NOT NULL,
	"scope" text[] NOT NULL,
	"permission" text[] NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "api_token" ADD COLUMN "name" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api_token_permission" ADD CONSTRAINT "api_token_permission_apiTokenId_api_token_id_fk" FOREIGN KEY ("apiTokenId") REFERENCES "public"."api_token"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
