import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, MapPin, Users, TrendingUp } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "#dashboard", icon: TrendingUp },
    { name: "Find Donors", href: "/find-donors", icon: MapPin },
    { name: "Community", href: "#community", icon: Users },
  ];

  return (
    <header className="bg-gradient-header shadow-large sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="container header-spacing">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-medium">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">FoodLink</h1>
              <p className="text-white/90 text-sm font-medium tracking-wide">Fighting Hunger Together</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-smooth font-semibold text-lg hover:scale-105"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-smooth font-semibold text-lg hover:scale-105"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/auth">
              <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold px-6 py-3 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link to="/donate">
              <Button className="bg-white text-primary hover:bg-white/90 font-bold px-6 py-3 rounded-xl shadow-medium transition-all duration-300 hover:scale-105 hover:shadow-large">
                Donate Food
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/20 mt-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-white/90 hover:text-white transition-smooth py-3 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-3 text-white/90 hover:text-white transition-smooth py-3 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              <div className="flex flex-col space-y-3 pt-6 border-t border-white/20">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 w-full font-medium"
                  >
                    Donate Food
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;