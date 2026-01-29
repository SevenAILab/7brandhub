CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`cover_image` text,
	`author` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`category_id` integer,
	`tags` text,
	`view_count` integer DEFAULT 0,
	`published_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`icon` text,
	`description` text,
	`sortOrder` integer DEFAULT 0,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `cities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sortOrder` integer DEFAULT 0,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cities_slug_unique` ON `cities` (`slug`);--> statement-breakpoint
CREATE TABLE `contact_inquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`providerId` integer NOT NULL,
	`userId` integer,
	`name` text NOT NULL,
	`phone` text,
	`email` text,
	`message` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`providerId` integer NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `provider_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`companyName` text NOT NULL,
	`contactName` text NOT NULL,
	`contactPhone` text NOT NULL,
	`contactEmail` text,
	`cityId` integer,
	`services` text,
	`website` text,
	`description` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`reviewNote` text,
	`reviewedAt` integer,
	`reviewedBy` integer,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `provider_cases` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`providerId` integer NOT NULL,
	`title` text NOT NULL,
	`clientName` text,
	`description` text,
	`imageUrl` text,
	`sortOrder` integer DEFAULT 0,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `provider_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`providerId` integer NOT NULL,
	`categoryId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `provider_clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`providerId` integer NOT NULL,
	`name` text NOT NULL,
	`logo` text
);
--> statement-breakpoint
CREATE TABLE `provider_services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`providerId` integer NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`englishName` text,
	`logo` text,
	`description` text,
	`shortDescription` text,
	`cityId` integer,
	`foundedYear` integer,
	`teamSize` text,
	`website` text,
	`phone` text,
	`email` text,
	`address` text,
	`verified` integer DEFAULT false,
	`featured` integer DEFAULT false,
	`weight` integer DEFAULT 0,
	`status` text DEFAULT 'pending' NOT NULL,
	`ownerId` integer,
	`viewCount` integer DEFAULT 0,
	`contactCount` integer DEFAULT 0,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `providers_slug_unique` ON `providers` (`slug`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`name` text,
	`role` text DEFAULT 'user' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`lastSignedIn` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);