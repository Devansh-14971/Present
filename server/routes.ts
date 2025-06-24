import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, adminLoginSchema } from "@shared/schema";
import { randomBytes } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  // Create quote request
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quoteRequest = await storage.createQuoteRequest(validatedData);
      res.status(201).json({ 
        message: "Quote request submitted successfully",
        id: quoteRequest.id 
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create quote request" });
      }
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { key } = adminLoginSchema.parse(req.body);
      
      if (key !== "yesyesyes") {
        return res.status(401).json({ message: "Invalid admin key" });
      }

      const sessionId = randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await storage.createAdminSession({ sessionId, expiresAt });

      res.json({ sessionId, message: "Login successful" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Login failed" });
      }
    }
  });

  // Verify admin session
  app.get("/api/admin/verify", async (req, res) => {
    try {
      const sessionId = req.headers.authorization?.replace('Bearer ', '');
      
      if (!sessionId) {
        return res.status(401).json({ message: "No session token provided" });
      }

      const session = await storage.getAdminSession(sessionId);
      
      if (!session) {
        return res.status(401).json({ message: "Invalid or expired session" });
      }

      res.json({ valid: true, message: "Session is valid" });
    } catch (error) {
      res.status(500).json({ message: "Failed to verify session" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", async (req, res) => {
    try {
      const sessionId = req.headers.authorization?.replace('Bearer ', '');
      
      if (sessionId) {
        await storage.deleteAdminSession(sessionId);
      }

      res.json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Admin dashboard data
  app.get("/api/admin/dashboard", async (req, res) => {
    try {
      const sessionId = req.headers.authorization?.replace('Bearer ', '');
      
      if (!sessionId) {
        return res.status(401).json({ message: "No session token provided" });
      }

      const session = await storage.getAdminSession(sessionId);
      
      if (!session) {
        return res.status(401).json({ message: "Invalid or expired session" });
      }

      const [productCount, quoteRequestCount, allQuoteRequests] = await Promise.all([
        storage.getProductCount(),
        storage.getQuoteRequestCount(),
        storage.getQuoteRequests()
      ]);

      // Calculate this month's quote requests
      const thisMonth = new Date();
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);
      
      const thisMonthQuotes = allQuoteRequests.filter(quote => 
        quote.createdAt && new Date(quote.createdAt) >= thisMonth
      ).length;

      // Recent activities from quote requests
      const recentActivities = allQuoteRequests
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 5)
        .map(quote => ({
          action: "New quote request received",
          details: `${quote.productInterest || "General inquiry"} - ${quote.company || quote.firstName + " " + quote.lastName}`,
          time: quote.createdAt ? getTimeAgo(new Date(quote.createdAt)) : "Unknown",
          type: "quote"
        }));

      res.json({
        stats: {
          productCount,
          quoteRequestCount,
          thisMonthQuotes,
          // Mock data for other stats
          activeUsers: 1247,
          revenue: 45231
        },
        recentActivities
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  }

  const httpServer = createServer(app);
  return httpServer;
}
