import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Helper functions for managing appointments in localStorage
export const appointmentStorage = {
  getAppointments: (): Record<string, any[]> => {
    try {
      const appointments = localStorage.getItem("appointments");
      return appointments ? JSON.parse(appointments) : {};
    } catch {
      return {};
    }
  },

  setAppointments: (appointments: Record<string, any[]>) => {
    try {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    } catch (error) {
      console.error("Failed to save appointments:", error);
    }
  },

  addAppointment: (date: string, appointment: any) => {
    const appointments = appointmentStorage.getAppointments();
    if (!appointments[date]) {
      appointments[date] = [];
    }
    appointments[date].push(appointment);
    appointmentStorage.setAppointments(appointments);
  },

  updateAppointment: (date: string, appointmentId: string, updates: any) => {
    const appointments = appointmentStorage.getAppointments();
    if (appointments[date]) {
      const index = appointments[date].findIndex(apt => apt.id === appointmentId);
      if (index !== -1) {
        appointments[date][index] = { ...appointments[date][index], ...updates };
        appointmentStorage.setAppointments(appointments);
      }
    }
  }
};
