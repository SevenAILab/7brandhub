/**
 * Import providers from constants.ts to SQLite database
 * Run with: npx tsx scripts/import-providers.ts
 */
import { createClient } from "@libsql/client";
import path from "path";
import { PROVIDERS, CITIES } from "../constants";
import { ServiceCategory } from "../types";

const url = process.env.DATABASE_URL ?? process.env.TURSO_DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN;

import { Client } from "@libsql/client";

let client: Client;

if (url && authToken) {
    console.log("Connecting to LibSQL/Turso at:", url);
    client = createClient({ url, authToken });
} else {
    const dbPath = path.resolve(process.cwd(), "data.db");
    console.log("Connecting to database at:", dbPath);
    client = createClient({ url: `file:${dbPath}` });
}

// Category slug mapping from ServiceCategory enum
const categorySlugMap: Record<string, string> = {
    [ServiceCategory.STRATEGY]: 'brand-strategy',
    [ServiceCategory.DESIGN]: 'visual-design',
    [ServiceCategory.PACKAGING]: 'packaging-design',
    [ServiceCategory.SPACE]: 'space-design',
    [ServiceCategory.MARKETING]: 'brand-marketing',
    [ServiceCategory.DIGITAL]: 'digital-marketing',
    [ServiceCategory.ECOMMERCE]: 'ecommerce',
    [ServiceCategory.PR]: 'public-relations',
    [ServiceCategory.OVERSEAS]: 'overseas-marketing',
};

// Generate URL-safe slug from name
function generateSlug(name: string, id: string): string {
    // Use pinyin or just the id for now
    const safeName = name
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    // If name is mostly Chinese, use id-based slug
    if (/[\u4e00-\u9fa5]/.test(name)) {
        return `provider-${id}`;
    }
    return safeName || `provider-${id}`;
}

async function importProviders() {
    const now = Date.now();

    // 1. Get existing cities from database and create lookup map
    console.log("\n📍 Loading cities...");
    const citiesResult = await client.execute("SELECT id, name FROM cities");
    const cityMap = new Map<string, number>();
    for (const row of citiesResult.rows) {
        cityMap.set(row.name as string, row.id as number);
    }

    // Add any missing cities from CITIES constant
    for (const cityName of CITIES) {
        if (!cityMap.has(cityName)) {
            const slug = `city-${cityMap.size + 1}`;
            await client.execute({
                sql: "INSERT INTO cities (name, slug, sortOrder, createdAt) VALUES (?, ?, ?, ?)",
                args: [cityName, slug, cityMap.size + 1, now]
            });
            const result = await client.execute("SELECT last_insert_rowid() as id");
            cityMap.set(cityName, result.rows[0].id as number);
            console.log(`  Added city: ${cityName}`);
        }
    }

    // 2. Get existing categories from database
    console.log("\n📂 Loading categories...");
    const categoriesResult = await client.execute("SELECT id, slug FROM categories");
    const categoryMap = new Map<string, number>();
    for (const row of categoriesResult.rows) {
        categoryMap.set(row.slug as string, row.id as number);
    }

    // Add any missing categories
    const categoriesToAdd = [
        { name: '出海营销', slug: 'overseas-marketing', description: '品牌出海、海外市场拓展、跨境营销' }
    ];
    for (const cat of categoriesToAdd) {
        if (!categoryMap.has(cat.slug)) {
            await client.execute({
                sql: "INSERT INTO categories (name, slug, description, sortOrder, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
                args: [cat.name, cat.slug, cat.description, categoryMap.size + 1, now, now]
            });
            const result = await client.execute("SELECT last_insert_rowid() as id");
            categoryMap.set(cat.slug, result.rows[0].id as number);
            console.log(`  Added category: ${cat.name}`);
        }
    }

    // 3. Clear existing provider data for fresh import
    console.log("\n🗑️  Clearing existing provider data...");
    await client.execute("DELETE FROM provider_clients");
    await client.execute("DELETE FROM provider_categories");
    await client.execute("DELETE FROM provider_services");
    await client.execute("DELETE FROM provider_cases");
    await client.execute("DELETE FROM providers");
    console.log("  Cleared existing providers and related data");

    // 4. Import providers
    console.log(`\n📦 Importing ${PROVIDERS.length} providers...`);

    let imported = 0;
    let skipped = 0;

    for (const p of PROVIDERS) {
        try {
            const cityId = cityMap.get(p.city) || null;
            const slug = generateSlug(p.name, p.id);

            // Insert provider
            await client.execute({
                sql: `INSERT INTO providers (
          name, slug, englishName, logo, description, shortDescription,
          cityId, foundedYear, website, phone, email,
          verified, featured, weight, status, viewCount, contactCount,
          createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    p.name,
                    slug,
                    p.name, // Use name as englishName fallback
                    p.logo || null,
                    p.description,
                    p.slogan,
                    cityId,
                    p.established,
                    p.contact?.website || null,
                    p.contact?.phone || null,
                    p.contact?.email || null,
                    p.isVerified ? 1 : 0,
                    p.score >= 9.5 ? 1 : 0, // Featured if score >= 9.5
                    Math.round(p.score * 10), // Weight from score
                    'approved',
                    0,
                    0,
                    now,
                    now
                ]
            });

            const providerIdResult = await client.execute("SELECT last_insert_rowid() as id");
            const providerId = providerIdResult.rows[0].id as number;

            // Insert provider categories
            for (const tag of p.tags) {
                const categorySlug = categorySlugMap[tag];
                const categoryId = categorySlug ? categoryMap.get(categorySlug) : null;
                if (categoryId) {
                    await client.execute({
                        sql: "INSERT INTO provider_categories (providerId, categoryId) VALUES (?, ?)",
                        args: [providerId, categoryId]
                    });
                }
            }

            // Insert provider clients
            for (const clientName of p.clients) {
                await client.execute({
                    sql: "INSERT INTO provider_clients (providerId, name) VALUES (?, ?)",
                    args: [providerId, clientName]
                });
            }

            imported++;
            if (imported % 20 === 0) {
                console.log(`  Imported ${imported}/${PROVIDERS.length} providers...`);
            }
        } catch (error) {
            console.error(`  ❌ Failed to import provider ${p.name}:`, error);
            skipped++;
        }
    }

    console.log(`\n✅ Import complete!`);
    console.log(`   Imported: ${imported} providers`);
    console.log(`   Skipped: ${skipped} providers`);

    // Show summary
    const providerCount = await client.execute("SELECT COUNT(*) as count FROM providers");
    const categoryCount = await client.execute("SELECT COUNT(*) as count FROM provider_categories");
    const clientCount = await client.execute("SELECT COUNT(*) as count FROM provider_clients");

    console.log(`\n📊 Database summary:`);
    console.log(`   Providers: ${providerCount.rows[0].count}`);
    console.log(`   Category links: ${categoryCount.rows[0].count}`);
    console.log(`   Client records: ${clientCount.rows[0].count}`);
}

importProviders().catch(console.error);
