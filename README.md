# Community Explorer — Bryto Portfolio Project

A manifest-driven modular 3D neighborhood viewer with asset backoffice, built for Bryto’s “on-demand Google Street View publishing” and next-gen home buying experience.

## Overview

- **Customer app (Explorer)**: Community → Phase → Lot navigation, 3D viewer (Three.js/R3F), modular right-side panels, manifest-driven loading, 2D plat overlay.
- **Backoffice**: Asset upload, community listing, versioning/publish (simulated).
- **API**: REST endpoints for communities, manifest, assets, publish.

## Architecture

### Viewer Adapter Interface

The React shell talks to the 3D engine via an engine-agnostic adapter:

- `loadScene(sceneId)` — Load scene assets
- `setCamera(target)` — Fly camera to position/lookAt
- `highlightLot(lotId)` — Highlight lot geometry
- `dispose()` — Cleanup

Swapping Verge3D for Three.js/R3F only requires a new adapter implementation.

### Manifest-Driven Loading

Each community has a `manifest.json` describing:

- Scenes, phases, lots
- Assets (models, textures, panoramas) with LODs
- Dependencies and size estimates

Load strategy: shell first → low-res proxy → higher LOD as idle/network allows → prefetch next likely scene.

### Module System

Right-side panels (Lot details, Street tour, Nearby amenities) are pluggable modules registered in `PANEL_REGISTRY`. Adding a feature = add a panel component + registry entry.

### Performance Budgets (Targets)

- **Initial load**: &lt; 3s on 3G
- **Time to interactive**: &lt; 2s
- **Interaction latency**: &lt; 100ms
- **60fps** on mid-range mobile

## Stack

- **Explorer**: React 18, Vite 5, TypeScript, React Three Fiber, Zustand, Tailwind, React Router
- **Backoffice**: React, Vite, Tailwind
- **API**: Express, multer (uploads)
- **Shared**: Types, manifest schema

## Scripts

```bash
pnpm install
pnpm dev          # All apps + API
pnpm dev:explorer # Explorer only (port 3000)
pnpm dev:backoffice # Backoffice only (port 3001)
pnpm dev:api      # API only (port 4000)
pnpm build
pnpm test
pnpm typecheck
```

## API

- `GET /api/communities` — List communities
- `GET /api/communities/:id/manifest` — Get community manifest
- `POST /api/assets` — Upload asset (multipart/form-data, field `asset`)
- `POST /api/publish/:communityId` — Publish new manifest version

## Design Principles

- **Correctness**: Loading/error/empty/retry states, abort on unmount, deterministic formatting
- **Maintainability**: Clear separation (UI / data / domain), cohesive modules
- **Readability**: Consistent naming, small functions, comments explain why
- **Accessibility**: Semantic HTML, keyboard nav, skip link, focus management, prefers-reduced-motion
- **Type safety**: Typed API boundaries, no `any`, discriminated unions where helpful
