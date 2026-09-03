# niyata-living

**Niyata Living** — Contemporary Furniture Commerce Reference Experience (*"Thoughtful furniture for real Indian spaces"*).

A complete standalone furniture-brand website engineered from scratch using **Next.js 16.3.4 (Turbopack)**, **React 19**, **Tailwind CSS**, and **ESLint 10** with strict zero-warning / zero-error compliance.

---

## Overview

Niyata Living is a high-performance, design-led digital flagship demonstrating how a contemporary Indian furniture business can showcase a configurable product catalogue, tactile materials, urban room lookbooks, and an interactive space-planning consultation journey without heavy enterprise or backend database overhead.

### Key Highlights

- **Flagship Modular Sofa Configurator**: Interactive 3 layouts (2-Seat, 3-Seat, Chaise) × 3 fabrics (Oat, Moss, Clay) = 9 render combinations with live URL synchronization (`?layout=chaise&fabric=moss`).
- **Complete Product Catalogue**: 10 comprehensive furniture pieces + 1 object across Seating, Tables, Storage, Bedroom, and Selected Objects with real dimensions and INR pricing.
- **Urban Rooms Lookbook**: 5 authentic Indian urban proportions (Bandra 2BHK, Koramangala 3BHK, Ahmedabad Dining, Indiranagar Bedroom, Surat Study) with space-planning notes.
- **Customer Space Portal (`/account`)**: Local moodboard / wishlist, apartment space footprint profiler, and consultation brief history backed by `localStorage` via React 19 `useSyncExternalStore`.
- **Studio Operations Admin Panel (`/admin`)**: Interactive catalogue manager, pricing viewer, consultation leads inbox, and 9-render sofa matrix inspector.
- **Client-Side Consultation Wizard (`/design-service`)**: Multi-step apartment dimension, style, and priority generator (zero external network requests).
- **Materials & Craftsmanship Guide (`/materials`)**: Macro timber grains, honed sandstones, and textiles with zero greenwashing or unpadded claims.
- **Local Cart Preview (`/cart-preview` & `CartDrawer`)**: Hydration-safe browser cart with positive integer INR calculations.
- **Explore This Build**: Accessible floating quick navigator with crawlable links to all core journeys and back to [Webshastraa](https://www.webshastraa.in/).

---

## Tech Stack

- **Framework**: [Next.js 16.3.4](https://nextjs.org/) (App Router, Turbopack, Server-Side Generation)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [ESLint 10](https://eslint.org/) (`next/core-web-vitals`, `next/typescript`) with strict zero warnings
- **Language**: TypeScript 5.8

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 3. Verify Linter (0 Warnings, 0 Errors)

```bash
npm run lint
```

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## Reference Build Notice

This is an internal furniture-commerce reference architecture. Products, materials, prices, and availability shown are illustrative. Built by [Webshastraa](https://www.webshastraa.in/).
