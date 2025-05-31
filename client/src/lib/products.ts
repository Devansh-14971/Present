import type { Product } from "@shared/schema";

export const productCategories = [
  { value: "all", label: "All Products" },
  { value: "industrial", label: "Industrial Equipment" },
  { value: "machinery", label: "Machinery" },
  { value: "tools", label: "Tools & Accessories" },
] as const;

export type ProductCategory = typeof productCategories[number]["value"];

export function filterProducts(products: Product[], searchTerm: string, category: ProductCategory): Product[] {
  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });
}

export function getFeaturedProducts(products: Product[], count: number = 6): Product[] {
  return products.slice(0, count);
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
}
