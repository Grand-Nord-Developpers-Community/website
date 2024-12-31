<<<<<<< HEAD
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./lib/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
=======
import { defineConfig } from "drizzle-kit"
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://postgres.yzbnqnrwsximakxfdqhi:8HDNqBzIUvAbudYo@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"//to be fix
  },
})
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db
