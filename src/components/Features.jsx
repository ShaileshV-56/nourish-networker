import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users, TrendingUp, Bell, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Location Matching",
      description: "AI-powered system connects nearby donors with organizations, optimizing logistics and reducing waste.",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Real-Time Expiry Tracking",
      description: "Monitor food freshness with automated alerts and priority queuing based on expiration times.",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect restaurants, grocery stores, NGOs, food banks, and volunteers in one unified platform.",
      color: "text-info"
    },
    {
      icon: TrendingUp,
      title: "Impact Analytics",
      description: "Track your contribution with detailed reports on meals saved, people fed, and environmental impact.",
      color: "text-primary"
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get real-time alerts for new donations, pickup schedules, and urgent food distribution needs.",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Verified Organizations",
      description: "All registered NGOs and food banks are verified to ensure food reaches legitimate beneficiaries.",
      color: "text-destructive"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for Maximum Impact
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our platform leverages cutting-edge technology to streamline food donation processes, 
            reduce waste, and ensure efficient distribution to those who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-spacing">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card shadow-soft hover:shadow-green transition-smooth group animate-slide-up transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-lg bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 lg:p-16 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h3>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of donors and organizations already using FoodLink to fight hunger 
              and reduce food waste in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/donate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold">
                  Start Donating Today
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;