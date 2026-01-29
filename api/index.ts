import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { registerAuthRoutes } from "../server/_core/oauth";

const app = express();

// Configure body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Auth routes
registerAuthRoutes(app);

// tRPC API
app.use(
    "/api/trpc",
    createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

export default app;
