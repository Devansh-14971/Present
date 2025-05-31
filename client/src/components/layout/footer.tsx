import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Quote, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=60"
                alt="ABC Company Logo"
                className="h-10 w-auto"
              />
              <h5 className="text-xl font-bold">ABC Company</h5>
            </div>
            <p className="text-gray-300 mb-4">
              Leading provider of high-quality industrial products and solutions. We deliver excellence through innovation, quality, and exceptional customer service.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="bg-transparent border-gray-600 hover:bg-gray-700">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-600 hover:bg-gray-700">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-600 hover:bg-gray-700">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-600 hover:bg-gray-700">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-white transition-colors">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Product Categories</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-white transition-colors">Industrial Equipment</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-white transition-colors">Heavy Machinery</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-white transition-colors">Tools & Accessories</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-white transition-colors">Safety Equipment</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-white transition-colors">Custom Solutions</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Info</h5>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div className="text-gray-300">
                  123 Industrial Boulevard<br />
                  Business District, NY 10001
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:info@abccompany.com" className="text-gray-300 hover:text-white transition-colors">
                  info@abccompany.com
                </a>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/contact">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <Quote className="mr-2 h-4 w-4" />
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; 2024 ABC Company. All rights reserved.
          </p>
          <p className="text-gray-400">
            Designed for excellence in industrial solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
