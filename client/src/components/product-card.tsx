import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
      <div onClick={onClick}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h5 className="font-semibold text-lg line-clamp-1">{product.name}</h5>
            <Badge variant="secondary" className="capitalize shrink-0 ml-2">
              {product.category}
            </Badge>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Weight: {product.weight}</span>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              View Details
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
