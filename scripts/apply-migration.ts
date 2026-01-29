import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";
import fs from "fs";
import path from "path";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url || !authToken) {
    throw new Error("Missing DATABASE_URL or DATABASE_AUTH_TOKEN");
}

const client = createClient({ url, authToken });
const db = drizzle(client);

async function applyMigration() {
    console.log("🚀 Applying migration...");

    const migrationPath = path.resolve(process.cwd(), "drizzle/0000_public_sphinx.sql");
    const content = fs.readFileSync(migrationPath, "utf-8");

    const statements = content
        .split("--> statement-breakpoint")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

    console.log(`Found ${statements.length} statements.`);

    for (const statement of statements) {
        try {
            console.log(`Executing statement: ${statement.slice(0, 50)}...`);
            await db.run(sql.raw(statement));
        } catch (e) {
            console.error("Error executing statement:", e);
            // Optional: stop or continue based on preference. 
            // Throwing helps stop on first error.
            throw e;
        }
    }

    console.log("✅ Migration applied successfully");
}

applyMigration().catch(console.error);
