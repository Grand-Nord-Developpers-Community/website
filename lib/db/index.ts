import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool as NeonPool } from "@neondatabase/serverless";
import { Pool as PgPool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const url = new URL(connectionString);
const isSupabase = url.hostname.endsWith(".supabase.com");

let db: ReturnType<typeof drizzlePg> | ReturnType<typeof drizzleNeon>;

if (isSupabase) {
  const pool = new NeonPool({ connectionString });
  db = drizzleNeon(pool, { schema });
} else {
  const pool = new PgPool({ connectionString });
  db = drizzlePg(pool, { schema });
}

export { db };

// import { Pool } from "@neondatabase/serverless";
// import { NeonDatabase, drizzle } from "drizzle-orm/neon-serverless";
// import * as schema from "./schema";

// declare global {
//   //@ts-ignore
//   var drizzle: NeonDatabase<typeof schema> | undefined;
// }
// const connectionString = process.env.DATABASE_URL;
// const pool = new Pool({ connectionString: connectionString });
// export const db = global.drizzle || drizzle(pool, { schema });

// //@ts-ignore
// if (process.env.NODE_ENV !== "production") globalThis.drizzle = db;
