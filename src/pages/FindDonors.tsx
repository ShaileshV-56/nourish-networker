import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, MapPin, Clock, Package, Search, Filter } from "lucide-react";

const FindDonors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock donor data
  const donors = [
    {
      id: 1,
      name: "Green Valley Restaurant",
      type: "Restaurant",
      location: "Downtown District",
      distance: "0.5 km",
      rating: 4.8,
      totalDonations: 156,
      lastDonation: "2 hours ago",
      availableNow: true,
      categories: ["Prepared Meals", "Fresh Vegetables"]
    },
    {
      id: 2,
      name: "Metro Grocery Store",
      type: "Grocery Store",
      location: "North Plaza",
      distance: "1.2 km",
      rating: 4.6,
      totalDonations: 89,
      lastDonation: "1 day ago",
      availableNow: false,
      categories: ["Bakery Items", "Dairy Products"]
    },
    {
      id: 3,
      name: "Fresh Market Co.",
      type: "Market",
      location: "East Side Market",
      distance: "2.1 km",
      rating: 4.9,
      totalDonations: 234,
      lastDonation: "4 hours ago",
      availableNow: true,
      categories: ["Fruits", "Vegetables", "Organic Produce"]
    },
    {
      id: 4,
      name: "Campus Cafeteria",
      type: "Educational Institution",
      location: "University District",
      distance: "0.8 km",
      rating: 4.7,
      totalDonations: 112,
      lastDonation: "6 hours ago",
      availableNow: true,
      categories: ["Prepared Meals", "Beverages"]
    }
  ];

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/90 hover:text-white transition-smooth"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-white" />
            <span className="text-white font-semibold">FoodLink</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Food Donors
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Discover local restaurants, stores, and organizations ready to share their surplus food
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-white/95 backdrop-blur-sm shadow-large">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, location, or food type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/95 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-primary">{filteredDonors.length}</div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-success">
                {filteredDonors.filter(d => d.availableNow).length}
              </div>
              <div className="text-sm text-muted-foreground">Available Now</div>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-warning">591</div>
              <div className="text-sm text-muted-foreground">Total Donations</div>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-info">2.3km</div>
              <div className="text-sm text-muted-foreground">Avg Distance</div>
            </Card>
          </div>
        </div>

        {/* Donors List */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {filteredDonors.map((donor) => (
              <Card key={donor.id} className="bg-white/95 backdrop-blur-sm shadow-large hover:shadow-green transition-smooth">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{donor.name}</h3>
                        <Badge variant="secondary">{donor.type}</Badge>
                        {donor.availableNow && (
                          <Badge className="bg-success text-white">
                            Available Now
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{donor.location} • {donor.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{donor.totalDonations} total donations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Last donation: {donor.lastDonation}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {donor.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(donor.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {donor.rating} rating
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button className="w-full">
                        Connect with Donor
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <Card className="bg-white/95 backdrop-blur-sm text-center p-8">
              <div className="text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No donors found</h3>
                <p>Try adjusting your search criteria or check back later for new donations.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDonors;