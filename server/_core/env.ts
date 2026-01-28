export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "dev-secret-key-change-in-production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  isProduction: process.env.NODE_ENV === "production",
};
