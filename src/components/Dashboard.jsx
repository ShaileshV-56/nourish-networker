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
    <section id="dashboard" className="section-padding bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-6">
            Real-Time Food Donation Dashboard
          </h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto">
            Track available donations, monitor expiry times, and coordinate efficient distribution
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Available Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">{stats.availableDonations}</div>
              <p className="text-sm text-muted-foreground font-medium">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Meals Saved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">{stats.mealsSaved}</div>
              <p className="text-sm text-muted-foreground font-medium">Total visits: {stats.totalVisits}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Active Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-info mb-2">{stats.activeVolunteers}</div>
              <p className="text-sm text-muted-foreground font-medium">Unique visitors: {stats.uniqueVisitors}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Partner Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning mb-2">{stats.partnerOrgs}</div>
              <p className="text-sm text-muted-foreground font-medium">Ready to receive</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Donations List */}
        <Card className="shadow-large border-0 bg-gradient-card">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <AlertCircle className="h-6 w-6 text-warning" />
              Active Food Donations
            </CardTitle>
            <CardDescription className="text-base">
              Real-time listings of available food donations sorted by urgency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeDonations.map((donation) => (
                <div
                  key={donation.id}
                  className={`p-6 border rounded-2xl border-l-4 ${getUrgencyColor(donation.urgency)} bg-white hover:shadow-soft transition-smooth`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="font-bold text-xl">{donation.donor}</h3>
                        <Badge className={`${getStatusColor(donation.status)} flex items-center gap-2 font-medium`}>
                          {getStatusIcon(donation.status)}
                          {donation.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5" />
                          <span className="font-medium">{donation.foodType}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5" />
                          <span className="font-medium">{donation.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5" />
                          <span className="font-medium">Expires in {donation.expiryTime}</span>
                        </div>
                      </div>
                      
                      <div className="font-semibold text-lg">{donation.quantity}</div>
                    </div>

                    <div className="flex gap-3">
                      {donation.status === "available" && (
                        <>
                          <Button size="sm" variant="outline" className="font-medium">
                            View Details
                          </Button>
                          <Button size="sm" className="font-medium">
                            Claim Donation
                          </Button>
                        </>
                      )}
                      {donation.status === "pending" && (
                        <Button size="sm" variant="secondary" className="font-medium">
                          Track Status
                        </Button>
                      )}
                      {donation.status === "in-transit" && (
                        <Button size="sm" variant="outline" className="font-medium">
                          Track Delivery
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline" size="lg" className="font-semibold">
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