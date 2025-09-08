import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft, Package, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const [formData, setFormData] = useState({
    organization: "",
    contactPerson: "",
    phone: "",
    email: "",
    foodType: "",
    quantity: "",
    location: "",
    description: "",
    availableUntil: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('food_donations')
        .insert([
          {
            organization: formData.organization,
            contact_person: formData.contactPerson,
            phone: formData.phone,
            food_type: formData.foodType,
            quantity: formData.quantity,
            location: formData.location,
            description: formData.description,
            available_until: formData.availableUntil,
            email: formData.email,
            status: 'available'
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your food donation has been registered successfully.",
      });

      // Reset form
      setFormData({
        organization: "",
        contactPerson: "",
        phone: "",
        email: "",
        foodType: "",
        quantity: "",
        location: "",
        description: "",
        availableUntil: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register donation. Please try again.",
        variant: "destructive",
      });
      console.error('Error submitting donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            <span className="text-white font-semibold">HopeHUB</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-large">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">Donate Food</CardTitle>
              <CardDescription>
                Help reduce food waste and feed those in need by registering your food donation
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization/Restaurant Name</Label>
                    <Input
                      id="organization"
                      placeholder="Enter your organization name"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="Your name"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foodType">Food Type</Label>
                    <Select onValueChange={(value) => handleInputChange("foodType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select food type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prepared-meals">Prepared Meals</SelectItem>
                        <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                        <SelectItem value="bakery-items">Bakery Items</SelectItem>
                        <SelectItem value="dairy-products">Dairy Products</SelectItem>
                        <SelectItem value="canned-goods">Canned Goods</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity/Servings</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 50 servings, 10kg"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location</Label>
                    <Input
                      id="location"
                      placeholder="Address or area"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="availableUntil">Available Until</Label>
                    <Input
                      id="availableUntil"
                      type="datetime-local"
                      value={formData.availableUntil}
                      onChange={(e) => handleInputChange("availableUntil", e.target.value)}
                      required
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Any special instructions or additional information about the food donation"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register Food Donation"}
                </Button>
              </form>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex justify-center mb-2">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-sm font-medium">180</div>
                    <div className="text-xs text-muted-foreground">Meals Saved Today</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <MapPin className="h-5 w-5 text-success" />
                    </div>
                    <div className="text-sm font-medium">24</div>
                    <div className="text-xs text-muted-foreground">Active Locations</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                    <div className="text-sm font-medium">2.5 hrs</div>
                    <div className="text-xs text-muted-foreground">Avg Response Time</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;