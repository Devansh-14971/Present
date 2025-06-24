import { db, initializeDatabase } from "./db";
import { products } from "@shared/schema";

const sampleProducts = [
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
  { name: "Professional Tool Set", category: "tools", description: "Comprehensive tool kit for industrial maintenance and repair", weight: "15 kg", imageUrl: "https://images.unsplash.com/photo-1572981779307-38b7917bb9a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
  { name: "Precision Measuring Tools", category: "tools", description: "High precision calipers, micrometers, and measuring instruments", weight: "3 kg", imageUrl: "https://images.unsplash.com/photo-1581092918484-8313de2c9473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
  { name: "Heavy Duty Wrench Set", category: "tools", description: "Industrial grade wrench set for heavy machinery maintenance", weight: "8 kg", imageUrl: "https://images.unsplash.com/photo-1572981779307-38b7917bb9a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
  { name: "Diamond Cutting Discs", category: "tools", description: "Professional diamond cutting discs for various materials", weight: "2 kg", imageUrl: "https://images.unsplash.com/photo-1581092918484-8313de2c9473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
  { name: "Torque Wrench Set", category: "tools", description: "Precision torque wrenches for accurate bolt tightening", weight: "5 kg", imageUrl: "https://images.unsplash.com/photo-1572981779307-38b7917bb9a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
  { name: "Safety Equipment Kit", category: "tools", description: "Complete safety equipment for industrial work environments", weight: "12 kg", imageUrl: "https://images.unsplash.com/photo-1581092918484-8313de2c9473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
  { name: "Electrical Testing Tools", category: "tools", description: "Professional electrical testing and measurement tools", weight: "6 kg", imageUrl: "https://images.unsplash.com/photo-1572981779307-38b7917bb9a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
  { name: "Hydraulic Lifting Tools", category: "tools", description: "Portable hydraulic lifting and spreading tools", weight: "25 kg", imageUrl: "https://images.unsplash.com/photo-1581092918484-8313de2c9473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" }
];

export async function seedDatabase() {
  try {
    // Initialize database first
    initializeDatabase();
    
    console.log("Seeding database with sample products...");
    
    // Check if products already exist
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length === 0) {
      await db.insert(products).values(sampleProducts);
      console.log(`Successfully seeded ${sampleProducts.length} products`);
    } else {
      console.log(`Database already contains ${existingProducts.length} products, skipping seed`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seeding if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedDatabase().then(() => {
    console.log("Seeding completed");
    process.exit(0);
  }).catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
}