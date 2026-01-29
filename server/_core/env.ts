export const ENV: {
  cookieSecret: string;
  databaseUrl: string;
  databaseAuthToken: string;
  adminEmail: string;
  isProduction: boolean;
  forgeApiUrl: string;
  forgeApiKey: string;
  openaiApiKey: string;
  replicateApiKey: string;
  googleMapsApiKey: string;
} = {
  cookieSecret: process.env.JWT_SECRET ?? "dev-secret-key-change-in-production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  databaseAuthToken: process.env.DATABASE_AUTH_TOKEN ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  // AI / External Services (Optional defaults)
  forgeApiUrl: process.env.FORGE_API_URL ?? "",
  forgeApiKey: process.env.FORGE_API_KEY ?? "",
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  replicateApiKey: process.env.REPLICATE_API_KEY ?? "",
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",
};
