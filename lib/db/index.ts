import {
  drizzle as drizzleNeon,
  NeonDatabase,
} from "drizzle-orm/neon-serverless";
import {
  drizzle as drizzlePg,
  NodePgDatabase,
} from "drizzle-orm/node-postgres";
import { Pool as NeonPool } from "@neondatabase/serverless";
import { Pool as PgPool } from "pg";
import * as schema from "./schema";
import * as dotenv from "dotenv";

// Configure WebSocket for Neon
import ws from "ws";

dotenv.config({
  path: ".env",
});

const connectionString = process.env.DATABASE_URL!;
const url = new URL(connectionString);
const isSupabase = url.hostname.endsWith(".supabase.com");

if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = ws as any;
}
let db: NeonDatabase<typeof schema> | NodePgDatabase<typeof schema>;

if (isSupabase) {
  // Use regular pg driver for Supabase
  const pool = new PgPool({ connectionString });
  db = drizzlePg(pool, { schema });
} else {
  // Use Neon serverless driver for Neon
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
