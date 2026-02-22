# OrbitAtlas Community Explorer

A manifest-driven modular 3D neighborhood viewer with asset backoffice, built for on-demand Google Street View–style publishing and next-gen home buying.

![Community Explorer](apps/explorer/public/assets/Community%20Explorer.png)

## Live demos

- **[Explorer](https://orbit-atlas-explorer.vercel.app/)** — Community Explorer (3D viewer, street tour)
- **[Backoffice](https://orbit-atlas-backoffice.vercel.app/)** — Asset backoffice

---

## Overview

OrbitAtlas is a pnpm monorepo with three deployable apps and shared types:

| App | Purpose |
|-----|--------|
| **Explorer** | Customer-facing community viewer: browse communities → phases → lots, view 3D scenes and 360° street-level panoramas, open side panels for lot details and amenities. |
| **Backoffice** | Admin UI: list communities (from API), upload assets (GLB, textures, panoramas). |
| **API** | REST backend: communities, manifest, asset upload, publish; serves uploaded files. |

---

## Functionality

### Explorer (customer app)

- **Navigation** — Community picker → Phase picker → Lot picker (manifest-driven).
- **3D viewer** — Three.js via React Three Fiber: orbit controls, placeholder scene (manifest-driven loading hook in place).
- **Street View (360° panoramas)** — Equirectangular panorama viewer with drag-to-look and damping; panorama nodes per lot with “Walk to” links between connected nodes.
- **Side panels** — Lot details, Street tour (panorama node list + view), Nearby amenities; tab bar to open/close.
- **2D plat overlay** — SVG overlay of phase/lot boundaries; click lot to select.
- **Loading** — Manifest loader with progress HUD; respects `prefers-reduced-motion`.
- **Accessibility** — Skip link, semantic HTML, focus management, reduced-motion support.

### Backoffice

- **Communities** — Fetches and lists communities from the API.
- **Assets** — Upload assets (GLB, GLTF, JPG, PNG) via multipart form; displays upload result.

### API

- **Communities** — List communities; get community manifest by ID.
- **Assets** — Upload asset (multipart, field `asset`); serve uploaded files under `/uploads`.
- **Publish** — Simulated publish (returns new version).
- **Health** — `GET /api/health` for uptime checks.

---

## Tech stack

| Layer | Technologies |
|-------|--------------|
| **Explorer** | React 18, Vite 5, TypeScript, React Three Fiber, Three.js, @react-three/drei, Zustand, React Router, Tailwind CSS, Vitest, Turf.js (geo) |
| **Backoffice** | React 18, Vite 5, TypeScript, React Router, Zustand, Tailwind CSS, Vitest |
| **API** | Node 18+, Express, CORS, Multer (uploads), TypeScript, tsx (dev) |
| **Shared** | TypeScript (manifest + API types), ESM, no runtime deps |
| **Monorepo** | pnpm 9, workspace packages |

---

## Project structure

```
OrbitAtlas/
├── apps/
│   ├── explorer/     # Customer app (Vite, port 3000)
│   └── backoffice/   # Admin app (Vite, port 3001)
├── packages/
│   ├── api/          # Express API (port 4000)
│   └── shared/       # @community-explorer/shared types
├── package.json
└── pnpm-workspace.yaml
```

---

## Architecture

### Viewer adapter

The Explorer talks to the 3D engine via an adapter interface: `loadScene`, `setCamera`, `highlightLot`, `dispose`. The current implementation is Three.js/R3F; swapping to another engine (e.g. Verge3D) only requires a new adapter.

### Manifest

Each community has a manifest (from `GET /api/communities/:id/manifest`) describing:

- **Phases & lots** — Names, addresses, sqft, price, status, optional geo boundaries.
- **Scenes** — Phase-scoped assets (models, textures, panoramas) with optional LODs.
- **Pano nodes** — 360° panorama nodes: id, position, image URL, neighbor links, optional lotId. Lots reference nodes via `panoNodeIds`.

Load flow: shell first → manifest → progressive assets (loader hook drives loading state).

### Panel registry

Right-side panels (Lot details, Street tour, Nearby amenities) are registered in `PANEL_REGISTRY`. Adding a panel = new component + registry entry.

### Performance targets

- Initial load &lt; 3s on 3G
- Time to interactive &lt; 2s
- Interaction latency &lt; 100ms
- 60fps on mid-range mobile

---

## Scripts

```bash
pnpm install
pnpm dev              # All apps + API in parallel
pnpm dev:explorer     # Explorer only (http://localhost:3000)
pnpm dev:backoffice   # Backoffice only (http://localhost:3001)
pnpm dev:api          # API only (http://localhost:4000)
pnpm build            # Build all
pnpm build:explorer
pnpm build:backoffice
pnpm build:api
pnpm test             # Run tests in all packages
pnpm typecheck        # Typecheck all
pnpm lint             # Lint all
```

---

## API reference

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/communities` | List communities |
| GET | `/api/communities/:id/manifest` | Get community manifest |
| POST | `/api/assets` | Upload asset (multipart, field `asset`) |
| POST | `/api/publish/:communityId` | Publish new manifest version (simulated) |
| — | `/uploads/*` | Static files for uploaded assets |

---

## Deployment

- **Explorer & Backoffice** — Vercel. Set `VITE_API_BASE` to the API origin (e.g. `https://orbitatlas.onrender.com`); the client appends `/api` if needed. Redeploy after changing env.
- **API** — Render (or any Node host). Uses `process.env.PORT`; build: `pnpm install && pnpm --filter api run build`; start: `node packages/api/dist/index.js`.

---

## Design principles

- **Correctness** — Loading, error, empty, and retry states; abort on unmount; deterministic formatting.
- **Maintainability** — Clear separation (UI / data / domain), cohesive modules.
- **Readability** — Consistent naming, small functions, comments explain why.
- **Accessibility** — Semantic HTML, keyboard nav, skip link, focus management, `prefers-reduced-motion`.
- **Type safety** — Typed API boundaries, no `any`, discriminated unions where helpful.
