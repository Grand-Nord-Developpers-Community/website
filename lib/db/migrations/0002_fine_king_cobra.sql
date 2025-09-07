DO $$ BEGIN
 CREATE TYPE "public"."domain" AS ENUM('Tous les domaines', 'Programmation', 'Machine Learning', 'Infographie', 'Entreprenariat', 'Réseaux et cloud', 'Autres', 'Cryptographie et Sécurité', 'Marketing digital');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."region" AS ENUM('Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"region" "region" NOT NULL,
	"domain" "domain" NOT NULL,
	"photo_url" text NOT NULL,
	"languages" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "members_email_unique" ON "members" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "members_phone_unique" ON "members" ("phone");