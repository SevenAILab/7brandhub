import { eq, and, like, or, desc, asc, sql, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import {
  InsertUser, users,
  categories, InsertCategory, Category,
  cities, InsertCity, City,
  providers, InsertProvider, Provider,
  providerCategories, InsertProviderCategory,
  providerServices, InsertProviderService,
  providerCases, InsertProviderCase,
  providerClients, InsertProviderClient,
  favorites, InsertFavorite,
  providerApplications, InsertProviderApplication,
  contactInquiries, InsertContactInquiry,
  blogPosts, InsertBlogPost, BlogPost
} from "../drizzle/schema.js";
import { ENV } from './_core/env.js';
import path from "path";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance
// Lazily create the drizzle instance
export async function getDb() {
  if (!_db) {
    try {
      if (ENV.databaseUrl && ENV.databaseAuthToken) {
        // Production / Remote DB
        const client = createClient({
          url: ENV.databaseUrl,
          authToken: ENV.databaseAuthToken,
        });
        _db = drizzle(client);
        console.log("[Database] Connected to LibSQL/Turso at:", ENV.databaseUrl);
      } else {
        if (ENV.isProduction) {
          console.error("[Database] Missing DATABASE_URL or DATABASE_AUTH_TOKEN in production.");
          throw new Error("Database configuration error: Missing DATABASE_URL or DATABASE_AUTH_TOKEN in production.");
        }
        // Local Dev DB
        const dbPath = path.resolve(process.cwd(), "data.db");
        // Ensure directory exists if needed, but usually cwd is fine
        const client = createClient({ url: `file:${dbPath}` });
        _db = drizzle(client);
        console.log("[Database] Connected to local SQLite at:", dbPath);
      }
    } catch (error) {
      console.error("[Database] Failed to connect:", error);
      throw error;
    }
  }
  return _db;
}

// ==================== Users ====================

export async function createUser(user: { email: string; password: string; name?: string }): Promise<number> {
  const db = await getDb();

  const result = await db.insert(users).values({
    email: user.email,
    password: user.password,
    name: user.name || null,
    role: user.email === ENV.adminEmail ? 'admin' : 'user',
  }).returning({ id: users.id });

  return result[0].id;
}

export async function getUserById(id: number) {
  const db = await getDb();
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
}

export async function updateUserLastSignIn(id: number): Promise<void> {
  const db = await getDb();
  await db.update(users)
    .set({ lastSignedIn: new Date() })
    .where(eq(users.id, id));
}

export async function updateUser(id: number, data: Partial<InsertUser>): Promise<void> {
  const db = await getDb();
  await db.update(users).set(data).where(eq(users.id, id));
}

// ==================== Categories ====================

export async function getAllCategories() {
  const db = await getDb();
  return db.select().from(categories).orderBy(asc(categories.sortOrder));
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result[0];
}

export async function createCategory(data: InsertCategory) {
  const db = await getDb();
  await db.insert(categories).values(data);
}

// ==================== Cities ====================

export async function getAllCities() {
  const db = await getDb();
  return db.select().from(cities).orderBy(asc(cities.sortOrder));
}

export async function getCityBySlug(slug: string) {
  const db = await getDb();
  const result = await db.select().from(cities).where(eq(cities.slug, slug)).limit(1);
  return result[0];
}

export async function createCity(data: InsertCity) {
  const db = await getDb();
  await db.insert(cities).values(data);
}

// ==================== Providers ====================

export async function getProviders(options: {
  categoryId?: number;
  cityId?: number;
  search?: string;
  status?: "pending" | "approved" | "rejected";
  featured?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: "weight" | "createdAt" | "viewCount";
}) {
  const db = await getDb();

  const conditions: any[] = [];

  if (options.status) {
    conditions.push(eq(providers.status, options.status));
  }

  if (options.cityId) {
    conditions.push(eq(providers.cityId, options.cityId));
  }

  if (options.featured !== undefined) {
    conditions.push(eq(providers.featured, options.featured));
  }

  if (options.search) {
    conditions.push(
      or(
        like(providers.name, `%${options.search}%`),
        like(providers.englishName, `%${options.search}%`),
        like(providers.description, `%${options.search}%`)
      )
    );
  }

  // Filter by Category ID using a subquery
  if (options.categoryId) {
    const subQuery = db
      .select({ providerId: providerCategories.providerId })
      .from(providerCategories)
      .where(eq(providerCategories.categoryId, options.categoryId));

    conditions.push(inArray(providers.id, subQuery));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Build query
  let query = db.select().from(providers);

  if (whereClause) {
    query = query.where(whereClause) as typeof query;
  }

  // Order by
  if (options.orderBy === "createdAt") {
    query = query.orderBy(desc(providers.createdAt)) as typeof query;
  } else if (options.orderBy === "viewCount") {
    query = query.orderBy(desc(providers.viewCount)) as typeof query;
  } else {
    query = query.orderBy(desc(providers.weight), desc(providers.createdAt)) as typeof query;
  }

  // Pagination
  if (options.limit) {
    query = query.limit(options.limit) as typeof query;
  }
  if (options.offset) {
    query = query.offset(options.offset) as typeof query;
  }

  const providerList = await query;

  // Count query
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(providers)
    .where(whereClause);
  const total = countResult[0]?.count || 0;

  // Fetch categories for all providers in the list
  if (providerList.length > 0) {
    const providerIds = providerList.map((p) => p.id);
    const categoryLinks = await db
      .select({
        providerId: providerCategories.providerId,
        categoryId: providerCategories.categoryId,
      })
      .from(providerCategories)
      .where(inArray(providerCategories.providerId, providerIds));

    const categoryIds = Array.from(new Set(categoryLinks.map((c) => c.categoryId)));
    const allCategories = categoryIds.length > 0
      ? await db.select().from(categories).where(inArray(categories.id, categoryIds))
      : [];

    const categoryMap = new Map(allCategories.map((c) => [c.id, c]));

    // Attach categories to each provider
    const providersWithCategories = providerList.map((p) => {
      const providerCategoryIds = categoryLinks
        .filter((c) => c.providerId === p.id)
        .map((c) => c.categoryId);
      const providerCategs = providerCategoryIds
        .map((id) => categoryMap.get(id))
        .filter(Boolean);
      return { ...p, categories: providerCategs };
    });

    return {
      providers: providersWithCategories,
      total
    };
  }

  return { providers: providerList.map(p => ({ ...p, categories: [] })), total };
}

export async function getProviderBySlug(slug: string) {
  const db = await getDb();
  const result = await db.select().from(providers).where(eq(providers.slug, slug)).limit(1);
  return result[0];
}

export async function getProviderById(id: number) {
  const db = await getDb();
  const result = await db.select().from(providers).where(eq(providers.id, id)).limit(1);
  return result[0];
}

export async function createProvider(data: InsertProvider): Promise<number> {
  const db = await getDb();
  const result = await db.insert(providers).values(data).returning({ id: providers.id });
  return result[0].id;
}

export async function updateProvider(id: number, data: Partial<InsertProvider>) {
  const db = await getDb();
  await db.update(providers).set(data).where(eq(providers.id, id));
}

export async function incrementProviderViewCount(id: number) {
  const db = await getDb();
  await db.update(providers)
    .set({ viewCount: sql`${providers.viewCount} + 1` })
    .where(eq(providers.id, id));
}

// ==================== Provider Categories ====================

export async function getProviderCategories(providerId: number) {
  const db = await getDb();

  const links = await db
    .select()
    .from(providerCategories)
    .where(eq(providerCategories.providerId, providerId));

  if (links.length === 0) return [];

  const categoryIds = links.map((l) => l.categoryId);
  return db.select().from(categories).where(inArray(categories.id, categoryIds));
}

export async function setProviderCategories(providerId: number, categoryIds: number[]) {
  const db = await getDb();

  // Delete existing
  await db.delete(providerCategories).where(eq(providerCategories.providerId, providerId));

  // Insert new
  if (categoryIds.length > 0) {
    await db.insert(providerCategories).values(
      categoryIds.map(categoryId => ({ providerId, categoryId }))
    );
  }
}

// ==================== Provider Services ====================

export async function getProviderServices(providerId: number) {
  const db = await getDb();
  return db.select().from(providerServices).where(eq(providerServices.providerId, providerId));
}

export async function setProviderServices(providerId: number, services: { name: string; description?: string }[]) {
  const db = await getDb();

  await db.delete(providerServices).where(eq(providerServices.providerId, providerId));

  if (services.length > 0) {
    await db.insert(providerServices).values(
      services.map(s => ({ providerId, name: s.name, description: s.description }))
    );
  }
}

// ==================== Provider Cases ====================

export async function getProviderCases(providerId: number) {
  const db = await getDb();
  return db.select().from(providerCases)
    .where(eq(providerCases.providerId, providerId))
    .orderBy(asc(providerCases.sortOrder));
}

export async function createProviderCase(data: InsertProviderCase) {
  const db = await getDb();
  await db.insert(providerCases).values(data);
}

export async function deleteProviderCase(id: number) {
  const db = await getDb();
  await db.delete(providerCases).where(eq(providerCases.id, id));
}

// ==================== Provider Clients ====================

export async function getProviderClients(providerId: number) {
  const db = await getDb();
  return db.select().from(providerClients).where(eq(providerClients.providerId, providerId));
}

export async function setProviderClients(providerId: number, clients: { name: string; logo?: string }[]) {
  const db = await getDb();

  await db.delete(providerClients).where(eq(providerClients.providerId, providerId));

  if (clients.length > 0) {
    await db.insert(providerClients).values(
      clients.map(c => ({ providerId, name: c.name, logo: c.logo }))
    );
  }
}

// ==================== Favorites ====================

export async function getUserFavorites(userId: number) {
  const db = await getDb();

  const favs = await db.select().from(favorites).where(eq(favorites.userId, userId));
  if (favs.length === 0) return [];

  const providerIds = favs.map((f) => f.providerId);
  return db.select().from(providers).where(inArray(providers.id, providerIds));
}

export async function isFavorite(userId: number, providerId: number) {
  const db = await getDb();

  const result = await db.select().from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.providerId, providerId)))
    .limit(1);
  return result.length > 0;
}

