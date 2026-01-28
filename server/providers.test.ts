import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getAllCategories: vi.fn().mockResolvedValue([
    { id: 1, name: "品牌策略", slug: "brand-strategy", description: "品牌定位与策略咨询" },
    { id: 2, name: "品牌设计", slug: "brand-design", description: "视觉识别与品牌设计" },
  ]),
  getAllCities: vi.fn().mockResolvedValue([
    { id: 1, name: "上海", slug: "shanghai" },
    { id: 2, name: "北京", slug: "beijing" },
  ]),
  getCategoryBySlug: vi.fn().mockImplementation((slug: string) => {
    if (slug === "brand-strategy") {
      return Promise.resolve({ id: 1, name: "品牌策略", slug: "brand-strategy" });
    }
    return Promise.resolve(null);
  }),
  getCityBySlug: vi.fn().mockImplementation((slug: string) => {
    if (slug === "shanghai") {
      return Promise.resolve({ id: 1, name: "上海", slug: "shanghai" });
    }
    return Promise.resolve(null);
  }),
  getProviders: vi.fn().mockResolvedValue({
    providers: [
      { id: 1, name: "测试服务商", slug: "test-provider", verified: true, featured: true },
    ],
    total: 1,
  }),
  getProviderBySlug: vi.fn().mockImplementation((slug: string) => {
    if (slug === "test-provider") {
      return Promise.resolve({
        id: 1,
        name: "测试服务商",
        slug: "test-provider",
        description: "这是一家测试服务商",
        verified: true,
      });
    }
    return Promise.resolve(null);
  }),
  getProviderById: vi.fn().mockImplementation((id: number) => {
    if (id === 1) {
      return Promise.resolve({
        id: 1,
        name: "测试服务商",
        slug: "test-provider",
      });
    }
    return Promise.resolve(null);
  }),
  incrementProviderViewCount: vi.fn().mockResolvedValue(undefined),
  getProviderCategories: vi.fn().mockResolvedValue([
    { id: 1, name: "品牌策略" },
  ]),
  getProviderServices: vi.fn().mockResolvedValue([
    { id: 1, name: "品牌定位", description: "帮助品牌找到独特定位" },
  ]),
  getProviderCases: vi.fn().mockResolvedValue([
    { id: 1, title: "案例1", clientName: "客户A" },
  ]),
  getProviderClients: vi.fn().mockResolvedValue([
    { id: 1, name: "客户A" },
  ]),
  getUserFavorites: vi.fn().mockResolvedValue([]),
  isFavorite: vi.fn().mockResolvedValue(false),
  addFavorite: vi.fn().mockResolvedValue(undefined),
  removeFavorite: vi.fn().mockResolvedValue(undefined),
  createContactInquiry: vi.fn().mockResolvedValue(undefined),
  createProviderApplication: vi.fn().mockResolvedValue(undefined),
  getProviderApplications: vi.fn().mockResolvedValue([]),
  updateProviderApplication: vi.fn().mockResolvedValue(undefined),
  updateProvider: vi.fn().mockResolvedValue(undefined),
  getContactInquiries: vi.fn().mockResolvedValue([]),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("categories router", () => {
  it("lists all categories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.categories.list();

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("name", "品牌策略");
  });

  it("gets category by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.categories.getBySlug({ slug: "brand-strategy" });

    expect(result).toBeDefined();
    expect(result?.name).toBe("品牌策略");
  });

  it("returns null for non-existent category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.categories.getBySlug({ slug: "non-existent" });

    expect(result).toBeNull();
  });
});

describe("cities router", () => {
  it("lists all cities", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cities.list();

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("name", "上海");
  });
});

describe("providers router", () => {
  it("lists providers with default parameters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.providers.list({});

    expect(result.providers).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it("gets provider by slug with related data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.providers.getBySlug({ slug: "test-provider" });

    expect(result).toBeDefined();
    expect(result?.name).toBe("测试服务商");
    expect(result?.categories).toHaveLength(1);
    expect(result?.services).toHaveLength(1);
    expect(result?.cases).toHaveLength(1);
    expect(result?.clients).toHaveLength(1);
  });

  it("returns null for non-existent provider", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.providers.getBySlug({ slug: "non-existent" });

    expect(result).toBeNull();
  });

  it("gets featured providers", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.providers.featured({ limit: 8 });

    expect(result).toHaveLength(1);
  });
});

describe("favorites router", () => {
  it("requires authentication for listing favorites", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.favorites.list()).rejects.toThrow();
  });

  it("lists favorites for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.favorites.list();

    expect(result).toEqual([]);
  });

  it("toggles favorite status", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.favorites.toggle({ providerId: 1 });

    expect(result).toHaveProperty("isFavorite");
  });
});

describe("contact router", () => {
  it("submits contact inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      providerId: 1,
      name: "测试用户",
      email: "test@example.com",
      message: "我想咨询服务",
    });

    expect(result).toEqual({ success: true });
  });
});

describe("applications router", () => {
  it("submits provider application", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.applications.submit({
      companyName: "测试公司",
      contactPerson: "张三",
      contactPhone: "13800138000",
      contactEmail: "test@company.com",
      city: "上海",
      description: "这是一家专业的品牌服务公司，拥有丰富的行业经验。",
      services: "品牌策略、包装设计",
    });

    expect(result).toEqual({ success: true });
  });

  it("requires admin role to list applications", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    await expect(caller.applications.list({})).rejects.toThrow("Unauthorized");
  });

  it("allows admin to list applications", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.applications.list({});

    expect(result).toEqual([]);
  });
});

describe("admin router", () => {
  it("requires admin role to access admin routes", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.providers({})).rejects.toThrow("Unauthorized");
  });

  it("allows admin to list all providers", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.providers({});

    expect(result.providers).toHaveLength(1);
  });

  it("allows admin to update provider", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.updateProvider({
      id: 1,
      featured: true,
    });

    expect(result).toEqual({ success: true });
  });
});
