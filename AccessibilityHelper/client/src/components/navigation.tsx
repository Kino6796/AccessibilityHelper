import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./logo";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Startseite" },
    { href: "/kategorien", label: "Unternehmen" },
    { href: "/events", label: "Entdecken" },
    { href: "/kalender", label: "Kalender" },
  ];

  return (
    <nav className="glassmorphism fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Logo size="md" className="rounded-lg" />
            <span className="text-xl font-bold text-deep-navy tracking-tight">BookAble</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`transition-colors ${
                    location === item.href
                      ? "text-emerald-custom font-medium"
                      : "text-gray-700 hover:text-emerald-custom"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <button className="text-gray-700 hover:text-emerald-custom transition-colors px-3 py-2">
              Anmelden
            </button>
            <button className="gradient-emerald-blue text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200">
              Registrieren
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      location === item.href
                        ? "text-emerald-custom bg-emerald-custom/10 font-medium"
                        : "text-gray-700 hover:text-emerald-custom hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50 space-y-2">
              <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-custom">
                Anmelden
              </button>
              <button className="block w-full gradient-emerald-blue text-white px-3 py-2 rounded-xl">
                Registrieren
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
