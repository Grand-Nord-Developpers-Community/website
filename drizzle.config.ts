import { defineConfig } from "drizzle-kit"
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://postgres.yzbnqnrwsximakxfdqhi:8HDNqBzIUvAbudYo@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"//to be fix
  },
})
