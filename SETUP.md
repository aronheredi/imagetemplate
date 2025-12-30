# Quick Setup Guide

This is a condensed version of the setup instructions. For detailed troubleshooting and explanations, see [README.md](README.md).

## Prerequisites

- Node.js 20.19+
- Docker Desktop
- Auth0 Account (free)

## Setup in 6 Steps

### 1. Clone & Navigate

```bash
git clone https://github.com/aronheredi/imagetemplate.git
cd imagetemplate
```

### 2. Configure Auth0

Create these in your Auth0 dashboard:

1. **Single Page Application** → Note Domain & Client ID
   - Add callback URL: `http://localhost:5173/callback`
   - Add logout URL: `http://localhost:5173`
   - Add web origin: `http://localhost:5173`

2. **Machine to Machine Application** → Note Client ID & Secret

3. **API** with identifier: `http://imagetemplate`

### 3. Start Docker

```bash
docker-compose up -d
```

### 4. Setup Backend

```bash
cd backend/template-backend
npm install
cp .env.example .env
# Edit .env with your Auth0 credentials
npm run start:dev
```

### 5. Setup Frontend

```bash
# In a new terminal
cd frontend/template-frontend
npm install
cp .env.example .env
# Edit .env with your Auth0 credentials
npm run dev
```

### 6. Open Browser

Go to http://localhost:5173 and log in!

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

# Auth0
AUTH0_DOMAIN=YOUR-TENANT.us.auth0.com
AUTH0_AUDIENCE=http://imagetemplate
AUTH0_M2M_DOMAIN=YOUR-TENANT.us.auth0.com
AUTH0_M2M_CLIENT_ID=YOUR-M2M-CLIENT-ID
AUTH0_M2M_CLIENT_SECRET=YOUR-M2M-CLIENT-SECRET

PORT=3000
```

### Frontend (.env)

```env
VITE_AUTH0_DOMAIN=YOUR-TENANT.us.auth0.com
VITE_AUTH0_AUDIENCE=http://imagetemplate
VITE_AUTH0_CLIENT_ID=YOUR-SPA-CLIENT-ID
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
- Check Auth0 credentials in .env files
- Verify Auth0 callback URLs are configured
- Try logging out and back in

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
