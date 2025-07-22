import { companies, appointments, events, type Company, type InsertCompany, type Appointment, type InsertAppointment, type Event, type InsertEvent } from "@shared/schema";
import { db } from "./db";
import { eq, like, or, and } from "drizzle-orm";

export interface IStorage {
  // Companies
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  getCompaniesByCategory(category: string): Promise<Company[]>;
  searchCompanies(query: string): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  
  // Appointments
  getAppointments(): Promise<Appointment[]>;
  getAppointmentsByCompany(companyId: number): Promise<Appointment[]>;
  getAppointmentsByDate(date: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment | undefined>;
  
  // Events
  getEvents(): Promise<Event[]>;
  getEventsByCategory(category: string): Promise<Event[]>;
  searchEvents(query: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class MemStorage implements IStorage {
  private companies: Map<number, Company>;
  private appointments: Map<number, Appointment>;
  private events: Map<number, Event>;
  private currentCompanyId: number;
  private currentAppointmentId: number;
  private currentEventId: number;

  constructor() {
    this.companies = new Map();
    this.appointments = new Map();
    this.events = new Map();
    this.currentCompanyId = 1;
    this.currentAppointmentId = 1;
    this.currentEventId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed companies
    const sampleCompanies: InsertCompany[] = [
      {
        name: "Restaurant Zur Linde",
        category: "restaurants",
        description: "Traditionelle deutsche Küche in gemütlicher Atmosphäre",
        location: "Hamburg Mitte",
        phone: "+49 40 123456",
        email: "info@zurlinde.de",
        rating: 4,
        openingHours: "11:00-22:00"
      },
      {
        name: "Dr. med. Sarah Weber",
        category: "ärzte",
        description: "Allgemeinmedizin und Vorsorgeuntersuchungen",
        location: "Hamburg Altona",
        phone: "+49 40 987654",
        email: "praxis@dr-weber.de",
        rating: 5,
        openingHours: "08:00-18:00"
      },
      {
        name: "Salon Schönheit",
        category: "friseure",
        description: "Moderne Haarschnitte und Styling für Damen und Herren",
        location: "Hamburg Eimsbüttel",
        phone: "+49 40 456789",
        email: "termin@salon-schoenheit.de",
        rating: 4,
        openingHours: "09:00-19:00"
      },
      {
        name: "Beauty & Wellness Spa",
        category: "kosmetik",
        description: "Professionelle Kosmetikbehandlungen und Wellness",
        location: "Hamburg Harvestehude",
        phone: "+49 40 321654",
        email: "info@beauty-wellness.de",
        rating: 5,
        openingHours: "10:00-20:00"
      },
      {
        name: "FitLife Gym",
        category: "fitness",
        description: "Modernes Fitnessstudio mit Personal Training",
        location: "Hamburg St. Pauli",
        phone: "+49 40 654987",
        email: "info@fitlife-gym.de",
        rating: 4,
        openingHours: "06:00-22:00"
      },
      {
        name: "Entspannung Pur",
        category: "wellness",
        description: "Massage, Sauna und Entspannungsbehandlungen",
        location: "Hamburg Winterhude",
        phone: "+49 40 789123",
        email: "relax@entspannung-pur.de",
        rating: 5,
        openingHours: "10:00-21:00"
      },
      {
        name: "Bürgeramt Hamburg-Mitte",
        category: "ämter",
        description: "Personalausweise, Reisepässe, Meldeangelegenheiten und weitere Bürgerdienste",
        location: "Hamburg Mitte",
        phone: "+49 40 42831-0",
        email: "buergeramt@hamburg.de",
        rating: 3,
        openingHours: "08:00-16:00"
      },
      {
        name: "KFZ-Zulassungsstelle Hamburg",
        category: "ämter",
        description: "Fahrzeugzulassungen, Ummeldungen und KFZ-Kennzeichen",
        location: "Hamburg Harburg",
        phone: "+49 40 42871-0",
        email: "kfz@hamburg.de",
        rating: 3,
        openingHours: "08:00-15:30"
      }
    ];

    sampleCompanies.forEach(company => {
      const id = this.currentCompanyId++;
      this.companies.set(id, { ...company, id });
    });

    // Seed events
    const sampleEvents: InsertEvent[] = [
      {
        title: "Sinfoniekonzert Hamburg",
        description: "Erleben Sie klassische Musik vom Feinsten mit der Hamburger Philharmonie",
        category: "kultur",
        date: "2025-01-11",
        time: "20:00",
        location: "Elbphilharmonie",
        price: "ab 29€",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
      },
      {
        title: "Töpfer-Workshop für Anfänger",
        description: "Lernen Sie die Grundlagen der Keramikkunst in entspannter Atmosphäre",
        category: "bildung",
        date: "2025-01-12",
        time: "14:00",
        location: "Keramikstudio Mitte",
        price: "65€",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
      },
      {
        title: "Street Food Festival",
        description: "Internationale Küche von über 30 Food Trucks und lokalen Anbietern",
        category: "gastronomie",
        date: "2025-01-10",
        time: "11:00",
        location: "Stadtpark",
        price: "Kostenlos",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
      }
    ];

    sampleEvents.forEach(event => {
      const id = this.currentEventId++;
      this.events.set(id, { ...event, id });
    });
  }

  // Companies
  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompaniesByCategory(category: string): Promise<Company[]> {
    return Array.from(this.companies.values()).filter(
      company => company.category === category
    );
  }

  async searchCompanies(query: string): Promise<Company[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.companies.values()).filter(
      company => 
        company.name.toLowerCase().includes(lowerQuery) ||
        company.category.toLowerCase().includes(lowerQuery) ||
        company.description?.toLowerCase().includes(lowerQuery)
    );
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { ...insertCompany, id };
    this.companies.set(id, company);
    return company;
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointmentsByCompany(companyId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.companyId === companyId
    );
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.date === date
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const appointment: Appointment = { ...insertAppointment, id };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointment(id: number, appointmentUpdate: Partial<Appointment>): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updated = { ...appointment, ...appointmentUpdate };
    this.appointments.set(id, updated);
    return updated;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      event => event.category === category
    );
  }

  async searchEvents(query: string): Promise<Event[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.events.values()).filter(
      event => 
        event.title.toLowerCase().includes(lowerQuery) ||
        event.category.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery)
    );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
}

