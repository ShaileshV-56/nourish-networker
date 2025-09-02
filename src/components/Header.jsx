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
    <header className="bg-gradient-primary shadow-soft sticky top-0 z-50 backdrop-blur-sm">
      <div className="container header-spacing">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">FoodLink</h1>
              <p className="text-white/80 text-xs">Fighting Hunger Together</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-smooth"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-smooth"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="secondary" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/donate">
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Donate Food
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-white/90 hover:text-white transition-smooth py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 text-white/90 hover:text-white transition-smooth py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 w-full"
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