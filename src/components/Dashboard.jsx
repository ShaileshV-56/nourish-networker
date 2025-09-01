import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, AlertCircle, CheckCircle, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    availableDonations: 0,
    mealsSaved: 0,
    activeVolunteers: 4,
    partnerOrgs: 8
  });
  
  const [activeDonations, setActiveDonations] = useState([]);

  // Fetch analytics data and log user visit
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get user stats
        const { data: userStats } = await supabase
          .from('user_stats')
          .select('*')
          .limit(1)
          .single();

        if (userStats) {
          setStats(prev => ({
            ...prev,
            totalVisits: userStats.total_visits,
            uniqueVisitors: userStats.unique_visitors
          }));
        }

        // Get food donations count
        const { count: donationsCount } = await supabase
          .from('food_donations')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'available');

        if (donationsCount !== null) {
          setStats(prev => ({
            ...prev,
            availableDonations: donationsCount
          }));
        }

        // Fetch active donations
        const { data: donations } = await supabase
          .from('food_donations')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false })
          .limit(10);

        if (donations) {
          const formattedDonations = donations.map(donation => ({
            id: donation.id,
            donor: donation.organization,
            foodType: donation.food_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            quantity: donation.quantity,
            location: donation.location,
            expiryTime: donation.available_until,
            status: donation.status,
            urgency: getUrgencyFromTime(donation.available_until)
          }));
          setActiveDonations(formattedDonations);
        }

        // Log this visit
        const sessionId = Math.random().toString(36).substring(7);
        await supabase
          .from('user_analytics')
          .insert({
            session_id: sessionId,
            page_visited: '/dashboard',
            user_agent: navigator.userAgent
          });

        console.log('Dashboard analytics logged successfully');
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const getUrgencyFromTime = (timeString) => {
    const hours = parseInt(timeString.split('-')[0]);
    if (hours <= 2) return 'high';
    if (hours <= 6) return 'medium';
    return 'low';
  };

  const getStatusIcon = (status) => {
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

  const getStatusColor = (status) => {
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

  const getUrgencyColor = (urgency) => {
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
              <div className="text-2xl font-bold text-success">{stats.availableDonations}</div>
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
              <div className="text-2xl font-bold text-primary">{stats.mealsSaved}</div>
              <p className="text-xs text-muted-foreground">Total visits: {stats.totalVisits}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">{stats.activeVolunteers}</div>
              <p className="text-xs text-muted-foreground">Unique visitors: {stats.uniqueVisitors}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Partner Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.partnerOrgs}</div>
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