export async function addFavorite(userId: number, providerId: number) {
  const db = await getDb();

  const exists = await isFavorite(userId, providerId);
  if (!exists) {
    await db.insert(favorites).values({ userId, providerId });
  }
}

export async function removeFavorite(userId: number, providerId: number) {
  const db = await getDb();

  await db.delete(favorites).where(
    and(eq(favorites.userId, userId), eq(favorites.providerId, providerId))
  );
}

// ==================== Provider Applications ====================

export async function createProviderApplication(data: InsertProviderApplication) {
  const db = await getDb();
  await db.insert(providerApplications).values(data);
}

export async function getProviderApplications(status?: "pending" | "approved" | "rejected") {
  const db = await getDb();

  if (status) {
    return db.select().from(providerApplications)
      .where(eq(providerApplications.status, status))
      .orderBy(desc(providerApplications.createdAt));
  }
  return db.select().from(providerApplications).orderBy(desc(providerApplications.createdAt));
}

export async function updateProviderApplication(id: number, data: Partial<InsertProviderApplication>) {
  const db = await getDb();
  await db.update(providerApplications).set(data).where(eq(providerApplications.id, id));
}

// ==================== Contact Inquiries ====================

export async function createContactInquiry(data: InsertContactInquiry) {
  const db = await getDb();
  await db.insert(contactInquiries).values(data);

  // Increment contact count
  await db.update(providers)
    .set({ contactCount: sql`${providers.contactCount} + 1` })
    .where(eq(providers.id, data.providerId));
}

