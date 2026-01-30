import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import * as db from "./db.js";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Categories
  categories: router({
    list: publicProcedure.query(async () => {
      return db.getAllCategories();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getCategoryBySlug(input.slug);
      }),
  }),

  // Cities
  cities: router({
    list: publicProcedure.query(async () => {
      return db.getAllCities();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getCityBySlug(input.slug);
      }),
  }),

  // Providers
  providers: router({
    list: publicProcedure
      .input(z.object({
        categoryId: z.number().optional(),
        cityId: z.number().optional(),
        search: z.string().optional(),
        featured: z.boolean().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        orderBy: z.enum(['weight', 'createdAt', 'viewCount']).default('weight'),
      }))
      .query(async ({ input }) => {
        return db.getProviders({
          ...input,
          status: 'approved',
        });
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const provider = await db.getProviderBySlug(input.slug);
        if (!provider) return null;

        // Increment view count
        await db.incrementProviderViewCount(provider.id);

        // Get related data
        const categories = await db.getProviderCategories(provider.id);
        const services = await db.getProviderServices(provider.id);
        const cases = await db.getProviderCases(provider.id);
        const clients = await db.getProviderClients(provider.id);

        return {
          ...provider,
          categories,
          services,
          cases,
          clients,
        };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const provider = await db.getProviderById(input.id);
        if (!provider) return null;

        const categories = await db.getProviderCategories(provider.id);
        const services = await db.getProviderServices(provider.id);
        const cases = await db.getProviderCases(provider.id);
        const clients = await db.getProviderClients(provider.id);

        return {
          ...provider,
          categories,
          services,
          cases,
          clients,
        };
      }),

    // Featured providers for homepage
    featured: publicProcedure
      .input(z.object({ limit: z.number().min(1).max(20).default(8) }))
      .query(async ({ input }) => {
        const result = await db.getProviders({
          featured: true,
          status: 'approved',
          limit: input.limit,
          orderBy: 'weight',
        });
        return result.providers;
      }),
  }),

  // Favorites (protected)
  favorites: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserFavorites(ctx.user.id);
    }),

    check: protectedProcedure
      .input(z.object({ providerId: z.number() }))
      .query(async ({ ctx, input }) => {
        return db.isFavorite(ctx.user.id, input.providerId);
      }),

    add: protectedProcedure
      .input(z.object({ providerId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.addFavorite(ctx.user.id, input.providerId);
        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ providerId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.removeFavorite(ctx.user.id, input.providerId);
        return { success: true };
      }),

    toggle: protectedProcedure
      .input(z.object({ providerId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const isFav = await db.isFavorite(ctx.user.id, input.providerId);
        if (isFav) {
          await db.removeFavorite(ctx.user.id, input.providerId);
          return { isFavorite: false };
        } else {
          await db.addFavorite(ctx.user.id, input.providerId);
          return { isFavorite: true };
        }
      }),
  }),

  // Contact inquiries
  contact: router({
    submit: publicProcedure
      .input(z.object({
        providerId: z.number(),
        name: z.string().min(1),
        company: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createContactInquiry({
          providerId: input.providerId,
          userId: ctx.user?.id,
          name: input.name,
          phone: input.phone,
          email: input.email,
          message: input.message,
        });
        return { success: true };
      }),
  }),

  // Provider applications (for self-registration)
  applications: router({
    submit: publicProcedure
      .input(z.object({
        companyName: z.string().min(1),
        englishName: z.string().optional(),
        contactPerson: z.string().min(1),
        contactPhone: z.string().min(1),
        contactEmail: z.string().email(),
        cityId: z.number().optional(),
        description: z.string().min(10),
        services: z.string().min(1),
        website: z.string().optional(),
        foundedYear: z.number().optional(),
        categoryIds: z.array(z.number()).min(1),
      }))
      .mutation(async ({ input }) => {
        await db.createProviderApplication({
          companyName: input.companyName,
          contactName: input.contactPerson,
          contactPhone: input.contactPhone,
          contactEmail: input.contactEmail,
          cityId: input.cityId,
          description: input.description,
          services: input.services,
          website: input.website,
          foundedYear: input.foundedYear,
          categoryIds: JSON.stringify(input.categoryIds),
        });
        return { success: true };
      }),

    // Admin only - list applications
    list: protectedProcedure
      .input(z.object({
        status: z.enum(['pending', 'approved', 'rejected']).optional(),
      }))
      .query(async ({ ctx, input }) => {
        // Check if user is admin
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.getProviderApplications(input.status);
      }),

    // Admin only - update application status
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['approved', 'rejected']),
        reviewNotes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }

        // If approving, create a provider from the application
        if (input.status === 'approved') {
          // Get the application details first
          const applications = await db.getProviderApplications();
          const application = applications.find(a => a.id === input.id);

          if (application) {
            // Generate a slug from the company name
            const slug = `provider-${Date.now()}`;

            // Create the provider with cityId from application
            const providerId = await db.createProvider({
              name: application.companyName,
              slug,
              description: application.description,
              shortDescription: application.services,
              website: application.website,
              phone: application.contactPhone,
              email: application.contactEmail,
              cityId: application.cityId || undefined,
              foundedYear: application.foundedYear || undefined,
              status: 'approved',
              verified: false,
              featured: false,
              weight: 50,
            });

            // Set categories
            if (application.categoryIds) {
              try {
                const categoryIds = JSON.parse(application.categoryIds);
                if (Array.isArray(categoryIds) && categoryIds.length > 0) {
                  await db.setProviderCategories(providerId, categoryIds);
                }
              } catch (e) {
                console.error("Failed to parse categoryIds from application", e);
              }
            }
          }
        }

        await db.updateProviderApplication(input.id, {
          status: input.status,
          reviewedBy: ctx.user.id,
          reviewedAt: new Date(),
          reviewNote: input.reviewNotes,
        });
        return { success: true };
      }),
  }),

  // Admin routes
  admin: router({
    // Dashboard stats
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return db.getAdminStats();
    }),

    // Get all providers (including pending)
    providers: protectedProcedure
      .input(z.object({
        status: z.enum(['pending', 'approved', 'rejected']).optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.getProviders(input);
      }),

    // Create provider
    createProvider: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        englishName: z.string().optional(),
        slug: z.string().min(1),
        description: z.string().optional(),
        shortDescription: z.string().optional(),
        cityId: z.number().optional(),
        foundedYear: z.number().optional(),
        website: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        verified: z.boolean().default(false),
        featured: z.boolean().default(false),
        weight: z.number().default(0),
        status: z.enum(['pending', 'approved', 'rejected']).default('approved'),
        categoryIds: z.array(z.number()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { categoryIds, ...providerData } = input;
        const providerId = await db.createProvider(providerData);

        // Set categories if provided
        if (categoryIds && categoryIds.length > 0) {
          await db.setProviderCategories(providerId, categoryIds);
        }

        return { success: true, id: providerId };
      }),

    // Update provider
    updateProvider: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        englishName: z.string().optional(),
        description: z.string().optional(),
        shortDescription: z.string().optional(),
        website: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        cityId: z.number().optional(),
        foundedYear: z.number().optional(),
        verified: z.boolean().optional(),
        featured: z.boolean().optional(),
        weight: z.number().optional(),
        status: z.enum(['pending', 'approved', 'rejected']).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...data } = input;
        await db.updateProvider(id, data);
        return { success: true };
      }),

    // Delete provider
    deleteProvider: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await db.deleteProvider(input.id);
        return { success: true };
      }),

    // Get contact inquiries
    inquiries: protectedProcedure
      .input(z.object({
        providerId: z.number().optional(),
      }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.getContactInquiries(input.providerId);
      }),

    // Category management
    categories: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return db.getAllCategories();
    }),

    createCategory: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        icon: z.string().optional(),
        description: z.string().optional(),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await db.createCategory(input);
        return { success: true };
      }),

    updateCategory: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        slug: z.string().optional(),
        icon: z.string().optional(),
        description: z.string().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...data } = input;
        await db.updateCategory(id, data);
        return { success: true };
      }),

    deleteCategory: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await db.deleteCategory(input.id);
        return { success: true };
      }),

    // City management
    cities: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return db.getAllCities();
    }),

    createCity: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await db.createCity(input);
        return { success: true };
      }),

    updateCity: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        slug: z.string().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...data } = input;
        await db.updateCity(id, data);
        return { success: true };
      }),

    deleteCity: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await db.deleteCity(input.id);
        return { success: true };
      }),
  }),

  // Blog
  blog: router({
    list: publicProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
      }))
      .query(async ({ input }) => {
        return db.getBlogPosts({ status: "published", ...input });
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getBlogPostBySlug(input.slug);
      }),

    // Admin routes
    admin: router({
      list: protectedProcedure
        .input(z.object({
          status: z.enum(["draft", "published"]).optional(),
          limit: z.number().default(50),
          offset: z.number().default(0),
        }))
        .query(async ({ ctx, input }) => {
          if (ctx.user.role !== 'admin') throw new Error("Unauthorized");
          return db.getBlogPosts(input);
        }),

      create: protectedProcedure
        .input(z.object({
          title: z.string().min(1),
          slug: z.string().min(1),
          content: z.string().min(1),
          excerpt: z.string().optional(),
          coverImage: z.string().optional(),
          author: z.string().optional(),
          status: z.enum(["draft", "published"]).default("draft"),
          tags: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
          if (ctx.user.role !== 'admin') throw new Error("Unauthorized");
          await db.createBlogPost(input);
          return { success: true };
        }),

      update: protectedProcedure
        .input(z.object({
          id: z.number(),
          title: z.string().optional(),
          slug: z.string().optional(),
          content: z.string().optional(),
          excerpt: z.string().optional(),
          coverImage: z.string().optional(),
          author: z.string().optional(),
          status: z.enum(["draft", "published"]).optional(),
          tags: z.string().optional(),
          publishedAt: z.date().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
          if (ctx.user.role !== 'admin') throw new Error("Unauthorized");
          const { id, ...data } = input;
          await db.updateBlogPost(id, data);
          return { success: true };
        }),

      delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
          if (ctx.user.role !== 'admin') throw new Error("Unauthorized");
          await db.deleteBlogPost(input.id);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
