import Navigation from "@/components/navigation";
import CategoryGrid from "@/components/category-grid";
import { useQuery } from "@tanstack/react-query";
import type { Company } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Star, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Get URL parameters for initial search
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const category = urlParams.get('category');
    if (search) setSearchQuery(search);
    if (category) setSelectedCategory(category);
  }, []);
  
  const { data: companies, isLoading } = useQuery<Company[]>({
    queryKey: ['/api/companies', selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      
      const response = await fetch(`/api/companies?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch companies');
      return response.json();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-deep-navy mb-4">Unternehmen entdecken</h1>
            <p className="text-xl text-gray-600">Wähle eine Kategorie oder suche direkt nach einem Unternehmen</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Nach Unternehmen suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:ring-emerald-custom/20 focus:border-emerald-custom"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <CategoryGrid />
          
          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-deep-navy mb-8">Alle Unternehmen</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="glassmorphism">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : companies && companies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                  <Card key={company.id} className="glassmorphism hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                        <Badge variant="secondary" className="capitalize">
                          {company.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{company.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{company.openingHours}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 fill-current text-warning-orange" />
                          <span>{company.rating}/5</span>
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 gradient-emerald-blue text-white py-2 rounded-xl hover:shadow-lg transition-all duration-200">
                        Termin buchen
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Keine Unternehmen gefunden.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
