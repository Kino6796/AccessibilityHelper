import type { Event } from "@shared/schema";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "kultur":
        return "bg-coral text-coral";
      case "bildung":
        return "bg-electric-violet text-electric-violet";
      case "gastronomie":
        return "bg-warm-amber text-warm-amber";
      case "sport":
        return "bg-success-green text-success-green";
      default:
        return "bg-gray-500 text-gray-500";
    }
  };

  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      kultur: "Kultur",
      bildung: "Bildung",
      gastronomie: "Gastronomie",
      sport: "Sport"
    };
    return categoryMap[category.toLowerCase()] || category;
  };

  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const monthNames = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    
    return `${dayNames[date.getDay()]}, ${date.getDate()}. ${monthNames[date.getMonth()]} • ${timeStr}`;
  };

  const colorClass = getCategoryColor(event.category);

  return (
    <div className="group glassmorphism rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0]}`}></div>
          <span className={`text-sm font-medium ${colorClass.split(' ')[1]}`}>
            {getCategoryName(event.category)}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-custom transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date, event.time)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-emerald-custom">
            {event.price}
          </span>
          <button className="gradient-emerald-blue text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200">
            {event.price?.toLowerCase().includes("kostenlos") ? "Details" : "Buchen"}
          </button>
        </div>
      </div>
    </div>
  );
}
