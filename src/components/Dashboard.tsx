import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, AlertCircle, CheckCircle, Truck } from "lucide-react";

const Dashboard = () => {
  // Mock data for active donations
  const activeDonations = [
    {
      id: 1,
      donor: "Green Valley Restaurant",
      foodType: "Fresh Vegetables & Cooked Meals",
      quantity: "50 servings",
      location: "Downtown District",
      expiryTime: "2 hours",
      status: "available",
      urgency: "high"
    },
    {
      id: 2,
      donor: "Metro Grocery Store",
      foodType: "Bakery Items & Dairy",
      quantity: "30 items",
      location: "North Plaza",
      expiryTime: "4 hours",
      status: "pending",
      urgency: "medium"
    },
    {
      id: 3,
      donor: "Fresh Market Co.",
      foodType: "Fruits & Vegetables",
      quantity: "75 kg",
      location: "East Side Market",
      expiryTime: "6 hours",
      status: "in-transit",
      urgency: "low"
    },
    {
      id: 4,
      donor: "Campus Cafeteria",
      foodType: "Prepared Meals",
      quantity: "40 servings",
      location: "University District",
      expiryTime: "1 hour",
      status: "available",
      urgency: "high"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <Package className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in-transit":
        return <Truck className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success text-white";
      case "pending":
        return "bg-warning text-black";
      case "in-transit":
        return "bg-info text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-l-destructive";
      case "medium":
        return "border-l-warning";
      default:
        return "border-l-success";
    }
  };

  return (
    <section id="dashboard" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real-Time Food Donation Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track available donations, monitor expiry times, and coordinate efficient distribution
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">24</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Meals Saved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">182</div>
              <p className="text-xs text-muted-foreground">Across 15 locations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">8</div>
              <p className="text-xs text-muted-foreground">Currently delivering</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Partner Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">12</div>
              <p className="text-xs text-muted-foreground">Ready to receive</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Donations List */}
        <Card className="shadow-large">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Active Food Donations
            </CardTitle>
            <CardDescription>
              Real-time listings of available food donations sorted by urgency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDonations.map((donation) => (
                <div
                  key={donation.id}
                  className={`p-4 border rounded-lg border-l-4 ${getUrgencyColor(donation.urgency)} bg-white hover:shadow-soft transition-smooth`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{donation.donor}</h3>
                        <Badge className={`${getStatusColor(donation.status)} flex items-center gap-1`}>
                          {getStatusIcon(donation.status)}
                          {donation.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{donation.foodType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{donation.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Expires in {donation.expiryTime}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <span className="font-medium">{donation.quantity}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {donation.status === "available" && (
                        <>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">
                            Claim Donation
                          </Button>
                        </>
                      )}
                      {donation.status === "pending" && (
                        <Button size="sm" variant="secondary">
                          Track Status
                        </Button>
                      )}
                      {donation.status === "in-transit" && (
                        <Button size="sm" variant="outline">
                          Track Delivery
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" size="lg">
                View All Donations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;