export class DatabaseStorage implements IStorage {
  // Companies
  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async getCompaniesByCategory(category: string): Promise<Company[]> {
    return await db.select().from(companies).where(eq(companies.category, category));
  }

  async searchCompanies(query: string): Promise<Company[]> {
    const searchPattern = `%${query}%`;
    return await db.select().from(companies).where(
      or(
        like(companies.name, searchPattern),
        like(companies.category, searchPattern),
        like(companies.description, searchPattern)
      )
    );
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db.insert(companies).values(insertCompany).returning();
    return company;
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }

  async getAppointmentsByCompany(companyId: number): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.companyId, companyId));
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.date, date));
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db.insert(appointments).values(insertAppointment).returning();
    return appointment;
  }

  async updateAppointment(id: number, appointmentUpdate: Partial<Appointment>): Promise<Appointment | undefined> {
    const [appointment] = await db.update(appointments)
      .set(appointmentUpdate)
      .where(eq(appointments.id, id))
      .returning();
    return appointment || undefined;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    return await db.select().from(events).where(eq(events.category, category));
  }

  async searchEvents(query: string): Promise<Event[]> {
    const searchPattern = `%${query}%`;
    return await db.select().from(events).where(
      or(
        like(events.title, searchPattern),
        like(events.category, searchPattern),
        like(events.description, searchPattern)
      )
    );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }
}

export const storage = new DatabaseStorage();
