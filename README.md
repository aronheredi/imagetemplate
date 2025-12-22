# Image Template Editor 🎨

Create, customize, and manage stunning image templates with an intuitive drag-and-drop editor.  Perfect for social media graphics, marketing materials, and digital content creation.

![TypeScript](https://img.shields.io/badge/TypeScript-94.2%25-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-green)

## ✨ What Can You Do? 

- 🖼️ **Design Custom Templates**: Drag, drop, and arrange images on an interactive canvas
- 💾 **Save Your Work**: Store unlimited templates and reload them anytime
- 🔄 **Reuse & Remix**: Load existing templates and modify them to create new designs
- 🎯 **Simple Interface**: No design experience needed - just point, click, and create
- ⚡ **Instant Updates**: See your changes in real-time as you work
- 📱 **Works Everywhere**: Use on desktop, tablet, or mobile devices

## 🎥 Quick Start Video

[Coming Soon - Watch a 2-minute walkthrough]

## 🚀 Try It Out

### What You'll Need

- A computer with **Node.js 20 or newer** ([Download here](https://nodejs.org/))
- **Docker Desktop** for data storage ([Download here](https://www.docker.com/products/docker-desktop/))
- 15 minutes to set everything up

### Step 1: Download the Project

```bash
git clone https://github.com/aronheredi/imagetemplate.git
cd imagetemplate
```

### Step 2: Start the Storage Services

This command starts your local database and image storage:

```bash
docker-compose up -d
```

You should see messages indicating PostgreSQL and MinIO have started successfully.

### Step 3: Configure the Backend

Navigate to the backend folder: 

```bash
cd backend/template-backend
npm install
```

Create a file named `.env` in this folder with these settings:

```env
# Database Settings
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres

# Image Storage Settings
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USER=minioadmin
MINIO_PASSWORD=minioadmin
MINIO_USE_SSL=false
MINIO_BUCKET_NAME=images

# Server Settings
PORT=3000
```

Start the backend server:

```bash
npm run start:dev
```

✅ **Success!** You should see "Application is running on:  http://localhost:3000"

### Step 4: Launch the Editor

Open a new terminal window and navigate to the frontend folder:

```bash
cd frontend/template-frontend
npm install
npm run dev
```

✅ **You're Ready!** Open your browser to **http://localhost:5173**

## 📖 How to Use

### Creating Your First Template

1. **Open the Editor**: Navigate to http://localhost:5173 in your browser
2. **Add Images**: Click the upload button or drag images onto the canvas
3. **Arrange Elements**: Click and drag to position, resize handles to scale
4. **Add Text**: Use the text tool to add captions and labels
5. **Save Your Template**: Click "Save" and give your template a name

### Loading Existing Templates

1. Click the **Templates** button in the top menu
2. Browse your saved templates
3. Click any template to load it into the editor
4. Make changes and save as a new template or update the original

### Managing Your Templates

- **View All**: See thumbnails of all your saved templates
- **Search**: Find templates by name or description
- **Edit**: Click any template to modify it
- **Delete**: Remove templates you no longer need
- **Duplicate**: Create copies to experiment without losing your original

## 🔌 Using the API (For Developers)

If you're building an app or automation that needs to interact with templates programmatically, here's how: 

### Base URL
```
http://localhost:3000
```

### Get All Your Templates

```javascript
fetch('http://localhost:3000/templates')
  .then(response => response.json())
  .then(templates => {
    console.log('My templates:', templates);
  });
```

### Save a New Template

```javascript
const newTemplate = {
  name: "Summer Sale Banner",
  description: "Promotional banner for summer campaign",
  json: { /* Your design data */ }
};

fetch('http://localhost:3000/templates', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newTemplate)
})
  .then(response => response.json())
  .then(saved => console.log('Template saved:', saved));
```

### Load a Specific Template

```javascript
const templateId = 'your-template-id';

fetch(`http://localhost:3000/templates/${templateId}`)
  .then(response => response.json())
  .then(template => {
    console.log('Loaded template:', template);
  });
```

### Update an Existing Template

```javascript
const templateId = 'your-template-id';
const updates = {
  name: "Updated Banner Name",
  description: "New description"
};

fetch(`http://localhost:3000/templates/${templateId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updates)
})
  .then(response => response.json())
  .then(updated => console.log('Template updated:', updated));
```

### Delete a Template

```javascript
const templateId = 'your-template-id';

fetch(`http://localhost:3000/templates/${templateId}`, {
  method: 'DELETE'
})
  .then(() => console.log('Template deleted'));
```

### Complete Integration Example

```javascript
// Example: Auto-save every 30 seconds
class TemplateManager {
  constructor() {
    this.apiUrl = 'http://localhost:3000';
    this.currentTemplateId = null;
  }

  async saveTemplate(name, description, designData) {
    const template = { name, description, json: designData };
    
    if (this.currentTemplateId) {
      // Update existing
      const response = await fetch(
        `${this.apiUrl}/templates/${this.currentTemplateId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(template)
        }
      );
      return response.json();
    } else {
      // Create new
      const response = await fetch(`${this.apiUrl}/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template)
      });
      const saved = await response.json();
      this.currentTemplateId = saved.id;
      return saved;
    }
  }

  async loadTemplate(id) {
    const response = await fetch(`${this.apiUrl}/templates/${id}`);
    const template = await response.json();
    this.currentTemplateId = template.id;
    return template;
  }

  async getAllTemplates() {
    const response = await fetch(`${this.apiUrl}/templates`);
    return response.json();
  }
}

// Usage
const manager = new TemplateManager();

// Save your work
await manager.saveTemplate(
  "My Design",
  "A beautiful template",
  { /* canvas data */ }
);

// Load all templates
const templates = await manager.getAllTemplates();

// Load specific template
const template = await manager.loadTemplate('some-id');
```

## 🌐 Access Points

Once everything is running, you can access:

| What | Where | Use For |
|------|-------|------|
| **Template Editor** | http://localhost:5173 | Creating and editing templates |
| **Storage Console** | http://localhost:9001 | Managing uploaded images |
| **API Endpoint** | http://localhost:3000 | Programmatic access (developers) |

**Storage Console Login**:  
- Username: `minioadmin`
- Password: `minioadmin`

## ❓ Common Issues & Solutions

### "Port already in use" Error

Someone is already using that port.  Close other apps or run:

```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill
lsof -ti:5173 | xargs kill

# On Windows
npx kill-port 3000
npx kill-port 5173
```

### Editor Won't Load

1. Make sure the backend is running (Step 3)
2. Check that Docker containers are running: `docker-compose ps`
3. Verify you see green "✓" messages in your terminal

### Can't Save Templates

1. Check that Docker is running
2. Visit http://localhost:9001 - if it loads, storage is working
3. Look for error messages in your terminal

### Templates Disappeared

Your templates are stored in Docker volumes. If you ran `docker-compose down -v`, they were deleted.  Always use `docker-compose down` (without `-v`) to keep your data. 

### Images Won't Upload

1. Check your internet connection
2. Ensure images are under 10MB
3. Try JPG or PNG formats
4. Restart the backend server

## 💡 Tips & Tricks

- **Keyboard Shortcuts**: Delete key removes selected items, Ctrl/Cmd+Z for undo
- **Quick Resize**: Hold Shift while resizing to maintain proportions
- **Alignment**: Use the alignment tools for precise positioning
- **Color Picker**: Click any color tool to access the full spectrum
- **Layer Order**: Right-click elements to bring forward or send backward

## 🔒 Data & Privacy

- All your templates are stored **locally** on your computer
- No data is sent to external servers
- Images are stored in MinIO (your local storage)
- Database runs in Docker on your machine
- You have complete control over your data

## 🛠️ Built With

Modern, reliable technology: 

- **React** - Smooth, responsive interface
- **Fabric.js** - Professional canvas editing
- **NestJS** - Robust backend API
- **PostgreSQL** - Reliable data storage
- **MinIO** - S3-compatible image storage
- **TypeScript** - Type-safe, fewer bugs

## 📄 License

Free to use under the MIT License.  See [LICENSE](LICENSE) file for details.

## 🤝 Get Help

- **Found a bug?** [Open an issue](https://github.com/aronheredi/imagetemplate/issues)
- **Have a question?** [Start a discussion](https://github.com/aronheredi/imagetemplate/discussions)
- **Want to contribute?** Pull requests are welcome!

## 🎯 Roadmap

Coming soon:
- [ ] Template marketplace & sharing
- [ ] Collaborative editing
- [ ] Cloud sync option
- [ ] Pre-made template library

---

**Ready to create something amazing?** Follow the setup steps above and start designing!  🚀

*Built with ❤️ for creators, by creators*