import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocalStorage } from "@/lib/storage";

interface TimeSlot {
  time: string;
  status: "available" | "booked" | "user_released" | "suggested";
}

export default function CalendarView() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [appointments, setAppointments] = useLocalStorage<Record<string, TimeSlot[]>>("appointments", {});

  const days = ["Mo", "Di", "Mi", "Do", "Fr"];
  const dates = ["6", "7", "8", "9", "10"];
  const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  const getSlotStatus = (day: number, time: string): TimeSlot["status"] => {
    const dayKey = `2025-01-${dates[day]}`;
    const dayAppointments = appointments[dayKey] || [];
    const slot = dayAppointments.find(s => s.time === time);
    return slot?.status || "available";
  };

  const getSlotStyles = (status: TimeSlot["status"]) => {
    switch (status) {
      case "available":
        return "bg-success-green/20 hover:bg-success-green/30 border-success-green/30 cursor-pointer";
      case "user_released":
        return "bg-blue-100 hover:bg-blue-200 border-blue-200 cursor-pointer";
      case "booked":
        return "bg-red-100 border-red-200 cursor-not-allowed";
      case "suggested":
        return "bg-yellow-100 hover:bg-yellow-200 border-yellow-200 cursor-pointer";
      default:
        return "bg-gray-100";
    }
  };

  const handleSlotClick = (day: number, time: string) => {
    const status = getSlotStatus(day, time);
    if (status === "booked") return;

    const dayKey = `2025-01-${dates[day]}`;
    const dayAppointments = appointments[dayKey] || [];
    const existingSlotIndex = dayAppointments.findIndex(s => s.time === time);

    let newStatus: TimeSlot["status"];
    if (existingSlotIndex >= 0) {
      // Cycle through states
      const currentStatus = dayAppointments[existingSlotIndex].status;
      switch (currentStatus) {
        case "available":
          newStatus = "user_released";
          break;
        case "user_released":
          newStatus = "suggested";
          break;
        case "suggested":
          newStatus = "available";
          break;
        default:
          newStatus = "available";
      }
      dayAppointments[existingSlotIndex].status = newStatus;
    } else {
      dayAppointments.push({ time, status: "user_released" });
    }

    setAppointments({
      ...appointments,
      [dayKey]: dayAppointments
    });
  };

  return (
    <div className="glassmorphism rounded-3xl shadow-xl p-6 lg:p-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Januar 2025</h3>
          <p className="text-gray-500">Woche 2</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Vorherige Woche"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Nächste Woche"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-6 gap-1 mb-4">
        {/* Time Column */}
        <div className="text-sm font-medium text-gray-500 space-y-1">
          <div className="h-12"></div>
          {times.map((time) => (
            <div key={time} className="h-12 flex items-center">
              {time}
            </div>
          ))}
        </div>

        {/* Days */}
        {days.map((day, dayIndex) => (
          <div key={day} className="space-y-1">
            <div className="h-12 text-center py-2 font-medium text-gray-900 border-b">
              {day}<br/>
              <span className="text-sm text-gray-500">{dates[dayIndex]}</span>
            </div>
            {times.map((time) => {
              const status = getSlotStatus(dayIndex, time);
              return (
                <div
                  key={time}
                  onClick={() => handleSlotClick(dayIndex, time)}
                  className={`h-12 rounded-lg border transition-colors ${getSlotStyles(status)}`}
                  title={status === "available" ? "Verfügbar" : 
                         status === "booked" ? "Gebucht" :
                         status === "user_released" ? "Freigegeben" : 
                         "Vorgeschlagen"}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-8 p-4 bg-gray-50/50 rounded-2xl">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success-green/30 border border-success-green/50 rounded"></div>
          <span className="text-sm text-gray-600">Verfügbar</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
          <span className="text-sm text-gray-600">Freigegeben</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
          <span className="text-sm text-gray-600">Gebucht</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
          <span className="text-sm text-gray-600">KI-Vorschlag</span>
        </div>
      </div>
    </div>
  );
}
