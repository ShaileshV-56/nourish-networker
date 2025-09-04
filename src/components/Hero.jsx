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
          alt="Food donation community impacting lives" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse animation-delay-100"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse animation-delay-300"></div>
      </div>

      {/* Content */}
      <div className="relative container section-padding">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Left Column - Hero Content */}
          <div className="animate-slide-up text-center lg:text-left space-y-8">
            <div className="inline-flex items-center px-6 py-4 bg-white/15 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-6 border border-white/30 shadow-medium">
              <span className="w-3 h-3 bg-gradient-to-r from-white to-white/80 rounded-full mr-3 animate-pulse"></span>
              UN Sustainable Development Goal 2: Zero Hunger
            </div>
            
            <h1 className="heading-hero mb-8">
              Connect Food
              <span className="block bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                to Those in Need
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-2xl lg:max-w-none leading-relaxed font-medium">
              Bridge the gap between food surplus and hunger. Our platform connects restaurants, 
              grocery stores, and food producers with NGOs and communities fighting food insecurity.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 mb-16 justify-center lg:justify-start">
              <Link to="/donate">
                <div className="button-primary text-xl">
                  Start Donating Food
                </div>
              </Link>
              <Link to="/find-donors">
                <div className="button-secondary text-xl">
                  Find Food Near Me
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center lg:justify-start">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left group">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 border border-white/30 shadow-medium group-hover:scale-110 transition-all duration-300 group-hover:shadow-glow">
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/90 font-semibold text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Action Cards */}
          <div className="animate-slide-up animation-delay-200 space-y-8">
            <Card className="card-padding bg-white/95 backdrop-blur-xl shadow-large hover:shadow-primary interactive-card border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-primary">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-foreground mb-2">For Donors</h3>
                    <p className="text-muted-foreground font-semibold text-lg">Restaurants, stores, producers</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  Turn your surplus food into hope. Connect with local organizations 
                  and make a direct impact in your community.
                </p>
                <Link to="/donate">
                  <div className="button-primary w-full text-center text-lg">
                    Register as Donor
                  </div>
                </Link>
              </div>
            </Card>

            <Card className="card-padding bg-white/95 backdrop-blur-xl shadow-large hover:shadow-primary interactive-card border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-cool opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-cool rounded-3xl flex items-center justify-center shadow-medium">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-foreground mb-2">For NGOs & Food Banks</h3>
                    <p className="text-muted-foreground font-semibold text-lg">Organizations serving communities</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  Access real-time donations in your area. Streamline your food 
                  collection and distribution processes.
                </p>
                <Link to="/find-donors">
                  <div className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 w-full text-center text-lg">
                    Register Organization
                  </div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;