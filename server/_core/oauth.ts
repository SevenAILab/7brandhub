import { COOKIE_NAME, ONE_YEAR_MS } from "../../shared/const.js";
import { Request, Response, Application } from "express";
import * as db from "../db.js";
import { getSessionCookieOptions } from "./cookies.js";
import { authService } from "./sdk.js";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export function registerAuthRoutes(app: Application) {
  // Login endpoint
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ error: "Invalid email or password format" });
        return;
      }

      const { email, password } = result.data;
      const user = await db.getUserByEmail(email);

      if (!user || !user.password) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const isValid = await authService.verifyPassword(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Update last sign in
      await db.updateUserLastSignIn(user.id);

      // Create session token
      const sessionToken = await authService.createSessionToken(user, {
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Register endpoint
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ error: "Invalid registration data" });
        return;
      }

      const { email, password, name } = result.data;

      // Check if user already exists
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        res.status(409).json({ error: "Email already registered" });
        return;
      }

      // Hash password and create user
      const hashedPassword = await authService.hashPassword(password);
      const userId = await db.createUser({
        email,
        password: hashedPassword,
        name,
      });

      const user = await db.getUserById(userId);
      if (!user) {
        res.status(500).json({ error: "Failed to create user" });
        return;
      }

      // Create session token
      const sessionToken = await authService.createSessionToken(user, {
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("[Auth] Registration failed", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
}