export async function getContactInquiries(providerId?: number) {
  const db = await getDb();

  if (providerId) {
    return db.select().from(contactInquiries)
      .where(eq(contactInquiries.providerId, providerId))
      .orderBy(desc(contactInquiries.createdAt));
  }
  return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
}

// ==================== Admin Statistics ====================

export async function getAdminStats() {
  const db = await getDb();

  const [
    totalProvidersResult,
    approvedProvidersResult,
    pendingProvidersResult,
    totalInquiriesResult,
    totalApplicationsResult,
    pendingApplicationsResult,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(providers),
    db.select({ count: sql<number>`count(*)` }).from(providers).where(eq(providers.status, 'approved')),
    db.select({ count: sql<number>`count(*)` }).from(providers).where(eq(providers.status, 'pending')),
    db.select({ count: sql<number>`count(*)` }).from(contactInquiries),
    db.select({ count: sql<number>`count(*)` }).from(providerApplications),
    db.select({ count: sql<number>`count(*)` }).from(providerApplications).where(eq(providerApplications.status, 'pending')),
  ]);

  return {
    totalProviders: totalProvidersResult[0]?.count || 0,
    approvedProviders: approvedProvidersResult[0]?.count || 0,
    pendingProviders: pendingProvidersResult[0]?.count || 0,
    totalInquiries: totalInquiriesResult[0]?.count || 0,
    totalApplications: totalApplicationsResult[0]?.count || 0,
    pendingApplications: pendingApplicationsResult[0]?.count || 0,
  };
}

