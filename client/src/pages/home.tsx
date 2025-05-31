import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Award, Truck, Headphones, Star, Eye, RectangleEllipsis } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 6) || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Professional Solutions for Your Business Needs
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                ABC Company delivers high-quality industrial products and services that drive your business forward. Get your custom quote today and experience excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Eye className="mr-2 h-5 w-5" />
                    View Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    <RectangleEllipsis className="mr-2 h-5 w-5" />
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional business handshake"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 relative">
              Why Choose ABC Company?
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-orange-500"></div>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-6">
                <Award className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-semibold mb-4">Premium Quality</h4>
                <p className="text-gray-600">
                  All our products meet the highest industry standards and undergo rigorous quality testing.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-6">
                <Truck className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-semibold mb-4">Fast Delivery</h4>
                <p className="text-gray-600">
                  Quick turnaround times and reliable shipping to get your products when you need them.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-6">
                <Headphones className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h4 className="text-xl font-semibold mb-4">Expert Support</h4>
                <p className="text-gray-600">
                  Our knowledgeable team provides exceptional customer service and technical support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 relative">
              What Our Clients Say
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-orange-500"></div>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mb-6 text-gray-600">
                  "Exceptional service and quality products. ABC Company has been our trusted partner for over 5 years. Their attention to detail and customer service is unmatched in the industry."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="John Smith"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h6 className="font-semibold">John Smith</h6>
                    <p className="text-sm text-gray-500">CEO, TechCorp Industries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mb-6 text-gray-600">
                  "Outstanding product range and competitive pricing. The team at ABC Company consistently delivers on time and exceeds expectations. Highly recommend their services."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h6 className="font-semibold">Sarah Johnson</h6>
                    <p className="text-sm text-gray-500">Operations Manager, Global Manufacturing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mb-6 text-gray-600">
                  "Professional, reliable, and innovative solutions. ABC Company helped streamline our operations with their cutting-edge products. Their expertise is truly valuable."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                    alt="Michael Davis"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h6 className="font-semibold">Michael Davis</h6>
                    <p className="text-sm text-gray-500">Director, Precision Engineering Ltd</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 relative">
              Featured Products
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-orange-500"></div>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-lg">{product.name}</h5>
                    <Badge variant="secondary" className="capitalize">
                      {product.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Weight: {product.weight}</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
