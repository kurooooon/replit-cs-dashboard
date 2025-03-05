import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/users/search", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.sendStatus(401);
    }

    const query = req.query.q as string;
    if (!query) {
      return res.json([]);
    }

    const users = await storage.searchUsers(query);
    res.json(users);
  });

  const httpServer = createServer(app);
  return httpServer;
}