// ==================== Provider CRUD ====================

export async function deleteProvider(id: number) {
  const db = await getDb();

  // Delete related data first
  await db.delete(providerCategories).where(eq(providerCategories.providerId, id));
  await db.delete(providerServices).where(eq(providerServices.providerId, id));
  await db.delete(providerCases).where(eq(providerCases.providerId, id));
  await db.delete(providerClients).where(eq(providerClients.providerId, id));
  await db.delete(favorites).where(eq(favorites.providerId, id));
  await db.delete(contactInquiries).where(eq(contactInquiries.providerId, id));

  // Delete provider
  await db.delete(providers).where(eq(providers.id, id));
}

// ==================== Category CRUD ====================

export async function updateCategory(id: number, data: Partial<InsertCategory>) {
  const db = await getDb();
  await db.update(categories).set({ ...data, updatedAt: new Date() }).where(eq(categories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  // Remove all provider-category links first
  await db.delete(providerCategories).where(eq(providerCategories.categoryId, id));
  // Delete the category
  await db.delete(categories).where(eq(categories.id, id));
}

// ==================== City CRUD ====================

export async function updateCity(id: number, data: Partial<InsertCity>) {
  const db = await getDb();
  await db.update(cities).set(data).where(eq(cities.id, id));
}

export async function deleteCity(id: number) {
  const db = await getDb();
  // Set cityId to null for all providers in this city
  await db.update(providers).set({ cityId: null }).where(eq(providers.cityId, id));
  // Delete the city
  await db.delete(cities).where(eq(cities.id, id));
}

// ==================== Blog Posts ====================

export async function getBlogPosts(options: {
  status?: "draft" | "published";
  limit?: number;
  offset?: number;
} = {}) {
  const db = await getDb();

  let query = db.select().from(blogPosts);

  if (options.status) {
    query = query.where(eq(blogPosts.status, options.status)) as typeof query;
  }

  query = query.orderBy(desc(blogPosts.createdAt)) as typeof query;

  if (options.limit) {
    query = query.limit(options.limit) as typeof query;
  }

  if (options.offset) {
    query = query.offset(options.offset) as typeof query;
  }

  return query;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0];
}

export async function createBlogPost(data: InsertBlogPost) {
  const db = await getDb();
  await db.insert(blogPosts).values(data);
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

