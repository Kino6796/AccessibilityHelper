import { db } from "./db";
import { companies, events, appointments } from "@shared/schema";
import type { InsertCompany, InsertEvent, InsertAppointment } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(appointments);
  await db.delete(events);
  await db.delete(companies);

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
      name: "Beauty Lounge",
      category: "schönheit",
      description: "Kosmetikbehandlungen, Maniküre und Pediküre",
      location: "Hamburg Wandsbek",
      phone: "+49 40 654321",
      email: "info@beauty-lounge.de",
      rating: 5,
      openingHours: "10:00-20:00"
    },
    {
      name: "Bürgeramt Hamburg Mitte",
      category: "ämter",
      description: "Personalausweise, Reisepässe und Anmeldungen",
      location: "Hamburg Mitte",
      phone: "+49 40 428280",
      email: "buergeramt@hamburg.de",
      rating: 3,
      openingHours: "08:00-16:00"
    },
    {
      name: "Pizza Bella",
      category: "restaurants",
      description: "Authentische italienische Küche und frische Pizza",
      location: "Hamburg St. Pauli",
      phone: "+49 40 321654",
      email: "info@pizzabella.de",
      rating: 4,
      openingHours: "12:00-23:00"
    }
  ];

  const insertedCompanies = await db.insert(companies).values(sampleCompanies).returning();

  // Seed events
  const sampleEvents: InsertEvent[] = [
    {
      title: "Sinfoniekonzert Hamburg",
      description: "Ein unvergesslicher Abend mit klassischer Musik",
      category: "kultur",
      date: "2024-03-15",
      time: "20:00",
      location: "Elbphilharmonie Hamburg",
      price: "ab 25€",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    },
    {
      title: "Kochkurs: Italienische Küche",
      description: "Lernen Sie die Geheimnisse der italienischen Küche kennen",
      category: "gastronomie",
      date: "2024-03-20",
      time: "18:00",
      location: "Kochstudio Hamburg",
      price: "89€",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
    },
    {
      title: "Marathon Hamburg 2024",
      description: "Deutschlands größter Stadtmarathon",
      category: "sport",
      date: "2024-04-28",
      time: "09:00",
      location: "Hamburg Innenstadt",
      price: "Kostenlos",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400"
    },
    {
      title: "Business Workshop",
      description: "Digitale Transformation für kleine Unternehmen",
      category: "bildung",
      date: "2024-03-25",
      time: "14:00",
      location: "Handelskammer Hamburg",
      price: "150€",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
    }
  ];

  await db.insert(events).values(sampleEvents);

  // Seed some sample appointments
  const sampleAppointments: InsertAppointment[] = [
    {
      companyId: insertedCompanies[0].id,
      date: "2024-03-15",
      time: "12:00",
      status: "available"
    },
    {
      companyId: insertedCompanies[0].id,
      date: "2024-03-15",
      time: "13:00",
      status: "booked",
      customerName: "Max Mustermann",
      customerEmail: "max@example.com"
    },
    {
      companyId: insertedCompanies[1].id,
      date: "2024-03-16",
      time: "10:00",
      status: "available"
    },
    {
      companyId: insertedCompanies[1].id,
      date: "2024-03-16",
      time: "11:00",
      status: "suggested"
    }
  ];

  await db.insert(appointments).values(sampleAppointments);

  console.log("✅ Database seeded successfully!");
  console.log(`   - ${insertedCompanies.length} companies`);
  console.log(`   - ${sampleEvents.length} events`);
  console.log(`   - ${sampleAppointments.length} appointments`);
}

// Run seeding if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error seeding database:", error);
      process.exit(1);
    });
}

export { seedDatabase };