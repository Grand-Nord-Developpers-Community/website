import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

/* declare global {
  var drizzle: MySql2Database<typeof schema> | undefined;
} */

const poolConnection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
});

export const db = drizzle(poolConnection, { schema, mode: "default" });

/* export const db =
  global.drizzle || drizzle(poolConnection, { schema, mode: "default" });
 */

// if (process.env.NODE_ENV !== "production") globalThis.drizzle = db;
