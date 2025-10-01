# AI Coding Agent Instructions

## Project Overview
This is a modern React TypeScript template with Vite, Tailwind CSS, React Router, and comprehensive ESLint/Prettier setup. The project structure follows a clean frontend-only architecture optimized for rapid development.

## Architecture & Structure
- **Frontend**: Located in `frontend/template-frontend/` 
- **Build Tool**: Vite 7.1.4 with SWC React plugin for fast compilation
- **Styling**: Tailwind CSS 4.1.12 with Vite plugin integration
- **Routing**: React Router DOM 7.9.3 with modern data router pattern
- **Canvas**: Fabric.js 6.7.1 for interactive graphics and image manipulation
- **Type System**: TypeScript 5.8.3 with strict configuration

## Development Workflow

### Prerequisites & Node Version
- **Critical**: Node.js 20.19+ or 22.12+ required (Vite 7.x dependency)
- Use `engines.node` in package.json as the source of truth

### Key Commands
```bash
cd frontend/template-frontend
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # TypeScript build + Vite production build
npm run lint     # ESLint with multiple plugins
npm run preview  # Preview production build
```

### Dependency Management
- **Version Alignment**: When updating Vite, ensure `@types/node` meets peer dependency requirements
- **Package Manager**: Supports npm, yarn, pnpm (examples in README show pnpm preference)

## Code Conventions

### Import Patterns
- Use path alias `@/` for src imports (configured in `vite.config.ts`)
- Public assets referenced from `/` (e.g., `/react.svg`)
- Barrel exports in `index.ts` files for clean imports (`@/components`, `@/pages`)

### Component Structure
- Functional components with named exports
- React Router data router pattern with `createBrowserRouter`
- Layout component with `<Outlet />` for nested routing
- Navigation component with active state styling

### Routing Architecture
- **Router Setup**: `src/router.tsx` - centralized route configuration
- **Layout Pattern**: Shared layout with navigation header and main content area
- **Page Components**: Located in `src/pages/` with individual route handlers
- **Navigation**: Fixed header with active state indicators using `useLocation`

### Styling Approach
- **Tailwind Configuration**: Uses v4.x with Vite plugin
- **Dark Theme**: Default gray-900 background with white text
- **Responsive Design**: Mobile-first with Flexbox layouts
- **Animations**: CSS transitions and transforms (20s React logo spin)

## Configuration Files
- `vite.config.ts`: Plugins (React SWC, Tailwind, ESLint), path aliases
- `eslint.config.mjs`: Multiple ESLint plugins including React hooks, stylistic rules
- `prettier.config.mjs`: Tailwind plugin integration
- `tsconfig.json`: Strict TypeScript with app/node separation

## Common Patterns
- **Asset Handling**: SVG logos in public folder, direct path references
- **State Management**: React useState for component-level state
- **Styling**: Utility classes with hover effects and transitions
- **Build Process**: Two-step build (TypeScript check + Vite bundle)

## Integration Points
- **Linting**: ESLint runs on build and development
- **Type Checking**: Separate TypeScript compilation before Vite build
- **Hot Reload**: Vite dev server with React Fast Refresh via SWC