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
      <section className="section-padding bg-gradient-section">
        <div className="container">
          <div className="text-center mb-24">
            <div className="inline-block px-8 py-4 bg-gradient-primary rounded-full text-white font-bold text-lg mb-8 shadow-primary glow-primary">
              Real-time Resources
            </div>
            <h2 className="heading-primary mb-10">
              Stay Informed & Inspired
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-semibold">
              Real-time updates and practical resources to support your food donation journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-spacing">
            <WeatherWidget />
            <QuotesWidget />
            <RecipeSuggestions />
            <NewsFeed />
          </div>
        </div>
      </section>
      
      <Features />
      <Footer />
    </div>
  );
};

export default Index;