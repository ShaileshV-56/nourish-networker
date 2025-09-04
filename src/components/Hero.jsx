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
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/60 rounded-full animate-pulse animation-delay-100 glow-primary"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary/60 rounded-full animate-pulse animation-delay-200 glow-purple"></div>
        <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-accent/60 rounded-full animate-pulse animation-delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse animation-delay-400 glow-primary"></div>
      </div>

      {/* Content */}
      <div className="relative container section-padding">
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-24 items-center">
          {/* Left Column - Hero Content */}
          <div className="animate-slide-up text-center lg:text-left space-y-12">
            <div className="inline-flex items-center px-8 py-5 bg-gradient-card backdrop-blur-xl rounded-full text-foreground text-lg font-bold mb-8 border-2 border-primary/30 shadow-primary glow-primary">
              <span className="w-4 h-4 bg-gradient-primary rounded-full mr-4 animate-pulse"></span>
              UN Sustainable Development Goal 2: Zero Hunger
            </div>
            
            <h1 className="heading-hero mb-12">
              Connect Food
              <span className="block bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                to Those in Need
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-3xl lg:max-w-none leading-relaxed font-semibold">
              Bridge the gap between food surplus and hunger. Our platform connects restaurants, 
              grocery stores, and food producers with NGOs and communities fighting food insecurity.
            </p>

            <div className="flex flex-col sm:flex-row gap-10 mb-20 justify-center lg:justify-start">
              <Link to="/donate">
                <div className="button-primary text-2xl">
                  Start Donating Food
                </div>
              </Link>
              <Link to="/find-donors">
                <div className="button-secondary text-2xl">
                  Find Food Near Me
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-center lg:justify-start">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left group">
                  <div className="w-24 h-24 bg-gradient-card backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 border-2 border-primary/30 shadow-primary group-hover:scale-125 transition-all duration-500 group-hover:shadow-glow glow-primary">
                    <stat.icon className="h-12 w-12 text-primary" />
                  </div>
                  <div className="text-5xl font-black text-foreground mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-muted-foreground font-bold text-xl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Quick Action Cards */}
          <div className="animate-slide-up animation-delay-200 space-y-10">
            <div className="glass-card card-padding interactive-card rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-20 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="relative">
                <div className="flex items-center space-x-8 mb-8">
                  <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-primary glow-primary">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-3xl text-foreground mb-3">For Donors</h3>
                    <p className="text-muted-foreground font-bold text-xl">Restaurants, stores, producers</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-xl mb-10 font-medium">
                  Turn your surplus food into hope. Connect with local organizations 
                  and make a direct impact in your community.
                </p>
                <Link to="/donate">
                  <div className="button-primary w-full text-center text-xl">
                    Register as Donor
                  </div>
                </Link>
              </div>
            </div>

            <div className="glass-card card-padding interactive-card rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-feature opacity-20 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="relative">
                <div className="flex items-center space-x-8 mb-8">
                  <div className="w-24 h-24 bg-gradient-feature rounded-3xl flex items-center justify-center shadow-purple glow-purple">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-3xl text-foreground mb-3">For NGOs & Food Banks</h3>
                    <p className="text-muted-foreground font-bold text-xl">Organizations serving communities</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-xl mb-10 font-medium">
                  Access real-time donations in your area. Streamline your food 
                  collection and distribution processes.
                </p>
                <Link to="/find-donors">
                  <div className="button-secondary w-full text-center text-xl">
                    Register Organization
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;