import { CATEGORIES } from "@/lib/constants";
import { Link } from "wouter";

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-deep-navy mb-4">Kategorien entdecken</h2>
          <p className="text-gray-600 text-lg">Wähle die passende Kategorie für deinen Termin</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/kategorien?category=${category.id}`}>
              <div className="group glassmorphism hover:bg-white hover:shadow-lg hover:-translate-y-1 rounded-3xl p-6 text-center cursor-pointer transition-all duration-300">
                <div className={`w-16 h-16 ${category.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.count} verfügbar</p>
              </div>
            </Link>
          ))}
        </div>

        {/* More Categories Button */}
        <div className="text-center">
          <Link href="/kategorien">
            <button className="glassmorphism text-gray-700 px-8 py-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
              Alle Kategorien anzeigen
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
