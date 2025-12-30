# Environment Variables Reference

Complete reference for all environment variables used in the Image Template Editor.

## Table of Contents

- [Root Environment (.env)](#root-environment-env)
- [Backend Environment](#backend-environment)
- [Frontend Environment](#frontend-environment)
- [Auth0 Setup](#auth0-setup)
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

### Auth0 Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `AUTH0_DOMAIN` | Auth0 tenant domain (no https://) | `tenant.us.auth0.com` | ✅ |
| `AUTH0_AUDIENCE` | Auth0 API identifier | `http://imagetemplate` | ✅ |
| `AUTH0_M2M_DOMAIN` | Auth0 M2M tenant domain | `tenant.us.auth0.com` | ✅ |
| `AUTH0_M2M_CLIENT_ID` | Machine to Machine client ID | `abc123xyz...` | ✅ |
| `AUTH0_M2M_CLIENT_SECRET` | Machine to Machine client secret | `secret_xyz...` | ✅ |

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

# Auth0 Configuration
AUTH0_DOMAIN=dev-abc123.us.auth0.com
AUTH0_AUDIENCE=http://imagetemplate

# Auth0 Machine-to-Machine Configuration
AUTH0_M2M_DOMAIN=dev-abc123.us.auth0.com
AUTH0_M2M_CLIENT_ID=mAn7PpZwJzxcwyFwZIehiZzNcxC9zmo9
AUTH0_M2M_CLIENT_SECRET=u2HBagvfQUA38fcn7I6Nj43dhM0LQz51R2GGZnH0_cra4f2bnVyKRt9O6eHdBvU9

# Server Configuration
PORT=3000
```

## Frontend Environment

Located at `frontend/template-frontend/.env`.

⚠️ **Important:** All frontend environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Auth0 Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_AUTH0_DOMAIN` | Auth0 tenant domain (no https://) | `tenant.us.auth0.com` | ✅ |
| `VITE_AUTH0_AUDIENCE` | Auth0 API identifier | `http://imagetemplate` | ✅ |
| `VITE_AUTH0_CLIENT_ID` | Single Page App client ID | `xyz123abc...` | ✅ |

### API Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` | ⚠️ Optional |

**Complete Example:**

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com
VITE_AUTH0_AUDIENCE=http://imagetemplate
VITE_AUTH0_CLIENT_ID=MBTUAQuNYueeyavoj1Yqk2kq8nYQbGoN

# Backend API Configuration
VITE_API_URL=http://localhost:3000
```

## Auth0 Setup

### Step 1: Create Auth0 Account

1. Go to [auth0.com](https://auth0.com/signup)
2. Sign up for a free account
3. Create a new tenant (e.g., `dev-your-company`)

### Step 2: Create Single Page Application

For the frontend:

1. Go to **Applications** → **Create Application**
2. Name: "Image Template Frontend"
3. Type: **Single Page Web Applications**
4. Click **Create**

**Configure Application:**
- **Domain**: Copy this (e.g., `dev-abc123.us.auth0.com`)
- **Client ID**: Copy this
- **Allowed Callback URLs**: `http://localhost:5173/callback`
- **Allowed Logout URLs**: `http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5173`
- **Allowed Origins (CORS)**: `http://localhost:5173`

**Save Changes**

### Step 3: Create Machine to Machine Application

For the backend:

1. Go to **Applications** → **Create Application**
2. Name: "Image Template Backend"
3. Type: **Machine to Machine Applications**
4. Select: **Auth0 Management API**
5. Click **Authorize**

**Configure Application:**
- **Domain**: Should match SPA domain
- **Client ID**: Copy this (different from SPA)
- **Client Secret**: Copy this (keep secret!)

**Save Changes**

### Step 4: Create API

1. Go to **Applications** → **APIs** → **Create API**
2. **Name**: "Image Template API"
3. **Identifier**: `http://imagetemplate` (this is the audience)
4. **Signing Algorithm**: RS256
5. Click **Create**

### Step 5: Update Environment Variables

**Backend `.env`:**
```env
AUTH0_DOMAIN=dev-abc123.us.auth0.com          # From Step 2 or 3
AUTH0_AUDIENCE=http://imagetemplate            # From Step 4
AUTH0_M2M_DOMAIN=dev-abc123.us.auth0.com      # Same as AUTH0_DOMAIN
AUTH0_M2M_CLIENT_ID=xxx                        # From Step 3
AUTH0_M2M_CLIENT_SECRET=yyy                    # From Step 3
```

**Frontend `.env`:**
```env
VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com     # From Step 2
VITE_AUTH0_AUDIENCE=http://imagetemplate       # From Step 4
VITE_AUTH0_CLIENT_ID=zzz                       # From Step 2 (SPA)
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
   - Change Auth0 client secrets monthly
   - Update database passwords periodically

### Production

1. **Use environment-specific Auth0 tenants:**
   ```
   Development: dev-myapp.auth0.com
   Staging: staging-myapp.auth0.com
   Production: myapp.auth0.com
   ```

2. **Use strong passwords:**
   - Database: 32+ random characters
   - MinIO: 32+ random characters
   - Never use defaults in production

3. **Enable HTTPS:**
   - All Auth0 callbacks must use HTTPS
   - Update callback URLs:
     ```
     https://yourdomain.com/callback
     ```

4. **Use secrets management:**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault
   - Google Cloud Secret Manager

5. **Enable Auth0 security features:**
   - Multi-Factor Authentication (MFA)
   - Brute Force Protection
   - Suspicious IP Throttling
   - Breached Password Detection

6. **Restrict CORS:**
   ```typescript
   // Backend: Only allow your frontend domain
   app.enableCors({
     origin: 'https://yourdomain.com',
     credentials: true
   });
   ```

7. **Use environment variables in CI/CD:**
   ```yaml
   # GitHub Actions example
   env:
     AUTH0_DOMAIN: ${{ secrets.AUTH0_DOMAIN }}
     AUTH0_M2M_CLIENT_ID: ${{ secrets.AUTH0_M2M_CLIENT_ID }}
     AUTH0_M2M_CLIENT_SECRET: ${{ secrets.AUTH0_M2M_CLIENT_SECRET }}
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
console.log(import.meta.env.VITE_AUTH0_DOMAIN)
# Should print your Auth0 domain
```

### Auth0

Test authentication flow:
1. Start backend and frontend
2. Navigate to http://localhost:5173
3. Click "Log In"
4. Should redirect to Auth0
5. Log in with test account
6. Should redirect back to app
7. Check browser console for errors

## Common Mistakes

### ❌ Wrong: Including `https://` in domain

```env
AUTH0_DOMAIN=https://dev-abc123.us.auth0.com  # Wrong!
```

### ✅ Correct: Domain only

```env
AUTH0_DOMAIN=dev-abc123.us.auth0.com  # Correct
```

### ❌ Wrong: Using same client ID for frontend and backend

```env
# Backend .env
AUTH0_M2M_CLIENT_ID=abc123  # M2M client

# Frontend .env
VITE_AUTH0_CLIENT_ID=abc123  # Wrong! Should be SPA client
```

### ✅ Correct: Different client IDs

```env
# Backend .env
AUTH0_M2M_CLIENT_ID=m2m_abc123  # Machine to Machine

# Frontend .env
VITE_AUTH0_CLIENT_ID=spa_xyz789  # Single Page Application
```

### ❌ Wrong: Forgetting `VITE_` prefix in frontend

```env
AUTH0_DOMAIN=dev-abc123.us.auth0.com  # Won't work in frontend!
```

### ✅ Correct: Using `VITE_` prefix

```env
VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com  # Accessible in browser
```

---

For more information, see:
- [Setup Guide](../SETUP.md)
- [API Documentation](./API.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
