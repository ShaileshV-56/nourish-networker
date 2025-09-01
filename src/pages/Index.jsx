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
      <section className="section-padding bg-muted/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Informed & Inspired
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real-time updates, inspiring stories, and practical resources to support your food donation journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-spacing">
            <div className="order-1 lg:order-1">
              <WeatherWidget />
            </div>
            <div className="order-2 lg:order-2">
              <QuotesWidget />
            </div>
            <div className="order-3 lg:order-3">
              <RecipeSuggestions />
            </div>
            <div className="order-4 lg:order-4">
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