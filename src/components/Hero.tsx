import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-food-donation.jpg";

const Hero = () => {
  const stats = [
    { icon: Users, value: "50+", label: "Active Donors" },
    { icon: MapPin, value: "25+", label: "Locations" },
    { icon: Clock, value: "24/7", label: "Support" },
    { icon: TrendingUp, value: "1000+", label: "Meals Saved" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Food donation community" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
              UN Sustainable Development Goal 2: Zero Hunger
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connect Food
              <span className="block text-secondary">to Those in Need</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Bridge the gap between food surplus and hunger. Our platform connects restaurants, 
              grocery stores, and food producers with NGOs and communities fighting food insecurity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Donating Food
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Find Food Near Me
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Action Cards */}
          <div className="animate-slide-up animation-delay-200">
            <div className="grid gap-6">
              <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-large hover:shadow-green transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">For Donors</h3>
                    <p className="text-muted-foreground">Restaurants, stores, producers</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Turn your surplus food into hope. Connect with local organizations 
                  and make a direct impact in your community.
                </p>
                <Button className="w-full mt-4" variant="outline">
                  Register as Donor
                </Button>
              </Card>

              <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-large hover:shadow-green transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">For NGOs & Food Banks</h3>
                    <p className="text-muted-foreground">Organizations serving communities</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Access real-time donations in your area. Streamline your food 
                  collection and distribution processes.
                </p>
                <Button className="w-full mt-4" variant="outline">
                  Register Organization
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;