# API Documentation

The backend API is built with NestJS and secured with Auth0 JWT authentication. All endpoints (except health checks) require a valid JWT token in the Authorization header.

## Table of Contents

- [Authentication](#authentication)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [Templates](#templates)
  - [Images](#images)
  - [Authentication](#authentication-endpoints)
- [JavaScript Integration](#javascript-integration-example)
- [Error Responses](#error-responses)

## Authentication

All API requests must include a Bearer token in the Authorization header:

```javascript
const token = await auth0Client.getTokenSilently();

fetch('http://localhost:3000/templates', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

## Base URL

```
http://localhost:3000
```

For production, replace with your production API URL.

## Endpoints

### Templates

#### Get All Templates

Retrieves all templates for the authenticated user.

```http
GET /templates
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Summer Sale Banner",
    "description": "Promotional banner for summer campaign",
    "json": { /* Design data */ },
    "createdAt": "2025-12-30T10:00:00Z",
    "updatedAt": "2025-12-30T10:00:00Z"
  }
]
```

#### Get Single Template

Retrieves a specific template by ID.

```http
GET /templates/:id
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Summer Sale Banner",
  "description": "Promotional banner for summer campaign",
  "json": { /* Design data */ },
  "createdAt": "2025-12-30T10:00:00Z",
  "updatedAt": "2025-12-30T10:00:00Z"
}
```

#### Create Template

Creates a new template.

```http
POST /templates
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Summer Sale Banner",
  "description": "Promotional banner for summer campaign",
  "json": { /* Your design data */ }
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Summer Sale Banner",
  "description": "Promotional banner for summer campaign",
  "json": { /* Design data */ },
  "createdAt": "2025-12-30T10:00:00Z",
  "updatedAt": "2025-12-30T10:00:00Z"
}
```

#### Update Template

Updates an existing template.

```http
PATCH /templates/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "json": { /* Updated design data */ }
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Updated Name",
  "description": "Updated description",
  "json": { /* Updated design data */ },
  "createdAt": "2025-12-30T10:00:00Z",
  "updatedAt": "2025-12-30T11:00:00Z"
}
```

#### Delete Template

Deletes a template permanently.

```http
DELETE /templates/:id
Authorization: Bearer {token}
```

**Response:**
```
204 No Content
```

### Images

#### Upload Image

Uploads an image file to MinIO storage.

```http
POST /files/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary data]
```

**Example using FormData:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:3000/files/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

**Response:**
```json
{
  "filename": "abc123-image.jpg",
  "url": "http://localhost:9000/images/abc123-image.jpg"
}
```

#### Get Image

Retrieves an uploaded image.

```http
GET /files/:filename
Authorization: Bearer {token}
```

**Response:**
Binary image data with appropriate Content-Type header.

### Authentication Endpoints

#### Exchange Code for Token

Exchanges an authorization code for access tokens (used internally by the frontend).

```http
POST /auth/callback
Content-Type: application/json

{
  "code": "authorization_code",
  "redirect_uri": "http://localhost:5173/callback"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "v1.abc123...",
  "expires_in": 86400
}
```

## JavaScript Integration Example

Here's a complete example of how to integrate with the API:

```javascript
import { Auth0Client } from '@auth0/auth0-spa-js';

// Initialize Auth0
const auth0 = new Auth0Client({
  domain: 'your-tenant.us.auth0.com',
  clientId: 'your-client-id',
  authorizationParams: {
    audience: 'http://imagetemplate',
    redirect_uri: window.location.origin
  }
});

// Authenticated API helper
async function apiCall(endpoint, options = {}) {
  const token = await auth0.getTokenSilently();
  
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  return response.json();
}

// Template Management Class
class TemplateAPI {
  // Get all templates
  async getAll() {
    return apiCall('/templates');
  }
  
  // Get single template
  async getById(id) {
    return apiCall(`/templates/${id}`);
  }
  
  // Create new template
  async create(templateData) {
    return apiCall('/templates', {
      method: 'POST',
      body: JSON.stringify(templateData)
    });
  }
  
  // Update template
  async update(id, updates) {
    return apiCall(`/templates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }
  
  // Delete template
  async delete(id) {
    return apiCall(`/templates/${id}`, {
      method: 'DELETE'
    });
  }
  
  // Upload image
  async uploadImage(file) {
    const token = await auth0.getTokenSilently();
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('http://localhost:3000/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    return response.json();
  }
}

// Usage
const templateAPI = new TemplateAPI();

// Get all templates
const templates = await templateAPI.getAll();
console.log('My templates:', templates);

// Create a new template
const newTemplate = await templateAPI.create({
  name: 'My New Template',
  description: 'A beautiful design',
  json: { /* canvas data */ }
});

// Update a template
const updated = await templateAPI.update(newTemplate.id, {
  name: 'Updated Template Name'
});

// Upload an image
const imageInput = document.querySelector('input[type="file"]');
const uploaded = await templateAPI.uploadImage(imageInput.files[0]);
console.log('Image URL:', uploaded.url);

// Delete a template
await templateAPI.delete(newTemplate.id);
```

## Error Responses

The API returns standard HTTP status codes:

| Status Code | Meaning | Description |
|-------------|---------|-------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created successfully |
| `204` | No Content | Request successful, no content to return |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Missing or invalid authentication token |
| `403` | Forbidden | Authenticated but not authorized for this resource |
| `404` | Not Found | Resource not found |
| `500` | Internal Server Error | Server error occurred |

### Error Response Format

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid token"
}
```

### Common Error Scenarios

**401 Unauthorized**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```
- Missing Authorization header
- Invalid or expired JWT token
- Token signed with wrong key

**404 Not Found**
```json
{
  "statusCode": 404,
  "message": "Template not found"
}
```
- Requested template doesn't exist
- User doesn't have access to the template

**400 Bad Request**
```json
{
  "statusCode": 400,
  "message": ["name should not be empty"],
  "error": "Bad Request"
}
```
- Missing required fields
- Invalid data format
- Validation errors

## Rate Limiting

Currently, there is no rate limiting implemented. For production deployments, consider implementing rate limiting to prevent abuse.

## CORS

The API allows cross-origin requests from `http://localhost:5173` in development. Update CORS settings in production to match your frontend domain.

## Pagination

Currently, all templates are returned in a single response. Future versions may implement pagination for better performance with large datasets.

---

For more information, see:
- [Setup Guide](./SETUP.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
