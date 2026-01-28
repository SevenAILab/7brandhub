CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`icon` varchar(50),
	`description` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`slug` varchar(50) NOT NULL,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cities_id` PRIMARY KEY(`id`),
	CONSTRAINT `cities_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`providerId` int NOT NULL,
	`userId` int,
	`name` varchar(100) NOT NULL,
	`phone` varchar(50),
	`email` varchar(320),
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`providerId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provider_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`companyName` varchar(200) NOT NULL,
	`contactName` varchar(100) NOT NULL,
	`contactPhone` varchar(50) NOT NULL,
	`contactEmail` varchar(320),
	`cityId` int,
	`services` text,
	`website` varchar(500),
	`description` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`reviewNote` text,
	`reviewedAt` timestamp,
	`reviewedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `provider_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provider_cases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`providerId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`clientName` varchar(200),
	`description` text,
	`imageUrl` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `provider_cases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provider_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`providerId` int NOT NULL,
	`categoryId` int NOT NULL,
	CONSTRAINT `provider_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provider_clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`providerId` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`logo` text,
	CONSTRAINT `provider_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provider_services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`providerId` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	CONSTRAINT `provider_services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`slug` varchar(200) NOT NULL,
	`englishName` varchar(200),
	`logo` text,
	`description` text,
	`shortDescription` varchar(500),
	`cityId` int,
	`foundedYear` int,
	`teamSize` varchar(50),
	`website` varchar(500),
	`phone` varchar(100),
	`email` varchar(320),
	`address` text,
	`verified` boolean DEFAULT false,
	`featured` boolean DEFAULT false,
	`weight` int DEFAULT 0,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`ownerId` int,
	`viewCount` int DEFAULT 0,
	`contactCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `providers_id` PRIMARY KEY(`id`),
	CONSTRAINT `providers_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','provider') NOT NULL DEFAULT 'user';