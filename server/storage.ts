import { products, quoteRequests, type Product, type InsertProduct, type QuoteRequest, type InsertQuoteRequest } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createQuoteRequest(quoteRequest: InsertQuoteRequest): Promise<QuoteRequest>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private quoteRequests: Map<number, QuoteRequest>;
  private currentProductId: number;
  private currentQuoteId: number;

  constructor() {
    this.products = new Map();
    this.quoteRequests = new Map();
    this.currentProductId = 1;
    this.currentQuoteId = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Omit<Product, 'id'>[] = [
      // Industrial Equipment
      {
    name: "Heavy Duty Compressor",
    category: "industrial",
    description: "Professional grade compressor for heavy industrial applications",
    weight: "450 kg",
    imageUrl: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Industrial Generator",
    category: "industrial",
    description: "High capacity power generation unit for continuous operation",
    weight: "850 kg",
    imageUrl: "https://images.unsplash.com/photo-1704747081666-f4fd33d5db5c?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Pneumatic Valve System",
    category: "industrial",
    description: "Precision control valve for automated industrial processes",
    weight: "25 kg",
    imageUrl: "https://images.unsplash.com/photo-1699791912584-6612e5b4a137?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Air Filtration System",
    category: "industrial",
    description: "High efficiency particulate air filtration for clean environments",
    weight: "75 kg",
    imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Industrial Scales",
    category: "industrial",
    description: "Heavy duty platform scales for accurate weight measurement",
    weight: "120 kg",
    imageUrl: "https://images.unsplash.com/photo-1559724087-a45f6a7a35d7?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Pump Control System",
    category: "industrial",
    description: "Automated pump control with variable frequency drive",
    weight: "45 kg",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Industrial Fans",
    category: "industrial",
    description: "High volume industrial exhaust fans for ventilation systems",
    weight: "85 kg",
    imageUrl: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Motor Drive Units",
    category: "industrial",
    description: "Variable frequency drives for motor speed control",
    weight: "18 kg",
    imageUrl: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
      // Machinery
      {
    name: "Hydraulic Press",
    category: "machinery",
    description: "High pressure hydraulic press for metal forming operations",
    weight: "1200 kg",
    imageUrl: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Conveyor Belt System",
    category: "machinery",
    description: "Modular conveyor system for material handling and transportation",
    weight: "320 kg",
    imageUrl: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "CNC Milling Machine",
    category: "machinery",
    description: "Precision computer-controlled milling machine for accurate machining",
    weight: "2100 kg",
    imageUrl: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=300"
  },
      { name: "Robotic Assembly Arm", category: "machinery", description: "6-axis robotic arm for automated assembly and handling tasks", weight: "180 kg", imageUrl: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100" },
      { name: "Industrial Lathe", category: "machinery", description: "Heavy duty turning lathe for precision metalworking operations", weight: "1800 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Packaging Machine", category: "machinery", description: "Automated packaging system for high-volume production lines", weight: "650 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Welding Station", category: "machinery", description: "Professional welding workstation with fume extraction system", weight: "280 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Grinding Machine", category: "machinery", description: "Precision surface grinding machine for finishing operations", weight: "950 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Press Brake", category: "machinery", description: "Hydraulic press brake for sheet metal bending operations", weight: "1650 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Injection Molding Machine", category: "machinery", description: "Plastic injection molding machine for production manufacturing", weight: "3200 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Hoisting Equipment", category: "machinery", description: "Electric chain hoist for heavy lifting applications", weight: "45 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Drill Press", category: "machinery", description: "Heavy duty floor standing drill press for precision drilling", weight: "185 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      
      // Tools
      { name: "Precision Measuring Tools", category: "tools", description: "Professional grade calipers and measuring instruments set", weight: "5 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Impact Wrench Set", category: "tools", description: "High torque pneumatic impact wrench with socket set", weight: "12 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Diamond Cutting Blades", category: "tools", description: "Industrial diamond cutting blades for concrete and masonry", weight: "3 kg", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Safety Equipment Kit", category: "tools", description: "Complete safety kit with helmets, gloves, and protective gear", weight: "8 kg", imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Tool Storage Cabinet", category: "tools", description: "Heavy duty steel tool cabinet with multiple drawers", weight: "95 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Cutting Tool Set", category: "tools", description: "Carbide cutting tools for machining various materials", weight: "7 kg", imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Hydraulic Jack", category: "tools", description: "Heavy duty hydraulic floor jack for lifting applications", weight: "35 kg", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
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
    };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }
}

export const storage = new MemStorage();
