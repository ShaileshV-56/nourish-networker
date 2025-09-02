import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "How It Works", href: "/about" },
        { name: "For Donors", href: "/donate" },
        { name: "For NGOs", href: "/contact" },
        { name: "Volunteer", href: "/auth" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Impact Reports", href: "#" },
        { name: "Best Practices", href: "#" },
        { name: "Food Safety Guidelines", href: "#" },
        { name: "API Documentation", href: "#" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/contact" },
        { name: "Contact Us", href: "/contact" },
        { name: "Community Forum", href: "/about" },
        { name: "Training Resources", href: "/about" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Mission & Vision", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-header text-white">
      <div className="container">
        {/* Main Footer Content */}
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 grid-spacing">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">FoodLink</h1>
                  <p className="text-white/80 text-sm font-medium">Fighting Hunger Together</p>
                </div>
              </div>
              
              <p className="text-white/90 mb-8 leading-relaxed text-large">
                Connecting food donors with those in need through our smart donation platform. 
                Together, we're working towards UN SDG 2: Zero Hunger.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-white/90">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">hello@foodlink.org</span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Global Operations</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center hover:bg-white/25 transition-smooth backdrop-blur-sm border border-white/20"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h3 className="text-lg font-bold mb-6 text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith('#') ? (
                        <a
                          href={link.href}
                          className="text-white/80 hover:text-white transition-smooth font-medium"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-white/80 hover:text-white transition-smooth font-medium"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-white/80 font-medium">
              © {currentYear} FoodLink. All rights reserved. Built with 💚 for a hunger-free world.
            </div>
            
            <div className="flex items-center space-x-8 text-white/80">
              <Link to="/privacy" className="hover:text-white transition-smooth font-medium">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-smooth font-medium">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-white transition-smooth font-medium">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* UN SDG Badge */}
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full text-white/95 font-medium border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              Supporting UN Sustainable Development Goal 2: Zero Hunger
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;