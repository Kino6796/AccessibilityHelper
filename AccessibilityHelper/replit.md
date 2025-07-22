# BookAble - Accessible Appointment Booking System

## Overview

BookAble is a modern, accessible React application designed to help people with language barriers book appointments with various businesses (restaurants, doctors, hair salons, etc.). The application features a clean, modern UI with Tailwind CSS and focuses on accessibility and ease of use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight React router)
- **State Management**: React Query (@tanstack/react-query) for server state, React hooks for local state
- **Build Tool**: Vite with custom configuration
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful APIs under `/api` prefix
- **Error Handling**: Centralized middleware with structured error responses
- **Development**: Hot reload with Vite integration

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM (ACTIVE)
- **Database Provider**: Replit PostgreSQL instance 
- **Schema Management**: Drizzle Kit for migrations and schema sync
- **Storage Implementation**: DatabaseStorage class replaces MemStorage for persistent data
- **Seed Data**: Automated seeding script with sample companies, events, and appointments
- **Local Storage**: Browser localStorage for client-side state persistence

## Key Components

### Calendar System
- **Weekly View**: Monday-Friday, 8:00-18:00 with 15-minute slots
- **Color Coding**:
  - Green (#4ade80): Available slots
  - Blue (#60a5fa): User-released slots
  - Red (#f87171): Booked slots
  - Yellow (#facc15): Suggested appointments/events
- **Interactive Slots**: Click-to-cycle through states
- **Local Storage**: Appointment data persisted locally

### Company Management
- **Categories**: Restaurants, doctors, hairdressers, beauty, fitness, etc.
- **Search & Filter**: By category, name, and location
- **Company Profiles**: Name, description, location, contact info, ratings
- **Availability Slots**: Company-specific time slots

### Event Discovery
- **Categories**: Culture, sports, gastronomy, education
- **Event Cards**: Image, title, description, date/time, location, price
- **Filtering**: By category and search terms

### User Interface
- **Design System**: Modern glassmorphism effects, rounded corners, subtle shadows
- **Accessibility**: WCAG AA/AAA compliant colors, ARIA labels, keyboard navigation
- **Responsive**: Mobile-first design with touch-friendly interactions
- **Navigation**: Fixed header with glassmorphism effect

## Data Flow

### Client-Side Flow
1. **Application Bootstrap**: React app loads with React Query client
2. **Data Fetching**: React Query manages server state with automatic caching
3. **Local State**: Appointments stored in localStorage for offline access
4. **Component Updates**: State changes trigger re-renders via React hooks

### Server-Side Flow
1. **Request Processing**: Express middleware handles requests
2. **Data Access**: PostgreSQL database via DatabaseStorage with Drizzle ORM
3. **Response Formatting**: Structured JSON responses with error handling
4. **Static Assets**: Vite serves frontend in development

### Database Schema
- **Companies Table**: Business information, categories, availability (6 sample companies)
- **Appointments Table**: Booking details, status, customer information (4 sample appointments)
- **Events Table**: Event listings with categories and details (4 sample events)
- **Relations**: Appointments linked to companies via companyId foreign key
- **Seed Script**: `server/seed.ts` for automated data population

## External Dependencies

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant styling

### Data & State Management
- **React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database ORM
- **Zod**: Schema validation

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the application
- **ESLint/Prettier**: Code quality and formatting

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL provider
- **Drizzle Kit**: Database migration tool

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: Connection to Neon Database via DATABASE_URL
- **Environment Variables**: Required for database connectivity

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server to `dist/index.js`
3. **Static Assets**: Frontend served from build directory

### Production Deployment
- **Node.js Runtime**: ES modules with production environment
- **Static File Serving**: Express serves built frontend assets
- **Database Migrations**: Drizzle Kit handles schema changes
- **Environment Configuration**: Production DATABASE_URL required

### Key Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema synchronization

The application implements a modern full-stack architecture with emphasis on accessibility, user experience, and developer productivity. The choice of lightweight libraries (Wouter, React Query) over heavier alternatives provides better performance while maintaining functionality.