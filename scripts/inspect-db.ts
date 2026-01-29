import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url || !authToken) {
    throw new Error("Missing DATABASE_URL or DATABASE_AUTH_TOKEN");
}

const client = createClient({ url, authToken });
const db = drizzle(client);

async function inspectDatabase() {
    console.log("🔍 Inspecting database...");

    const tables = await db.run(sql`
    SELECT name, type FROM sqlite_schema 
    WHERE name NOT LIKE 'sqlite_%'
  `);

    console.log("Found objects:");
    console.table(tables.rows);
}

inspectDatabase().catch(console.error);
