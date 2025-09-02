import { Link } from "react-router-dom";
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
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Food donation community" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative container section-padding">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="animate-slide-up text-center lg:text-left">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8">
              <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
              UN Sustainable Development Goal 2: Zero Hunger
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Connect Food
              <span className="block text-secondary">to Those in Need</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl lg:max-w-none">
              Bridge the gap between food surplus and hunger. Our platform connects restaurants, 
              grocery stores, and food producers with NGOs and communities fighting food insecurity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Link to="/donate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold">
                  Start Donating Food
                </Button>
              </Link>
              <Link to="/find-donors">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                >
                  Find Food Near Me
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center lg:justify-start">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-3">
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-2xl xl:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Action Cards */}
          <div className="animate-slide-up animation-delay-200">
            <div className="grid gap-6">
              <Card className="card-padding bg-white/95 backdrop-blur-sm shadow-large hover:shadow-green transition-smooth transform hover:scale-105">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">For Donors</h3>
                    <p className="text-muted-foreground">Restaurants, stores, producers</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  Turn your surplus food into hope. Connect with local organizations 
                  and make a direct impact in your community.
                </p>
                <Link to="/donate">
                  <Button className="w-full mt-6" variant="outline">
                    Register as Donor
                  </Button>
                </Link>
              </Card>

              <Card className="card-padding bg-white/95 backdrop-blur-sm shadow-large hover:shadow-green transition-smooth transform hover:scale-105">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-warm rounded-lg flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">For NGOs & Food Banks</h3>
                    <p className="text-muted-foreground">Organizations serving communities</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  Access real-time donations in your area. Streamline your food 
                  collection and distribution processes.
                </p>
                <Link to="/find-donors">
                  <Button className="w-full mt-6" variant="outline">
                    Register Organization
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;