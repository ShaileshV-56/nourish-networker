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
      color: "text-warning"
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
          <h2 className="heading-secondary mb-8">
            Powerful Features for Maximum Impact
          </h2>
          <p className="text-large text-muted-foreground max-w-3xl mx-auto">
            Our platform leverages cutting-edge technology to streamline food donation processes, 
            reduce waste, and ensure efficient distribution to those who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-spacing">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card shadow-soft hover:shadow-green transition-smooth group transform hover:scale-105 border-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-6">
                <div className={`w-16 h-16 rounded-2xl bg-white/50 border border-muted/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 md:p-16 text-white shadow-large">
            <h3 className="heading-secondary mb-8">
              Ready to Make a Difference?
            </h3>
            <p className="text-large text-white/95 mb-12 max-w-2xl mx-auto">
              Join thousands of donors and organizations already using FoodLink to fight hunger 
              and reduce food waste in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/donate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold shadow-large">
                  Start Donating Today
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold backdrop-blur-sm">
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