import { Calendar, Search } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-emerald-50/30"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-deep-navy mb-6 leading-tight">
            <span className="block">Termine buchen</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-custom to-ocean-blue">
              ohne Barrieren
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Einfach, schnell und stressfrei Termine vereinbaren – ohne Telefonanrufe. 
            Perfekt für Menschen mit Sprachbarrieren und alle, die Zeit sparen möchten.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/kategorien">
              <button className="group gradient-emerald-blue text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <span className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Termin buchen</span>
                </span>
              </button>
            </Link>
            <Link href="/events">
              <button className="group glassmorphism text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:shadow-lg transition-all duration-300">
                <span className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Events entdecken</span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
