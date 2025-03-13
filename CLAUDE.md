# CLAUDE.md - Ikigai-duolingo Codebase Reference

## Build & Development Commands
- Installation: `npm install` or `pnpm install` 
- Development: `npm run dev` (runs on http://localhost:3000)
- Build: `npm run build` 
- Start: `npm run start` (runs production build)
- Lint: `npm run lint`

## Code Style Guidelines
- **Framework**: Next.js with TypeScript & React 18
- **CSS**: Tailwind CSS for styling (see tailwind.config.ts)
- **Imports**: Use type imports with inline style (`import type { X } from 'y'`)
- **State Management**: Zustand with slice pattern (see `useBoundStore.ts`)
- **Components**: Use PascalCase for component names, functions for components
- **Types**: Strong TypeScript typing, prefer type annotations over inference
- **Formatting**: Prettier for code formatting with tailwind plugin
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error Handling**: Use React Error Boundaries, proper try/catch
- **Path Aliases**: Use `~/` alias for src directory imports