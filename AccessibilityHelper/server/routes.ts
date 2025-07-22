import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCompanySchema, insertAppointmentSchema, insertEventSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Companies
  app.get("/api/companies", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let companies;
      if (search) {
        companies = await storage.searchCompanies(search as string);
      } else if (category) {
        companies = await storage.getCompaniesByCategory(category as string);
      } else {
        companies = await storage.getCompanies();
      }
      
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden der Unternehmen" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompany(id);
      
      if (!company) {
        return res.status(404).json({ message: "Unternehmen nicht gefunden" });
      }
      
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden des Unternehmens" });
    }
  });

  app.post("/api/companies", async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ message: "Ungültige Unternehmensdaten" });
    }
  });

  // Appointments
  app.get("/api/appointments", async (req, res) => {
    try {
      const { companyId, date } = req.query;
      
      let appointments;
      if (companyId) {
        appointments = await storage.getAppointmentsByCompany(parseInt(companyId as string));
      } else if (date) {
        appointments = await storage.getAppointmentsByDate(date as string);
      } else {
        appointments = await storage.getAppointments();
      }
      
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden der Termine" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Ungültige Termindaten" });
    }
  });

  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const appointment = await storage.updateAppointment(id, req.body);
      
      if (!appointment) {
        return res.status(404).json({ message: "Termin nicht gefunden" });
      }
      
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Aktualisieren des Termins" });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let events;
      if (search) {
        events = await storage.searchEvents(search as string);
      } else if (category) {
        events = await storage.getEventsByCategory(category as string);
      } else {
        events = await storage.getEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden der Events" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Ungültige Event-Daten" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
