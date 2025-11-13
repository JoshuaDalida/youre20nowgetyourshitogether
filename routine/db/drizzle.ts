// db/drizzle.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import 'dotenv/config'


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment variables");
}

// Create Neon SQL client
const sql = neon(connectionString);

// Create Drizzle ORM instance
export const db = drizzle(sql);
