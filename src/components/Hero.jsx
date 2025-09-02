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
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="animate-slide-up text-center lg:text-left">
            <div className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full text-white/95 text-sm font-medium mb-8 border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              UN Sustainable Development Goal 2: Zero Hunger
            </div>
            
            <h1 className="heading-primary text-white mb-8">
              Connect Food
              <span className="block text-warning">to Those in Need</span>
            </h1>
            
            <p className="text-large text-white/95 mb-10 max-w-xl lg:max-w-none">
              Bridge the gap between food surplus and hunger. Our platform connects restaurants, 
              grocery stores, and food producers with NGOs and communities fighting food insecurity.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16 justify-center lg:justify-start">
              <Link to="/donate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold shadow-large">
                  Start Donating Food
                </Button>
              </Link>
              <Link to="/find-donors">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  Find Food Near Me
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center lg:justify-start">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4 border border-white/20">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Action Cards */}
          <div className="animate-slide-up animation-delay-200">
            <div className="grid gap-8">
              <Card className="card-padding bg-white/95 backdrop-blur-lg shadow-large hover:shadow-green transition-smooth transform hover:scale-105 border-0">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medium">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground">For Donors</h3>
                    <p className="text-muted-foreground font-medium">Restaurants, stores, producers</p>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Turn your surplus food into hope. Connect with local organizations 
                  and make a direct impact in your community.
                </p>
                <Link to="/donate">
                  <Button className="w-full mt-8 font-semibold" size="lg">
                    Register as Donor
                  </Button>
                </Link>
              </Card>

              <Card className="card-padding bg-white/95 backdrop-blur-lg shadow-large hover:shadow-green transition-smooth transform hover:scale-105 border-0">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center shadow-medium">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground">For NGOs & Food Banks</h3>
                    <p className="text-muted-foreground font-medium">Organizations serving communities</p>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Access real-time donations in your area. Streamline your food 
                  collection and distribution processes.
                </p>
                <Link to="/find-donors">
                  <Button className="w-full mt-8 font-semibold" variant="outline" size="lg">
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