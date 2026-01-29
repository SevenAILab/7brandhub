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

async function wipeDatabase() {
    console.log("⚠️ Wiping database...");

    // Disable foreign keys to allow dropping tables in any order
    await db.run(sql`PRAGMA foreign_keys = OFF`);

    const tables = await db.run(sql`
    SELECT name FROM sqlite_schema 
    WHERE type = 'table' 
    AND name NOT LIKE 'sqlite_%' 
    AND name NOT LIKE '_litestream_%' 
    AND name != '__drizzle_migrations'
  `);

    for (const row of tables.rows) {
        const tableName = row.name as string;
        console.log(`Dropping table: ${tableName}`);
        await db.run(sql.raw(`DROP TABLE IF EXISTS "${tableName}"`));
    }

    console.log("✅ Database wiped successfully");
}

wipeDatabase().catch(console.error);
