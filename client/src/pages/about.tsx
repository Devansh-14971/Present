import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-8 mt-20">
      <div className="container mx-auto px-4">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About ABC Company</h1>
            <p className="text-xl text-gray-600 mb-6">
              With over 15 years of experience in the industry, ABC Company has established itself as a leading provider of high-quality industrial products and solutions.
            </p>
            <p className="text-gray-600 mb-8">
              Our commitment to excellence, innovation, and customer satisfaction has made us the preferred choice for businesses across various sectors. We pride ourselves on delivering products that meet the highest standards of quality and reliability.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="flex items-center font-semibold mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Quality Assurance
                </h5>
                <p className="text-gray-600">
                  Rigorous testing and quality control processes ensure every product meets our high standards.
                </p>
              </div>
              <div>
                <h5 className="flex items-center font-semibold mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Expert Team
                </h5>
                <p className="text-gray-600">
                  Our experienced professionals provide technical expertise and exceptional customer service.
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="ABC Company office environment"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
              <p className="text-gray-600">
                To provide innovative, high-quality products that empower businesses to achieve their goals and drive industry advancement.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Eye className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-4">Our Vision</h4>
              <p className="text-gray-600">
                To be the global leader in industrial solutions, recognized for excellence, innovation, and unwavering commitment to customer success.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Heart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-4">Our Values</h4>
              <p className="text-gray-600">
                Integrity, innovation, quality, and customer-centricity are the core values that guide everything we do.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leadership Team Section */}
        <section className="py-16 bg-gray-50 rounded-lg">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 relative">
                Our Leadership Team
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-orange-500"></div>
              </h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                    alt="CEO Robert Wilson"
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h5 className="text-xl font-semibold">Robert Wilson</h5>
                  <p className="text-gray-500 mb-3">CEO & Founder</p>
                  <p className="text-gray-600">
                    Over 20 years of industry experience leading ABC Company to new heights of success.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                    alt="CTO Emily Chen"
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h5 className="text-xl font-semibold">Emily Chen</h5>
                  <p className="text-gray-500 mb-3">Chief Technology Officer</p>
                  <p className="text-gray-600">
                    Technology innovator with expertise in developing cutting-edge industrial solutions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                    alt="COO David Martinez"
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h5 className="text-xl font-semibold">David Martinez</h5>
                  <p className="text-gray-500 mb-3">Chief Operations Officer</p>
                  <p className="text-gray-600">
                    Operations expert focused on efficiency, quality control, and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
