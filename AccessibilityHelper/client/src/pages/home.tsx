import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import SearchBar from "@/components/search-bar";
import CategoryGrid from "@/components/category-grid";
import CalendarView from "@/components/calendar-view";
import EventCard from "@/components/event-card";
import Logo from "@/components/logo";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";

export default function Home() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const featuredEvents = events?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <SearchBar />
      <CategoryGrid />
      
      {/* Sample Calendar View */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deep-navy mb-4">Termine auf einen Blick</h2>
            <p className="text-gray-600 text-lg">Moderne Kalenderansicht mit farbcodierten Verfügbarkeiten</p>
          </div>
          <CalendarView />
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deep-navy mb-6">Entdecken</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Egal ob spontan oder geplant - entdecke spannende Events und Aktivitäten in deiner Umgebung</p>
          </div>

          {/* Event Categories Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button className="gradient-emerald-blue text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg">
              Alle
            </button>
            <button className="glassmorphism text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-white hover:shadow-lg transition-all duration-200">
              Kultur
            </button>
            <button className="glassmorphism text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-white hover:shadow-lg transition-all duration-200">
              Sport
            </button>
            <button className="glassmorphism text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-white hover:shadow-lg transition-all duration-200">
              Gastronomie
            </button>
            <button className="glassmorphism text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-white hover:shadow-lg transition-all duration-200">
              Bildung
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glassmorphism rounded-3xl overflow-hidden">
                  <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Keine Events verfügbar.</p>
              </div>
            )}
          </div>

          {/* View More Events */}
          <div className="text-center mt-12">
            <button className="glassmorphism text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:shadow-lg transition-all duration-300">
              Mehr Events entdecken
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-emerald-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Warum BookAble?</h2>
            <p className="text-blue-100 text-lg">Termine buchen war noch nie so einfach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Keine Telefonanrufe</h3>
              <p className="text-blue-100">Perfekt für Menschen mit Sprachbarrieren, Hörproblemen oder Telefon-Angst</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Verfügbar</h3>
              <p className="text-blue-100">Buchen Sie Termine jederzeit - auch außerhalb der Geschäftszeiten</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Blitzschnell</h3>
              <p className="text-blue-100">Termine in wenigen Klicks buchen - ohne Warteschleifen und Verwirrung</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-deep-navy mb-4">Bereit für stressfreie Termine?</h2>
          <p className="text-xl text-gray-600 mb-8">Probieren Sie BookAble jetzt kostenlos aus und entdecken Sie eine neue Art, Termine zu vereinbaren.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group gradient-emerald-blue text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Jetzt kostenlos starten
            </button>
            <button className="group glassmorphism text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:shadow-lg transition-all duration-300">
              Mehr erfahren
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Logo size="md" className="rounded-lg" />
                <span className="text-xl font-bold tracking-tight">BookAble</span>
              </div>
              <p className="text-blue-200 mb-4">Termine buchen ohne Barrieren - einfach, schnell und für jeden zugänglich.</p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Unternehmen</h4>
              <div className="space-y-2">
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Über uns</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Karriere</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Presse</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Partner</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Hilfe Center</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Kontakt</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Barrierefreiheit</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Status</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <div className="space-y-2">
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Datenschutz</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">AGB</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Impressum</a>
                <a href="#" className="text-blue-200 hover:text-white block transition-colors">Cookies</a>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200">© 2025 BookAble. Alle Rechte vorbehalten.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <select className="bg-blue-800 text-white border border-blue-700 rounded-lg px-3 py-1 text-sm">
                <option>🇩🇪 Deutsch</option>
                <option>🇬🇧 English</option>
                <option>🇪🇸 Español</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
