import { Button } from "@/components/ui/button";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-hero p-2 rounded-lg shadow-soft">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Smart Tourism</h1>
              <p className="text-xs text-muted-foreground">Jharkhand</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-smooth">
              Home
            </a>
            <a href="#heritage" className="text-foreground hover:text-primary transition-smooth">
              Heritage
            </a>
            <a href="#trips" className="text-foreground hover:text-primary transition-smooth">
              Trip Genie
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-smooth">
              Community
            </a>
            <a href="#emergency" className="text-foreground hover:text-primary transition-smooth">
              Emergency
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button variant="heritage">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#home"
                className="block px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#heritage"
                className="block px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Heritage
              </a>
              <a
                href="#trips"
                className="block px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Trip Genie
              </a>
              <a
                href="#community"
                className="block px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </a>
              <a
                href="#emergency"
                className="block px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Emergency
              </a>
              <div className="border-t border-border pt-4 pb-3">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Button>
                  <Button variant="heritage" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;