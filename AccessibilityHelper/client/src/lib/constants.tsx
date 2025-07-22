import { 
  Utensils, 
  Heart, 
  Scissors, 
  Sparkles, 
  Zap, 
  Flower2,
  Briefcase,
  Wrench,
  Car,
  BookOpen,
  Scale,
  Home
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "restaurants",
    name: "Restaurants",
    count: 243,
    icon: Utensils,
    gradient: "gradient-coral-amber"
  },
  {
    id: "ärzte",
    name: "Ärzte",
    count: 156,
    icon: Heart,
    gradient: "gradient-emerald-blue"
  },
  {
    id: "friseure",
    name: "Friseure",
    count: 89,
    icon: Scissors,
    gradient: "gradient-violet-coral"
  },
  {
    id: "kosmetik",
    name: "Kosmetik",
    count: 67,
    icon: Sparkles,
    gradient: "gradient-amber-emerald"
  },
  {
    id: "fitness",
    name: "Fitness",
    count: 124,
    icon: Zap,
    gradient: "gradient-success-blue"
  },
  {
    id: "wellness",
    name: "Wellness",
    count: 45,
    icon: Flower2,
    gradient: "gradient-violet-amber"
  },
  {
    id: "beratung",
    name: "Beratung",
    count: 78,
    icon: Briefcase,
    gradient: "gradient-emerald-blue"
  },
  {
    id: "handwerk",
    name: "Handwerk",
    count: 92,
    icon: Wrench,
    gradient: "gradient-coral-amber"
  },
  {
    id: "auto-service",
    name: "Auto-Service",
    count: 56,
    icon: Car,
    gradient: "gradient-success-blue"
  },
  {
    id: "bildung",
    name: "Bildung",
    count: 34,
    icon: BookOpen,
    gradient: "gradient-violet-coral"
  },
  {
    id: "rechtsberatung",
    name: "Rechtsberatung",
    count: 23,
    icon: Scale,
    gradient: "gradient-amber-emerald"
  },
  {
    id: "immobilien",
    name: "Immobilien",
    count: 41,
    icon: Home,
    gradient: "gradient-violet-amber"
  },
  {
    id: "ämter",
    name: "Ämter",
    count: 12,
    icon: Briefcase,
    gradient: "gradient-emerald-blue"
  }
];

export const EVENT_CATEGORIES = [
  { id: "kultur", name: "Kultur" },
  { id: "sport", name: "Sport" },
  { id: "gastronomie", name: "Gastronomie" },
  { id: "bildung", name: "Bildung" },
  { id: "workshop", name: "Workshop" },
  { id: "konzert", name: "Konzert" },
  { id: "ausstellung", name: "Ausstellung" },
  { id: "festival", name: "Festival" }
];
