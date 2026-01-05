# Environment Variables Reference

Complete reference for all environment variables used in the Image Template Editor.

## Table of Contents

- [Root Environment (.env)](#root-environment-env)
- [Backend Environment](#backend-environment)
- [Frontend Environment](#frontend-environment)
- [Security Best Practices](#security-best-practices)

## Root Environment (.env)

Located at project root, used by `docker-compose.yml`.

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_USER` | PostgreSQL username | `postgres` | ✅ |
| `DB_PASSWORD` | PostgreSQL password | `password` | ✅ |
| `DB_NAME` | PostgreSQL database name | `postgres` | ✅ |
| `MINIO_USER` | MinIO root user | `minioadmin` | ✅ |
| `MINIO_PASSWORD` | MinIO root password | `minioadmin` | ✅ |

**Example `.env`:**
```env
# PostgreSQL Configuration
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres

# MinIO Configuration
MINIO_USER=minioadmin
MINIO_PASSWORD=minioadmin
```

## Backend Environment

Located at `backend/template-backend/.env`.

### Database Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | PostgreSQL host address | `localhost` | ✅ |
| `DB_PORT` | PostgreSQL port | `5432` | ✅ |
| `DB_USER` | PostgreSQL username | `postgres` | ✅ |
| `DB_PASSWORD` | PostgreSQL password | `password` | ✅ |
| `DB_NAME` | Database name | `postgres` | ✅ |

### MinIO Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MINIO_ENDPOINT` | MinIO server host | `localhost` | ✅ |
| `MINIO_PORT` | MinIO API port | `9000` | ✅ |
| `MINIO_ACCESS_KEY` | MinIO access key | `minioadmin` | ✅ |
| `MINIO_SECRET_KEY` | MinIO secret key | `minioadmin` | ✅ |
| `MINIO_BUCKET` | Bucket name for images | `images` | ✅ |

### JWT Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | Secret used to sign/verify JWT access tokens | `change-me` | ✅ |

### Server Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | `3000` | ⚠️ Optional |

**Complete Example:**

```env
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres

# MinIO Object Storage Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=images

# JWT
JWT_SECRET=change-me

# Server Configuration
PORT=3000
```

## Frontend Environment

Located at `frontend/template-frontend/.env`.

⚠️ **Important:** All frontend environment variables must be prefixed with `VITE_` to be accessible in the browser.

### API Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` | ⚠️ Optional |

**Complete Example:**

```env
# Backend API Configuration
VITE_API_URL=http://localhost:3000
```

## Security Best Practices

### Development

1. **Never commit `.env` files:**
   ```bash
   # Already in .gitignore
   echo ".env" >> .gitignore
   ```

2. **Use `.env.example` for documentation:**
   - Remove actual secrets
   - Provide examples or placeholders
   - Commit to repository

3. **Rotate secrets regularly:**
   - Rotate `JWT_SECRET` when needed (forces re-login)
   - Update database passwords periodically

### Production

1. **Use strong passwords:**
   - Database: 32+ random characters
   - MinIO: 32+ random characters
   - JWT secret: 32+ random characters (or a generated secret)
   - Never use defaults in production

2. **Enable HTTPS:**
   - Terminate TLS at a reverse proxy (nginx/traefik) in production

4. **Use secrets management:**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault
   - Google Cloud Secret Manager

4. **Protect authentication endpoints:**
   - Rate-limit `/auth/login`
   - Monitor failed login attempts

6. **Restrict CORS:**
   ```typescript
   // Backend: Only allow your frontend domain
   app.enableCors({
     origin: 'https://yourdomain.com',
     credentials: true
   });
   ```

6. **Use environment variables in CI/CD:**
   ```yaml
   # GitHub Actions example
   env:
       DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
       MINIO_PASSWORD: ${{ secrets.MINIO_PASSWORD }}
       JWT_SECRET: ${{ secrets.JWT_SECRET }}
   ```

## Verifying Configuration

### Backend

```bash
cd backend/template-backend

# Check all variables are set
cat .env | grep -v "^#" | grep -v "^$"

# Test database connection
npm run start:dev
# Should see: "Database connected successfully"
```

### Frontend

```bash
cd frontend/template-frontend

# Check all variables are set
cat .env | grep -v "^#" | grep -v "^$"

# Verify variables are accessible
npm run dev
# Open browser console:
console.log(import.meta.env.VITE_API_URL)
# Should print your API URL
```

### Authentication

Test authentication flow:
1. Start backend and frontend
2. Navigate to http://localhost:5173
3. Register a new account (or log in)
4. Open DevTools → Network and confirm API calls include `Authorization: Bearer ...`

## Common Mistakes

### ❌ Wrong: Forgetting `VITE_` prefix in frontend

```env
API_URL=http://localhost:3000  # Won't work in frontend!
```

### ✅ Correct: Using `VITE_` prefix

```env
VITE_API_URL=http://localhost:3000  # Accessible in browser
```

---

For more information, see:
- [Setup Guide](../SETUP.md)
- [API Documentation](./API.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
