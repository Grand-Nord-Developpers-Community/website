import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"
//to be fix
const pool = postgres("postgresql://postgres.yzbnqnrwsximakxfdqhi:8HDNqBzIUvAbudYo@aws-0-eu-central-1.pooler.supabase.com:6543/postgres", { max: 1 })

export const db = drizzle(pool, {
  schema,
})
