import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password"),
  name: text("name"),
  role: text("role", { enum: ["user", "admin", "provider"] }).default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Service categories table
 */
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
  description: text("description"),
  sortOrder: integer("sortOrder").default(0),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Cities table
 */
export const cities = sqliteTable("cities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sortOrder").default(0),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type City = typeof cities.$inferSelect;
export type InsertCity = typeof cities.$inferInsert;

/**
 * Service providers table
 */
export const providers = sqliteTable("providers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  englishName: text("englishName"),
  logo: text("logo"),
  description: text("description"),
  shortDescription: text("shortDescription"),
  cityId: integer("cityId"),
  foundedYear: integer("foundedYear"),
  teamSize: text("teamSize"),
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  verified: integer("verified", { mode: "boolean" }).default(false),
  featured: integer("featured", { mode: "boolean" }).default(false),
  weight: integer("weight").default(0),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).default("pending").notNull(),
  ownerId: integer("ownerId"),
  viewCount: integer("viewCount").default(0),
  contactCount: integer("contactCount").default(0),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Provider = typeof providers.$inferSelect;
export type InsertProvider = typeof providers.$inferInsert;

/**
 * Provider categories junction table
 */
export const providerCategories = sqliteTable("provider_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  providerId: integer("providerId").notNull(),
  categoryId: integer("categoryId").notNull(),
});

export type ProviderCategory = typeof providerCategories.$inferSelect;
export type InsertProviderCategory = typeof providerCategories.$inferInsert;

/**
 * Provider services/capabilities
 */
export const providerServices = sqliteTable("provider_services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  providerId: integer("providerId").notNull(),
  name: text("name").notNull(),
  description: text("description"),
});

export type ProviderService = typeof providerServices.$inferSelect;
export type InsertProviderService = typeof providerServices.$inferInsert;

/**
 * Provider case studies/portfolio
 */
export const providerCases = sqliteTable("provider_cases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  providerId: integer("providerId").notNull(),

  // Core Info
  title: text("title").notNull(),
  clientName: text("clientName"),
  industry: text("industry"),
  serviceType: text("serviceType"),

  // Deep Content
  description: text("description"), // Summary
  challenge: text("challenge"),     // The problem
  solution: text("solution"),       // The approach
  result: text("result"),           // The outcome

  // Media
  coverImage: text("cover_image"),
  images: text("images"),           // JSON array of image URLs
  videoUrl: text("video_url"),

  // Meta
  tags: text("tags"),               // JSON array of tags
  sortOrder: integer("sortOrder").default(0),

  // AI
  embedding: text("embedding"),     // JSON or serialized vector

  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type ProviderCase = typeof providerCases.$inferSelect;
export type InsertProviderCase = typeof providerCases.$inferInsert;

/**
 * Provider clients (served brands)
 */
export const providerClients = sqliteTable("provider_clients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  providerId: integer("providerId").notNull(),
  name: text("name").notNull(),
  logo: text("logo"),
});

export type ProviderClient = typeof providerClients.$inferSelect;
export type InsertProviderClient = typeof providerClients.$inferInsert;

/**
 * User favorites/bookmarks
 */
export const favorites = sqliteTable("favorites", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  providerId: integer("providerId").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

/**
 * Provider applications (for self-registration)
 */
export const providerApplications = sqliteTable("provider_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId"),
  companyName: text("companyName").notNull(),
  contactName: text("contactName").notNull(),
  contactPhone: text("contactPhone").notNull(),
  contactEmail: text("contactEmail"),
  cityId: integer("cityId"),
  foundedYear: integer("foundedYear"),
  categoryIds: text("categoryIds"), // JSON array of category IDs
  services: text("services"),
  website: text("website"),
  description: text("description"),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).default("pending").notNull(),
  reviewNote: text("reviewNote"),
  reviewedAt: integer("reviewedAt", { mode: "timestamp" }),
  reviewedBy: integer("reviewedBy"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type ProviderApplication = typeof providerApplications.$inferSelect;
export type InsertProviderApplication = typeof providerApplications.$inferInsert;

/**
 * Contact inquiries
 */
export const contactInquiries = sqliteTable("contact_inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  providerId: integer("providerId").notNull(),
  userId: integer("userId"),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  message: text("message"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;

/**
 * Blog posts
 */
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  author: text("author"),
  status: text("status", { enum: ["draft", "published"] }).default("draft").notNull(),
  categoryId: integer("category_id"),
  tags: text("tags"),
  viewCount: integer("view_count").default(0),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;
