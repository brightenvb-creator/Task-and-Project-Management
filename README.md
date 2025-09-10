# Task-and-Project-Management

## Overview

Vite + React + TypeScript app for managing tasks and projects. Includes TailwindCSS and basic views (dashboard, kanban, calendar, analytics).

## Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm (comes with Node)

## Getting Started

1. Install dependencies:
   - Project is in `project/` subfolder.
   - From repo root, run:
     ```bash
     cd project
     npm ci
     ```

2. Start dev server:
   ```bash
   npm run dev
   ```
   - Local: http://localhost:5173/
   - For LAN: `npm run dev -- --host`

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – build production bundle
- `npm run preview` – preview build locally
- `npm run lint` – run eslint

## Project Structure

```
project/
  src/
    components/
    context/
    data/
    types/
    App.tsx
    main.tsx
  index.html
  package.json
  vite.config.ts
  tailwind.config.js
```

## CI/CD

This repo includes a GitHub Actions workflow that installs dependencies, lints, and builds on push/PR. See `.github/workflows/ci.yml`.

## License

MIT