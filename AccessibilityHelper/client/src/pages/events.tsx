import Navigation from "@/components/navigation";
import EventCard from "@/components/event-card";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";
import { useState } from "react";

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<string>("alle");
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', activeCategory === "alle" ? "" : activeCategory],
  });

  const categories = [
    { id: "alle", name: "Alle" },
    { id: "kultur", name: "Kultur" },
    { id: "sport", name: "Sport" },
    { id: "gastronomie", name: "Gastronomie" },
    { id: "bildung", name: "Bildung" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-deep-navy mb-4">Events & Aktivitäten</h1>
            <p className="text-xl text-gray-600">Entdecke spannende Events und Aktivitäten in deiner Stadt</p>
          </div>

          {/* Event Categories Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg ${
                  activeCategory === category.id
                    ? "gradient-emerald-blue text-white"
                    : "glassmorphism text-gray-700 hover:bg-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
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
            ) : events && events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {activeCategory === "alle" 
                    ? "Keine Events verfügbar."
                    : `Keine Events in der Kategorie "${categories.find(c => c.id === activeCategory)?.name}" gefunden.`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
