# NetConnect - Professional Networking & HR Platform

## Overview

NetConnect is a comprehensive professional networking and HR platform that combines career management tools for candidates with recruitment capabilities for HR professionals. The platform features 18 interconnected panels organized into two main sections: Candidate/Networking (Panels A-L) and HR/Recruiting (Panels M-R).

The application provides an interactive 3D bubble visualization for networking connections, detailed candidate profiles, job application tracking, interview management, assessment tools, and comprehensive HR analytics. It's designed to facilitate professional networking, career advancement, and efficient recruitment processes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching
- Tailwind CSS for utility-first styling with custom design system

**UI Component System:**
- shadcn/ui component library (Radix UI primitives) for accessible, customizable components
- Custom design system based on "new-york" style with neutral color palette
- CSS variables for theme customization supporting light/dark modes
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)

**3D Visualization:**
- Three.js for WebGL-based 3D rendering
- React Three Fiber for declarative Three.js integration
- @react-three/drei for helpful Three.js abstractions (OrbitControls, Float, Html)
- Custom bubble field visualization for networking connections with interactive avatar spheres

**State Management Pattern:**
- Local component state with useState for UI interactions
- Lifted state in HomePage for cross-panel communication
- Selected person/candidate state shared across multiple panels
- No global state management library - relies on prop drilling and React Query for server state

**Design System:**
- Typography: Inter for general text, JetBrains Mono for code displays
- Consistent spacing scale (2, 4, 6, 8, 12, 16px units)
- Panel-based layout with 12-column responsive grid
- Card pattern with 12px border radius, elevation shadows, and hover effects
- Professional color scheme with chart colors for data visualization

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- Node.js runtime with ESM module format
- TypeScript for type safety across the stack

**Development Setup:**
- Vite middleware mode for HMR (Hot Module Replacement) in development
- Custom Vite plugins for Replit integration (error overlay, cartographer, dev banner)
- TSX for running TypeScript files directly in development

**Storage Layer:**
- In-memory storage implementation (`MemStorage` class) for prototyping
- Interface-based storage design (`IStorage`) for easy database swap
- Currently supports basic user CRUD operations
- Prepared for database integration with Drizzle ORM

**API Structure:**
- Routes organized under `/api` prefix
- Centralized route registration in `server/routes.ts`
- JSON request/response format
- Request logging middleware with duration tracking

**Production Build:**
- esbuild for fast server-side bundling
- Vite for optimized client bundle
- Static file serving with Express in production mode

### Data Storage Solutions

**Current Implementation:**
- In-memory Map-based storage for rapid prototyping
- No persistence between server restarts
- UUID generation for entity IDs

**Database Schema (Prepared):**
- Drizzle ORM configured with PostgreSQL dialect
- Schema defined in `shared/schema.ts` for type sharing
- User table with id (UUID), username (unique), password fields
- Zod schemas for runtime validation of insert operations
- Migration directory configured for schema versioning

**Database Integration Points:**
- Neon serverless PostgreSQL driver ready (@neondatabase/serverless)
- Connection string via DATABASE_URL environment variable
- Drizzle Kit configured for schema push and migrations
- Shared types between client and server via TypeScript inference

### Authentication and Authorization

**Current State:**
- User schema exists with username/password fields
- No authentication middleware implemented
- Session management library present (connect-pg-simple for PostgreSQL sessions)
- Cookie-based credentials configured in fetch requests

**Prepared Infrastructure:**
- Express session middleware ready for implementation
- Password hashing not yet implemented
- Route protection middleware not configured
- User context/session handling to be added

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives for 20+ accessible component primitives
- Recharts for data visualization (bar charts, line charts, pie charts)
- Lucide React for consistent icon system
- React Hook Form with Zod resolvers for form validation
- date-fns for date manipulation

**Development Tools:**
- TypeScript compiler for type checking
- PostCSS with Autoprefixer for CSS processing
- Tailwind CSS for utility-first styling

**3D Graphics:**
- Three.js r151 for WebGL rendering
- OrbitControls for camera manipulation
- Canvas textures for dynamic avatar generation

**Utility Libraries:**
- clsx and tailwind-merge for conditional className composition
- class-variance-authority (CVA) for component variant patterns
- nanoid for unique ID generation
- cmdk for command palette functionality

**Database & ORM:**
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection
- drizzle-zod for schema-to-Zod conversion

**Replit Integration:**
- @replit/vite-plugin-runtime-error-modal for error handling
- @replit/vite-plugin-cartographer for code navigation
- @replit/vite-plugin-dev-banner for development indicators

**Testing & Quality:**
- No testing framework currently configured
- TypeScript strict mode enabled for compile-time checks
- ESLint/Prettier not configured