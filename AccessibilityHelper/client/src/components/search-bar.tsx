import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to categories page with search query
      window.location.href = `/kategorien?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="glassmorphism rounded-3xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Was suchst du?
              </Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Restaurant, Arzt, Friseur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-emerald-custom/20 focus:border-emerald-custom"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <div className="md:w-64">
              <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Wo?
              </Label>
              <div className="relative">
                <Input
                  id="location"
                  type="text"
                  placeholder="Stadt oder PLZ"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-emerald-custom/20 focus:border-emerald-custom"
                />
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <div className="md:w-32">
              <Label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Wann?
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-gray-200 focus:ring-emerald-custom/20 focus:border-emerald-custom"
                />
              </div>
            </div>
            
            <div className="md:w-32 flex items-end">
              <button
                onClick={handleSearch}
                className="w-full gradient-emerald-blue text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Suchen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
