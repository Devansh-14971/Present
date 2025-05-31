import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=60"
              alt="ABC Company Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">ABC Company</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`font-medium transition-colors hover:text-blue-600 cursor-pointer ${
                    isActive(item.href) ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => window.location.href = 'tel:+919205258281'}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`text-lg font-medium transition-colors hover:text-blue-600 cursor-pointer ${
                        isActive(item.href) ? "text-blue-600" : "text-gray-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Button
                  className="bg-orange-500 hover:bg-orange-600 w-full"
                  onClick={() => {
                    window.location.href = 'tel:+919205258281';
                    setIsOpen(false);
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
