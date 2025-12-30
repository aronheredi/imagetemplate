# Troubleshooting Guide

This guide helps you resolve common issues when setting up and running the Image Template Editor.

## Table of Contents

- [Authentication Issues](#authentication-issues)
- [Port Conflicts](#port-conflicts)
- [Docker Issues](#docker-issues)
- [Frontend Issues](#frontend-issues)
- [Backend Issues](#backend-issues)
- [Data Loss Prevention](#data-loss-prevention)
- [Development Tips](#development-tips)

## Authentication Issues

### "Unauthorized" or 401 Errors

**Symptoms:**
- API requests return 401 Unauthorized
- Templates won't load or save
- Console shows authentication errors

**Solutions:**

1. **Verify Auth0 credentials match:**
   ```bash
   # Backend .env
   cat backend/template-backend/.env | grep AUTH0
   
   # Frontend .env
   cat frontend/template-frontend/.env | grep AUTH0
   ```
   - Ensure domains match your Auth0 tenant
   - Verify client IDs are correct
   - Check audience is exactly `http://imagetemplate`

2. **Check Auth0 dashboard configuration:**
   - Allowed Callback URLs: `http://localhost:5173/callback`
   - Allowed Logout URLs: `http://localhost:5173`
   - Allowed Web Origins: `http://localhost:5173`

3. **Clear browser data:**
   ```javascript
   // Open browser console and run:
   localStorage.clear();
   sessionStorage.clear();
   // Then refresh the page
   ```

4. **Check browser console:**
   - Look for CORS errors
   - Check for token validation errors
   - Verify API calls include Authorization header

5. **Restart services:**
   ```bash
   # Backend
   cd backend/template-backend
   npm run start:dev
   
   # Frontend
   cd frontend/template-frontend
   npm run dev
   ```

### Login Redirects to Wrong URL

**Symptoms:**
- After Auth0 login, redirected to 404 page
- Stuck in redirect loop
- "Invalid callback URL" error

**Solutions:**

1. **Verify callback URLs in Auth0:**
   - Must exactly match `http://localhost:5173/callback`
   - No trailing slashes
   - Check both SPA application settings

2. **Check environment variables:**
   ```env
   # frontend/.env
   VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com  # No https://
   VITE_AUTH0_CLIENT_ID=correct-spa-client-id
   ```

3. **Clear Auth0 session:**
   - Go to Auth0 dashboard
   - Check if user has active sessions
   - Log out from Auth0 completely

### Token Expired Errors

**Symptoms:**
- "Token expired" error messages
- Logged out unexpectedly
- API calls fail after some time

**Solutions:**

1. **Log out and log back in:**
   - Click logout button
   - Log in again to get fresh token

2. **Check token expiration settings:**
   - Auth0 dashboard → APIs → Image Template API
   - Check Token Expiration (default 24 hours)

3. **Enable token refresh (for production):**
   - The Auth0 SDK should auto-refresh tokens
   - Check browser console for refresh errors

## Port Conflicts

### "Port Already in Use" Error

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**On Mac/Linux:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 5432 (PostgreSQL)
lsof -ti:5432 | xargs kill -9

# Kill process on port 9000 (MinIO)
lsof -ti:9000 | xargs kill -9
```

**On Windows (PowerShell):**
```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Kill process on port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force
```

**Cross-platform (using npx):**
```bash
npx kill-port 3000
npx kill-port 5173
npx kill-port 5432
npx kill-port 9000
```

**Change default ports:**

Backend (`.env`):
```env
PORT=3001  # Change to any available port
```

Frontend (`vite.config.ts`):
```typescript
export default defineConfig({
  server: {
    port: 5174  // Change to any available port
  }
})
```

## Docker Issues

### Containers Won't Start

**Symptoms:**
```
ERROR: for postgres Cannot start service postgres: ...
```

**Solutions:**

1. **Check Docker is running:**
   ```bash
   docker --version
   docker info
   ```

2. **Check container status:**
   ```bash
   docker-compose ps
   ```

3. **View container logs:**
   ```bash
   docker-compose logs postgres
   docker-compose logs minio
   
   # Follow logs in real-time
   docker-compose logs -f
   ```

4. **Restart containers:**
   ```bash
   docker-compose restart
   
   # Or full restart
   docker-compose down
   docker-compose up -d
   ```

5. **Check for port conflicts:**
   ```bash
   # PostgreSQL (5432)
   lsof -i:5432
   
   # MinIO (9000, 9001)
   lsof -i:9000
   lsof -i:9001
   ```

6. **Remove and recreate containers:**
   ```bash
   # WARNING: This keeps data volumes
   docker-compose down
   docker-compose up -d
   
   # To rebuild images
   docker-compose up -d --build
   ```

### Database Connection Errors

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
Unable to connect to the database
```

**Solutions:**

1. **Verify PostgreSQL is running:**
   ```bash
   docker-compose ps postgres
   # Should show "Up"
   ```

2. **Check PostgreSQL logs:**
   ```bash
   docker-compose logs postgres
   ```

3. **Verify credentials match:**
   ```bash
   # Check docker-compose.yml
   grep -A 5 "postgres:" docker-compose.yml
   
   # Check backend .env
   grep "DB_" backend/template-backend/.env
   ```

4. **Test connection manually:**
   ```bash
   docker exec -it my_postgres_db psql -U postgres -d postgres
   # Should open PostgreSQL prompt
   ```

5. **Restart PostgreSQL:**
   ```bash
   docker-compose restart postgres
   ```

### MinIO Connection Errors

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:9000
MinIO client error
Image upload failed
```

**Solutions:**

1. **Verify MinIO is running:**
   ```bash
   docker-compose ps minio
   ```

2. **Access MinIO console:**
   - Go to http://localhost:9001
   - Login: minioadmin / minioadmin
   - Check if you can access the console

3. **Check MinIO logs:**
   ```bash
   docker-compose logs minio
   ```

4. **Verify bucket exists:**
   - Log into MinIO console
   - Check for "images" bucket
   - Create it manually if missing

5. **Check backend configuration:**
   ```bash
   grep "MINIO" backend/template-backend/.env
   ```

## Frontend Issues

### Editor Won't Load

**Symptoms:**
- Blank white screen
- "Cannot GET /" error
- JavaScript errors in console

**Solutions:**

1. **Check backend is running:**
   ```bash
   curl http://localhost:3000
   # Should return something (not connection refused)
   ```

2. **Check Docker containers:**
   ```bash
   docker-compose ps
   # Both postgres and minio should be "Up"
   ```

3. **Open browser DevTools:**
   - Press F12
   - Check Console tab for errors
   - Check Network tab for failed requests

4. **Verify CORS:**
   - Backend should allow `http://localhost:5173`
   - Check Network tab → Response Headers
   - Look for `Access-Control-Allow-Origin`

5. **Clear cache and rebuild:**
   ```bash
   cd frontend/template-frontend
   rm -rf node_modules/.vite
   rm -rf dist
   npm run dev
   ```

### Cannot Upload Images

**Symptoms:**
- Upload button doesn't work
- "Failed to upload image" error
- Images don't appear on canvas

**Solutions:**

1. **Check file size:**
   - Default limit is 10MB
   - Try smaller images first

2. **Check file format:**
   - Supported: JPG, PNG, GIF, WebP
   - Try different format

3. **Verify MinIO is accessible:**
   ```bash
   curl http://localhost:9001
   # Should return MinIO console HTML
   ```

4. **Check backend logs:**
   ```bash
   # Look for upload-related errors
   cd backend/template-backend
   # Check terminal output
   ```

5. **Test MinIO directly:**
   - Go to http://localhost:9001
   - Login and try uploading via console
   - If console upload works, issue is in backend

### Canvas Not Rendering

**Symptoms:**
- Canvas area is blank
- Objects don't appear
- "Fabric is not defined" error

**Solutions:**

1. **Check Fabric.js loaded:**
   ```javascript
   // In browser console
   console.log(typeof fabric);
   // Should log "object", not "undefined"
   ```

2. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

3. **Check for JavaScript errors:**
   - Open DevTools Console
   - Look for red error messages

4. **Reinstall dependencies:**
   ```bash
   cd frontend/template-frontend
   rm -rf node_modules
   npm install
   npm run dev
   ```

## Backend Issues

### Server Won't Start

**Symptoms:**
```
Error: Cannot find module '@nestjs/core'
Module build failed
Application failed to start
```

**Solutions:**

1. **Install dependencies:**
   ```bash
   cd backend/template-backend
   rm -rf node_modules
   npm install
   ```

2. **Check .env file exists:**
   ```bash
   ls -la .env
   # Should exist and not be empty
   ```

3. **Verify environment variables:**
   ```bash
   cat .env
   # Check all required variables are present
   ```

4. **Check TypeScript compilation:**
   ```bash
   npm run build
   # Look for compilation errors
   ```

5. **Check Node version:**
   ```bash
   node --version
   # Should be 20.19.0 or higher
   ```

### Database Migrations Failed

**Symptoms:**
```
QueryFailedError: relation "templates" does not exist
Migration failed
```

**Solutions:**

1. **Check PostgreSQL is running:**
   ```bash
   docker-compose ps postgres
   ```

2. **Run migrations manually:**
   ```bash
   cd backend/template-backend
   npm run typeorm migration:run
   ```

3. **Reset database (WARNING: Deletes all data):**
   ```bash
   # Stop backend
   # Then:
   docker-compose down
   docker volume rm imagetemplate_postgres_data
   docker-compose up -d
   # Start backend again - migrations will run automatically
   ```

## Data Loss Prevention

### Your Templates Disappeared

**Cause:** Ran `docker-compose down -v` which deletes volumes.

**Prevention:**

**Safe shutdown:**
```bash
docker-compose down  # Keeps volumes
```

**Unsafe shutdown:**
```bash
docker-compose down -v  # DELETES volumes - DO NOT USE
```

### Backup Your Data

**Backup PostgreSQL:**
```bash
# Create backup
docker exec my_postgres_db pg_dump -U postgres postgres > backup.sql

# Restore backup
docker exec -i my_postgres_db psql -U postgres postgres < backup.sql
```

**Backup MinIO:**
```bash
# Install MinIO client
brew install minio/stable/mc  # Mac
# or download from https://min.io/download

# Configure client
mc alias set local http://localhost:9000 minioadmin minioadmin

# Backup
mc mirror local/images ./minio-backup

# Restore
mc mirror ./minio-backup local/images
```

**Full Docker volume backup:**
```bash
# Create backup
docker run --rm -v imagetemplate_postgres_data:/data -v $(pwd):/backup \
  ubuntu tar czf /backup/postgres-backup.tar.gz /data

docker run --rm -v imagetemplate_minio_data:/data -v $(pwd):/backup \
  ubuntu tar czf /backup/minio-backup.tar.gz /data
```

## Development Tips

### Hot Reload Not Working

**Solutions:**

1. **Verify dev mode:**
   ```bash
   # Backend - should use start:dev
   npm run start:dev
   
   # Frontend - should use dev
   npm run dev
   ```

2. **Check file watchers (Linux):**
   ```bash
   # Increase limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

3. **Try restarting:**
   - Stop dev server (Ctrl+C)
   - Start again

### Environment Variables Not Updating

**Solutions:**

1. **Restart development server:**
   ```bash
   # Stop with Ctrl+C
   # Start again
   npm run dev  # or npm run start:dev
   ```

2. **Check variable names:**
   - Frontend: Must start with `VITE_`
   - Backend: No prefix required

3. **Clear build cache:**
   ```bash
   # Frontend
   rm -rf node_modules/.vite
   
   # Backend
   rm -rf dist
   ```

### TypeScript Errors

**Solutions:**

1. **Rebuild:**
   ```bash
   npm run build
   ```

2. **Check for type errors:**
   ```bash
   npx tsc --noEmit
   ```

3. **Update dependencies:**
   ```bash
   npm update
   ```

4. **Check tsconfig.json:**
   - Ensure paths are correct
   - Verify strict mode settings

## Getting More Help

If none of these solutions work:

1. **Check GitHub Issues:** [github.com/aronheredi/imagetemplate/issues](https://github.com/aronheredi/imagetemplate/issues)

2. **Start a Discussion:** [github.com/aronheredi/imagetemplate/discussions](https://github.com/aronheredi/imagetemplate/discussions)

3. **Provide Details:**
   - Operating system and version
   - Node.js version (`node --version`)
   - Docker version (`docker --version`)
   - Complete error messages
   - Steps to reproduce
   - Backend/frontend logs

---

For more information, see:
- [Setup Guide](../SETUP.md)
- [API Documentation](./API.md)
- [Architecture Documentation](./ARCHITECTURE.md)
