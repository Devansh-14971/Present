import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
              <Badge variant="outline" className="capitalize mb-4">
                {product.category}
              </Badge>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-3">Specifications</h5>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span className="capitalize">{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Weight:</span>
                  <span>{product.weight}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Availability:</span>
                  <span className="text-green-600">In Stock</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Warranty:</span>
                  <span>2 Years</span>
                </li>
              </ul>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Contact us for detailed specifications and custom pricing.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onClose}>
              Request Quote
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
