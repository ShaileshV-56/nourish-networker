import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import WeatherWidget from "@/components/WeatherWidget";
import NewsFeed from "@/components/NewsFeed";
import QuotesWidget from "@/components/QuotesWidget";
import RecipeSuggestions from "@/components/RecipeSuggestions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Dashboard />
      
      {/* API Widgets Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Informed & Inspired
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time updates, inspiring stories, and practical resources to support your food donation journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <WeatherWidget />
            <QuotesWidget />
            <RecipeSuggestions />
            <div className="md:col-span-2 lg:col-span-1">
              <NewsFeed />
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
