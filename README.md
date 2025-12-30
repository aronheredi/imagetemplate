# Image Template Editor 🎨

Create, customize, and manage stunning image templates with an intuitive drag-and-drop editor. Perfect for social media graphics, marketing materials, and digital content creation.

![TypeScript](https://img.shields.io/badge/TypeScript-94.2%25-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-green)
![React](https://img.shields.io/badge/React-18-blue)
![NestJS](https://img.shields.io/badge/NestJS-11-red)

## ✨ Features

- 🖼️ **Interactive Canvas Editor**: Drag, drop, and arrange elements with Fabric.js
- 💾 **Persistent Storage**: PostgreSQL database with MinIO object storage
- 🔐 **Secure Authentication**: Auth0-powered OAuth 2.0 with JWT tokens
- 🎨 **Rich Editing Tools**: Text, images, shapes, and styling options
- ⚡ **Real-time Updates**: Instant preview of all changes
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔒 **Protected API**: All endpoints secured with JWT authentication
- 🚀 **Modern Stack**: TypeScript, React, NestJS, Docker

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ ([Download](https://nodejs.org/))
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop/))
- Auth0 Account ([Sign up](https://auth0.com/signup))

### Installation

```bash
# 1. Clone repository
git clone https://github.com/aronheredi/imagetemplate.git
cd imagetemplate

# 2. Start Docker services
docker-compose up -d

# 3. Setup backend
cd backend/template-backend
npm install
cp .env.example .env
# Edit .env with your Auth0 credentials
npm run start:dev

# 4. Setup frontend (new terminal)
cd frontend/template-frontend
npm install
cp .env.example .env
# Edit .env with your Auth0 credentials
npm run dev
```

**🎉 Ready!** Open http://localhost:5173

📖 **Detailed setup guide**: [SETUP.md](./SETUP.md)

## 📋 Quick Reference

| Service | URL | Access |
|---------|-----|--------|
| **Frontend** | http://localhost:5173 | Auth0 login |
| **Backend API** | http://localhost:3000 | JWT token |
| **MinIO Console** | http://localhost:9001 | minioadmin / minioadmin |
| **PostgreSQL** | localhost:5432 | postgres / password |

## 📚 Documentation

- **[Setup Guide](./SETUP.md)** - Quick setup instructions
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and tech stack
- **[Environment Variables](./docs/ENVIRONMENT.md)** - Configuration reference
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🎯 How to Use

### Creating Templates

1. Log in with Auth0
2. Click "New Template"
3. Add images, text, and shapes
4. Customize colors, fonts, and layout
5. Save your template

### Keyboard Shortcuts

- `Delete` - Remove selected element
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + C/V` - Copy/Paste
- `Arrow Keys` - Nudge element
- `Shift + Drag` - Maintain aspect ratio

## 🏗️ Technology Stack

**Frontend**: React 18, TypeScript, Vite, Fabric.js, Auth0 SDK, TanStack Query, Zustand, Tailwind CSS

**Backend**: NestJS, TypeScript, TypeORM, PostgreSQL, Passport JWT, MinIO, Sharp

**Infrastructure**: Docker, Docker Compose, Auth0

📖 **Detailed architecture**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 🔌 API Example

```javascript
// Get access token from Auth0
const token = await auth0.getTokenSilently();

// Fetch templates
const response = await fetch('http://localhost:3000/templates', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const templates = await response.json();
```

📖 **Full API documentation**: [docs/API.md](./docs/API.md)

## 🔒 Security

- **OAuth 2.0 / OpenID Connect** via Auth0
- **JWT token** authentication on all endpoints
- **User isolation** - templates are private per account
- **HTTPS required** for production deployments
- **Environment-based** configuration (no hardcoded secrets)

📖 **Security best practices**: [docs/ENVIRONMENT.md#security-best-practices](./docs/ENVIRONMENT.md#security-best-practices)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Code style**: ESLint + Prettier (configured)

## 🎯 Roadmap

### Coming Soon
- [ ] Collaborative editing (real-time)
- [ ] Template marketplace
- [ ] Export to PDF/SVG
- [ ] Version history
- [ ] Custom fonts
- [ ] Batch processing

### Completed
- [x] Auth0 authentication
- [x] JWT API security
- [x] Image upload/storage
- [x] Template CRUD operations
- [x] Canvas editor

## 📞 Support

- **Bug reports**: [Open an issue](https://github.com/aronheredi/imagetemplate/issues)
- **Questions**: [Start a discussion](https://github.com/aronheredi/imagetemplate/discussions)
- **Security issues**: Email privately (see SECURITY.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for creators**

[Get Started](./SETUP.md) • [Documentation](./docs/) • [API Reference](./docs/API.md)
