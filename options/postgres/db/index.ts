import { Pool } from "@neondatabase/serverless";
import { NeonDatabase, drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

declare global {
  var drizzle: NeonDatabase<typeof schema> | undefined;
}
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: connectionString });
export const db = global.drizzle || drizzle(pool, { schema });

if (process.env.NODE_ENV !== "production") globalThis.drizzle = db;
