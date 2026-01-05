# Image Template Editor 🎨

Create, customize, and manage stunning image templates with an intuitive drag-and-drop editor. Perfect for social media graphics, marketing materials, and digital content creation.

![TypeScript](https://img.shields.io/badge/TypeScript-94.2%25-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-green)
![React](https://img.shields.io/badge/React-18-blue)
![NestJS](https://img.shields.io/badge/NestJS-11-red)

## ✨ Features

- 🖼️ **Interactive Canvas Editor**: Drag, drop, and arrange elements with Fabric.js
- 💾 **Persistent Storage**: PostgreSQL database with MinIO object storage
- 🔐 **Secure Authentication**: Email/password login with JWT tokens (users stored in PostgreSQL)
- 🎨 **Rich Editing Tools**: Text, images, shapes, and styling options
- ⚡ **Real-time Updates**: Instant preview of all changes
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔒 **Protected API**: All endpoints secured with JWT authentication
- 🚀 **Modern Stack**: TypeScript, React, NestJS, Docker

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ ([Download](https://nodejs.org/))
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop/))

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
# Configure DB/MinIO/JWT settings in .env if needed
npm run start:dev

# 4. Setup frontend (new terminal)
cd frontend/template-frontend
npm install
cp .env.example .env
# Configure API URL in .env if needed
npm run dev
```

**🎉 Ready!** Open http://localhost:5173

[Detailed setup guide](./SETUP.md)

## 📋 Quick Reference

| Service | URL | Access |
|---------|-----|--------|
| **Frontend** | http://localhost:5173 | Email/password login |
| **Backend API** | http://localhost:3000 | JWT token |
| **MinIO Console** | http://localhost:9001 | minioadmin / minioadmin |
| **PostgreSQL** | localhost:5432 | postgres / password |

## 📚 Documentation

- **[Setup Guide](./SETUP.md)** - Setup instructions
- **[API Documentation](./docs/API.md)** - API reference
- **[Environment Variables](./docs/ENVIRONMENT.md)** - Configuration reference
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🎯 Usage

### Creating Templates

1. Register or log in
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

## 🔌 API Example

```javascript
// Log in to get a JWT access token
const { access_token } = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'you@example.com', password: 'password' })
}).then(r => r.json());

// Fetch templates
const response = await fetch('http://localhost:3000/templates', {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  }
});

const templates = await response.json();
```

[Full API documentation](./docs/API.md)

## 🔒 Security

- JWT token authentication on all endpoints
- User isolation - templates are private per account
- HTTPS for production deployments
- Environment-based configuration

[Security details](./docs/ENVIRONMENT.md#security-best-practices)

## 🤝 Contributing

Contributions are welcome:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Code style: ESLint + Prettier (configured)

## 📞 Support

- Bug reports: [Open an issue](https://github.com/aronheredi/imagetemplate/issues)
- Questions: [Start a discussion](https://github.com/aronheredi/imagetemplate/discussions)
- Security issues: Email privately (see SECURITY.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

[Get Started](./SETUP.md) • [Documentation](./docs/) • [API Reference](./docs/API.md)
