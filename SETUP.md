# Quick Setup Guide

This is a condensed version of the setup instructions. For detailed troubleshooting and explanations, see [README.md](README.md).

## Prerequisites

- Node.js 20.19+
- Docker Desktop

## Setup in 5 Steps

### 1. Clone & Navigate

```bash
git clone https://github.com/aronheredi/imagetemplate.git
cd imagetemplate
```

### 2. Start Docker

```bash
docker-compose up -d
```

### 3. Setup Backend

```bash
cd backend/template-backend
npm install
cp .env.example .env
# Set JWT_SECRET and DB/MINIO settings if needed
npm run start:dev
```

### 4. Setup Frontend

```bash
# In a new terminal
cd frontend/template-frontend
npm install
cp .env.example .env
# Set VITE_API_URL if needed
npm run dev
```

### 5. Open Browser

Go to http://localhost:5173 and register or log in.

## Environment Variables Cheat Sheet

### Backend (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=images

# JWT
# Used to sign/verify access tokens
JWT_SECRET=change-me

PORT=3000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## Quick Commands

```bash
# Start services
docker-compose up -d

# Stop services (keeps data)
docker-compose down

# View logs
docker-compose logs -f

# Backend dev mode
cd backend/template-backend && npm run start:dev

# Frontend dev mode
cd frontend/template-frontend && npm run dev

# Kill port conflicts
npx kill-port 3000
npx kill-port 5173
```

## Access URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MinIO Console: http://localhost:9001 (minioadmin/minioadmin)

## Common Issues

**401 Unauthorized?**
- Ensure you're logged in (token present in the browser)
- If you changed `JWT_SECRET`, re-login to get a new token
- Try clearing site data (localStorage) and logging in again

**Port in use?**
```bash
npx kill-port 3000
npx kill-port 5173
```

**Docker not starting?**
```bash
docker-compose down
docker-compose up -d
```

---

For detailed documentation, API reference, and troubleshooting, see [README.md](README.md).
