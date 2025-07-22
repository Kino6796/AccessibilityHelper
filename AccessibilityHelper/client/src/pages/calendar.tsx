import Navigation from "@/components/navigation";
import CalendarView from "@/components/calendar-view";

export default function Calendar() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-deep-navy mb-4">Terminkalender</h1>
            <p className="text-xl text-gray-600">Wähle einen verfügbaren Termin für deine Buchung</p>
          </div>
          
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
