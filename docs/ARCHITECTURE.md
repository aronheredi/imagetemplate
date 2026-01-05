# Architecture Documentation

This document provides a comprehensive overview of the Image Template Editor's architecture, technology stack, and system design.

## Table of Contents

- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [Data Flow](#data-flow)
- [Database Schema](#database-schema)
- [Storage Architecture](#storage-architecture)

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | Modern UI library with hooks and concurrent features |
| **TypeScript** | 5.x | Type-safe JavaScript with enhanced IDE support |
| **Vite** | 7.x | Lightning-fast build tool and dev server |
| **Fabric.js** | 6.x | HTML5 canvas library for graphics manipulation |
| **JWT Auth (custom)** | - | Email/password login and JWT token handling |
| **TanStack Query** | 5.x | Server state management and caching |
| **Zustand** | 5.x | Lightweight client state management |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Radix UI** | Latest | Accessible, unstyled component primitives |
| **React Router** | 7.x | Client-side routing |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 11.x | Progressive Node.js framework with TypeScript |
| **TypeScript** | 5.x | Type safety across the entire stack |
| **TypeORM** | 0.3.x | Database ORM with migration support |
| **PostgreSQL** | Latest | Relational database for structured data |
| **Passport JWT** | 4.x | JWT authentication strategy for Passport |
| **MinIO** | Latest | S3-compatible object storage for images |
| **Sharp** | 0.34.x | High-performance image processing |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| **Docker** | Container runtime for services |
| **Docker Compose** | Multi-container orchestration |

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          React Frontend (Port 5173)                    │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Fabric.js  │  │   Zustand    │  │  TanStack   │ │ │
│  │  │    Canvas    │  │    Store     │  │    Query    │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS
                   │ JWT Bearer Token
┌──────────────────▼──────────────────────────────────────────┐
│              NestJS Backend (Port 3000)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  JWT Auth Guard → Route Protection                     │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Templates   │  │    Files     │  │     Images      │  │
│  │  Controller  │  │  Controller  │  │   Controller    │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬────────┘  │
│         │                  │                    │            │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌────────▼────────┐  │
│  │  Templates   │  │    Files     │  │     Images      │  │
│  │   Service    │  │   Service    │  │    Service      │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬────────┘  │
│         │                  │                    │            │
└─────────┼──────────────────┼────────────────────┼───────────┘
          │                  │                    │
    ┌─────▼──────┐    ┌─────▼─────┐       ┌─────▼─────┐
    │ PostgreSQL │    │   MinIO   │       │   Sharp   │
    │  (Docker)  │    │ (Docker)  │       │ (Library) │
    │  Port 5432 │    │Port 9000  │       └───────────┘
    └────────────┘    └───────────┘
```

## Project Structure

```
imagetemplate/
├── backend/
│   └── template-backend/
│       ├── src/
│       │   ├── main.ts                 # Application entry point
│       │   ├── app.module.ts           # Root module
│       │   │
│       │   ├── auth/                   # Authentication module
│       │   │   ├── auth.module.ts      # Auth module definition
│       │   │   ├── auth.service.ts     # Registration/login + JWT issuance
│       │   │   ├── auth.controller.ts  # Auth endpoints
│       │   │   ├── jwt.strategy.ts     # Passport JWT strategy
│       │   │   ├── jwt-auth.guard.ts   # Route protection guard
│       │   │   └── public.decorator.ts # Public route marker
│       │   │
│       │   ├── templates/              # Template management
│       │   │   ├── templates.module.ts
│       │   │   ├── templates.service.ts
│       │   │   ├── templates.controller.ts
│       │   │   ├── entities/
│       │   │   │   └── template.entity.ts  # TypeORM entity
│       │   │   └── dto/
│       │   │       ├── create-template.dto.ts
│       │   │       └── update-template.dto.ts
│       │   │
│       │   ├── images/                 # Image processing
│       │   │   ├── images.module.ts
│       │   │   ├── images.service.ts   # Fabric.js server-side
│       │   │   ├── images.controller.ts
│       │   │   ├── entities/
│       │   │   │   └── image.entity.ts
│       │   │   └── dto/
│       │   │
│       │   ├── files/                  # File upload/download
│       │   │   ├── files.module.ts
│       │   │   ├── files.service.ts    # MinIO integration
│       │   │   ├── files.controller.ts
│       │   │   └── files.model.ts
│       │   │
│       │   └── minio/                  # MinIO configuration
│       │       └── minio.module.ts     # MinIO client setup
│       │
│       ├── test/                       # E2E tests
│       ├── .env.example                # Environment template
│       ├── package.json
│       ├── tsconfig.json
│       └── nest-cli.json
│
├── frontend/
│   └── template-frontend/
│       ├── src/
│       │   ├── main.tsx               # Application entry point
│       │   ├── App.tsx                # Root component
│       │   ├── router.tsx             # Route definitions
│       │   │
│       │   ├── pages/                 # Route pages
│       │   │   ├── AuthPage.tsx       # Login/register page
│       │   │   ├── CanvasPage.tsx     # Main editor
│       │   │   └── TemplatesPage.tsx  # Template gallery
│       │   │
│       │   ├── components/            # Reusable UI components
│       │   │   ├── Navigation.tsx     # Top navigation bar
│       │   │   ├── common/            # Shared components
│       │   │   ├── Layouts/           # Layout components
│       │   │   └── ui/                # Base UI components
│       │   │
│       │   ├── stores/                # Zustand state stores
│       │   │   ├── canvas-store.tsx   # Canvas state
│       │   │   ├── editor-store.tsx   # Editor state
│       │   │   └── layers-store.tsx   # Layer management
│       │   │
│       │   ├── api/                   # API integration
│       │   │   ├── axios.ts           # Axios instance
│       │   │   └── useApi.ts          # API hooks
│       │   │
│       │   ├── types/                 # TypeScript definitions
│       │   │   ├── canvas.ts
│       │   │   ├── templates.ts
│       │   │   └── query.ts
│       │   │
│       │   ├── utils/                 # Helper functions
│       │   │   ├── color-transform.tsx
│       │   │   ├── fabric-properties.tsx
│       │   │   └── get-access-token.tsx
│       │   │
│       │   ├── schemas/               # Zod validation schemas
│       │   │   └── query-schema.ts
│       │   │
│       │   └── styles/                # Global styles
│       │       └── global.css
│       │
│       ├── public/                    # Static assets
│       ├── .env.example               # Environment template
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── docs/                              # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md (this file)
│   ├── TROUBLESHOOTING.md
│   └── ENVIRONMENT.md
│
├── docker-compose.yml                 # Service orchestration
├── .env.example                       # Docker env template
├── README.md                          # Main documentation
└── SETUP.md                           # Quick setup guide
```

## Authentication Flow

The application uses email/password authentication with JWT access tokens. Users are stored in PostgreSQL.

```
1. User Access
   │
   ├─► Frontend checks authentication status
   │
   └─► Not authenticated
       │
       ▼
2. Login / Register
   │
   ├─► Frontend submits credentials to backend
   ├─► POST /auth/login or POST /auth/register
   │
   └─► Backend validates credentials (bcrypt)
       │
       ▼
3. Token Issuance
   │
   ├─► Backend signs a JWT (subject = user id)
   └─► Frontend stores token (client-side)
       │
       ▼
4. API Requests
   │
   ├─► Frontend includes JWT in Authorization header
   ├─► Example: Authorization: Bearer eyJhbGc...
   │
   └─► Backend receives request
       │
       ▼
5. JWT Validation
   │
   ├─► Backend extracts JWT from header
   ├─► Verifies JWT signature with `JWT_SECRET`
   ├─► Checks expiration
   │
   └─► Valid token
       │
       ▼
6. Access Granted
   │
   └─► Backend returns requested resource
```

### Key Components

**Frontend**
- Handles login/register UI
- Stores the JWT token client-side
- Adds `Authorization: Bearer ...` to API calls

**Backend (Passport JWT Strategy)**
- Validates JWT signatures
- Extracts user information
- Protects routes with guards
- Allows public routes via decorator

## Data Flow

### Creating a Template

```
1. User designs template in Fabric.js canvas
   │
   ├─► Fabric.js manages canvas state
   ├─► User adds/moves/styles elements
   │
   └─► Zustand stores local state
       │
       ▼
2. User clicks "Save"
   │
   ├─► Frontend serializes canvas to JSON
   ├─► Template data: { name, description, json }
   │
   └─► POST request to /templates
       │
       ▼
3. Backend receives request
   │
   ├─► JWT Auth Guard validates token
   ├─► DTO validation (class-validator)
   │
   └─► Templates Service
       │
       ▼
4. Save to database
   │
   ├─► TypeORM creates entity
   ├─► PostgreSQL stores template
   │
   └─► Returns saved template with ID
       │
       ▼
5. Frontend updates
   │
   ├─► TanStack Query caches result
   ├─► UI shows success message
   │
   └─► Template list refreshes
```

### Uploading an Image

```
1. User selects image file
   │
   ├─► File input captures file
   │
   └─► FormData created
       │
       ▼
2. POST to /files/upload
   │
   ├─► Multipart form data
   ├─► JWT token in header
   │
   └─► Backend receives file
       │
       ▼
3. Image processing
   │
   ├─► Sharp validates image
   ├─► Optional resize/optimization
   │
   └─► Generates unique filename
       │
       ▼
4. Upload to MinIO
   │
   ├─► MinIO client uploads file
   ├─► Stored in 'images' bucket
   │
   └─► Returns file URL
       │
       ▼
5. Add to canvas
   │
   ├─► Frontend receives URL
   ├─► Fabric.js creates image object
   │
   └─► Image appears on canvas
```

## Database Schema

### Templates Table

```sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  json JSONB NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_templates_user_id ON templates(user_id);
CREATE INDEX idx_templates_created_at ON templates(created_at DESC);
```

### Images Table

```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL UNIQUE,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100),
  size INTEGER,
  user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_images_user_id ON images(user_id);
CREATE INDEX idx_images_filename ON images(filename);
```

## Storage Architecture

### MinIO Object Storage

**Bucket Structure:**
```
images/
├── abc123-photo1.jpg
├── def456-photo2.png
├── ghi789-logo.svg
└── ...
```

**Features:**
- S3-compatible API
- Automatic content-type detection
- Direct URL access for authorized users
- Configurable retention policies

**Access Pattern:**
1. Backend uploads file with unique name
2. MinIO stores file and returns URL
3. URL stored in database or template JSON
4. Frontend fetches file using JWT auth
5. Backend proxies request to MinIO

### File Naming Convention

```
{uuid}-{sanitized-original-name}.{extension}
```

Example: `550e8400-e29b-41d4-a716-446655440000-my-image.jpg`

## Scalability Considerations

### Current Architecture (Development)

- Single-server deployment
- Local Docker containers
- Direct file uploads
- Synchronous processing

### Production Recommendations

1. **Database:**
   - PostgreSQL cluster with read replicas
   - Connection pooling (PgBouncer)
   - Regular backups and point-in-time recovery

2. **File Storage:**
   - AWS S3 or similar cloud storage
   - CDN for image delivery (CloudFront)
   - Presigned URLs for secure direct uploads

3. **Backend:**
   - Horizontal scaling with load balancer
   - Redis for session/cache management
   - Queue system for async processing (Bull/RabbitMQ)

4. **Frontend:**
   - Static hosting (Vercel/Netlify/S3+CloudFront)
   - Service worker for offline capabilities
   - Code splitting and lazy loading

5. **Monitoring:**
   - Application monitoring (DataDog/New Relic)
   - Error tracking (Sentry)
   - Log aggregation (ELK stack)

---

For more information, see:
- [API Documentation](./API.md)
- [Setup Guide](../SETUP.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
