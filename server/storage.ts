import { products, quoteRequests, adminSessions, type Product, type InsertProduct, type QuoteRequest, type InsertQuoteRequest, type AdminSession, type InsertAdminSession } from "@shared/schema";
import { db, initializeDatabase } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createQuoteRequest(quoteRequest: InsertQuoteRequest): Promise<QuoteRequest>;
  createAdminSession(session: InsertAdminSession): Promise<AdminSession>;
  getAdminSession(sessionId: string): Promise<AdminSession | undefined>;
  deleteAdminSession(sessionId: string): Promise<void>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
  getProductCount(): Promise<number>;
  getQuoteRequestCount(): Promise<number>;
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize database tables on first use
    initializeDatabase();
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createQuoteRequest(insertQuoteRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const [quoteRequest] = await db
      .insert(quoteRequests)
      .values(insertQuoteRequest)
      .returning();
    return quoteRequest;
  }

  async createAdminSession(insertSession: InsertAdminSession): Promise<AdminSession> {
    const [session] = await db
      .insert(adminSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getAdminSession(sessionId: string): Promise<AdminSession | undefined> {
    const [session] = await db.select().from(adminSessions).where(eq(adminSessions.sessionId, sessionId));
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session && session.expiresAt <= new Date()) {
      await this.deleteAdminSession(sessionId);
    }
    return undefined;
  }

  async deleteAdminSession(sessionId: string): Promise<void> {
    await db.delete(adminSessions).where(eq(adminSessions.sessionId, sessionId));
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return await db.select().from(quoteRequests);
  }

  async getProductCount(): Promise<number> {
    const result = await db.select().from(products);
    return result.length;
  }

  async getQuoteRequestCount(): Promise<number> {
    const result = await db.select().from(quoteRequests);
    return result.length;
  }
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private quoteRequests: Map<number, QuoteRequest>;
  private adminSessions: Map<string, AdminSession>;
  private currentProductId: number;
  private currentQuoteId: number;
  private currentSessionId: number;

  constructor() {
    this.products = new Map();
    this.quoteRequests = new Map();
    this.adminSessions = new Map();
    this.currentProductId = 1;
    this.currentQuoteId = 1;
    this.currentSessionId = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Omit<Product, 'id'>[] = [
      // Industrial Equipment
      { name: "Heavy Duty Compressor", category: "industrial", description: "Professional grade compressor for heavy industrial applications", weight: "450 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Industrial Generator", category: "industrial", description: "High capacity power generation unit for continuous operation", weight: "850 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Pneumatic Valve System", category: "industrial", description: "Precision control valve for automated industrial processes", weight: "25 kg", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Air Filtration System", category: "industrial", description: "High efficiency particulate air filtration for clean environments", weight: "75 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Industrial Scales", category: "industrial", description: "Heavy duty platform scales for accurate weight measurement", weight: "120 kg", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Pump Control System", category: "industrial", description: "Automated pump control with variable frequency drive", weight: "45 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Industrial Fans", category: "industrial", description: "High volume industrial exhaust fans for ventilation systems", weight: "85 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Motor Drive Units", category: "industrial", description: "Variable frequency drives for motor speed control", weight: "18 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      
      // Machinery
      { name: "Hydraulic Press", category: "machinery", description: "High pressure hydraulic press for metal forming operations", weight: "1200 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Conveyor Belt System", category: "machinery", description: "Modular conveyor system for material handling and transportation", weight: "320 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "CNC Milling Machine", category: "machinery", description: "Precision computer-controlled milling machine for accurate machining", weight: "2100 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Robotic Assembly Arm", category: "machinery", description: "6-axis robotic arm for automated assembly and handling tasks", weight: "180 kg", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Industrial Lathe", category: "machinery", description: "Heavy duty turning lathe for precision metalworking operations", weight: "1800 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Packaging Machine", category: "machinery", description: "Automated packaging system for high-volume production lines", weight: "650 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Welding Station", category: "machinery", description: "Professional welding workstation with fume extraction system", weight: "280 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Grinding Machine", category: "machinery", description: "Precision surface grinding machine for finishing operations", weight: "950 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Press Brake", category: "machinery", description: "Hydraulic press brake for sheet metal bending operations", weight: "1650 kg", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Injection Molding Machine", category: "machinery", description: "Plastic injection molding machine for production manufacturing", weight: "3200 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Hoisting Equipment", category: "machinery", description: "Electric chain hoist for heavy lifting applications", weight: "45 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Drill Press", category: "machinery", description: "Heavy duty floor standing drill press for precision drilling", weight: "185 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      
      // Tools
      { name: "Precision Measuring Tools", category: "tools", description: "Professional grade calipers and measuring instruments set", weight: "5 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Impact Wrench Set", category: "tools", description: "High torque pneumatic impact wrench with socket set", weight: "12 kg", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Diamond Cutting Blades", category: "tools", description: "Industrial diamond cutting blades for concrete and masonry", weight: "3 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Safety Equipment Kit", category: "tools", description: "Complete safety kit with helmets, gloves, and protective gear", weight: "8 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Tool Storage Cabinet", category: "tools", description: "Heavy duty steel tool cabinet with multiple drawers", weight: "95 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Cutting Tool Set", category: "tools", description: "Carbide cutting tools for machining various materials", weight: "7 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Hydraulic Jack", category: "tools", description: "Heavy duty hydraulic floor jack for lifting applications", weight: "35 kg", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Torque Wrench Set", category: "tools", description: "Precision torque wrenches for accurate bolt tightening", weight: "4 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Inspection Camera", category: "tools", description: "Digital inspection camera for remote visual examination", weight: "2 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Work Bench", category: "tools", description: "Heavy duty steel workbench with integrated storage", weight: "125 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" }
    ];

    sampleProducts.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async createQuoteRequest(insertQuoteRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteId++;
    const quoteRequest: QuoteRequest = {
      ...insertQuoteRequest,
      id,
      createdAt: new Date(),
      phone: insertQuoteRequest.phone || null,
      company: insertQuoteRequest.company || null,
      productInterest: insertQuoteRequest.productInterest || null,
    };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }

  async createAdminSession(insertSession: InsertAdminSession): Promise<AdminSession> {
    const id = this.currentSessionId++;
    const session: AdminSession = {
      ...insertSession,
      id,
      createdAt: new Date(),
    };
    this.adminSessions.set(insertSession.sessionId, session);
    return session;
  }

  async getAdminSession(sessionId: string): Promise<AdminSession | undefined> {
    const session = this.adminSessions.get(sessionId);
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session && session.expiresAt <= new Date()) {
      this.adminSessions.delete(sessionId);
    }
    return undefined;
  }

  async deleteAdminSession(sessionId: string): Promise<void> {
    this.adminSessions.delete(sessionId);
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }

  async getProductCount(): Promise<number> {
    return this.products.size;
  }

  async getQuoteRequestCount(): Promise<number> {
    return this.quoteRequests.size;
  }
}

export const storage = new DatabaseStorage();
