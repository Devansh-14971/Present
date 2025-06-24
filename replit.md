# ABC Company Product Showcase - Replit Project Guide

## Overview

This is a full-stack web application for ABC Company, featuring an industrial products showcase with quote request functionality. The application provides a professional business website where customers can browse products across different categories (industrial equipment, machinery, tools) and submit quote requests.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints
- **Development**: Hot reload with Vite middleware integration

### Key Components

#### Database Schema (Drizzle ORM)
- **Products Table**: Stores product information (name, description, category, weight, image URL)
- **Quote Requests Table**: Stores customer quote requests with contact information
- **Schema Validation**: Zod schemas for type-safe data validation

#### API Endpoints
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Get specific product by ID
- `GET /api/products/category/:category` - Filter products by category
- `POST /api/quote-requests` - Submit new quote request

#### Frontend Pages
- **Home**: Hero section with featured products and company highlights
- **Products**: Searchable and filterable product catalog with modal details
- **About**: Company information and values
- **Contact**: Quote request form with validation
- **404**: Custom not found page

#### UI Components
- Responsive navigation with mobile support
- Product cards with hover effects and category badges
- Modal dialogs for product details
- Form handling with React Hook Form and validation
- Toast notifications for user feedback

### Data Flow

1. **Product Display**: Frontend fetches products from API using React Query
2. **Search/Filter**: Client-side filtering of cached product data
3. **Quote Requests**: Form submission with validation, posted to API endpoint
4. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
5. **Error Handling**: Comprehensive error boundaries and user feedback

### External Dependencies

#### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React icon library
- **Validation**: Zod for schema validation
- **Forms**: React Hook Form with Hookform resolvers

#### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production server
- **PostCSS**: CSS processing with Tailwind CSS
- **Drizzle Kit**: Database migrations and schema management

### Deployment Strategy

#### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Development**: `npm run dev` with hot reload
- **Production Build**: Vite build + ESBuild server bundling
- **Port Configuration**: Server on port 5000, external port 80
- **Auto-scaling**: Configured for autoscale deployment

#### Build Process
1. Client build with Vite (outputs to `dist/public`)
2. Server build with ESBuild (outputs to `dist/index.js`)
3. Static file serving for production
4. Environment variable management for database connection

#### Database Setup
- Drizzle configuration pointing to local SQLite file (`./data/app.db`)
- Schema migrations in `./migrations` directory
- Local file storage for easy backup and version control
- Automatic table creation on first startup

### Changelog
```
Changelog:
- June 24, 2025. Initial setup
- June 24, 2025. Added admin authentication system with login, dashboard, and session management
- June 24, 2025. Implemented PostgreSQL database integration with Drizzle ORM
- June 24, 2025. Migrated to SQLite local file database for better portability
- June 24, 2025. Added real-time dashboard data with product and quote request statistics
```

### User Preferences
```
Preferred communication style: Simple, everyday language.
```

## Architecture Decision Rationale

### Why This Stack?
- **React + TypeScript**: Type safety and component reusability for maintainable UI
- **Drizzle ORM**: Type-safe database queries with excellent PostgreSQL support
- **Shadcn/ui**: Professional, accessible components with consistent design
- **TanStack Query**: Robust server state management with caching and synchronization
- **Vite**: Fast development experience with HMR and optimized builds

### Database Strategy
- **SQLite**: Local file-based database for structured product and quote data
- **Better-SQLite3**: Fast, synchronous SQLite driver for Node.js
- **Drizzle ORM**: Modern ORM with TypeScript-first approach and type safety
- **Local Storage**: Database stored in `./data/app.db` file for easy backup and portability

### Styling Approach
- **Tailwind CSS**: Utility-first CSS for rapid development and consistent design
- **Custom Design System**: CSS variables for theming and dark mode support
- **Component Library**: Reusable UI components for consistent user experience