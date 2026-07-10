---
name: hajaina-architecture
description: Use when working on Haj'Aina project structure, routing, APIs, data models, component organization, or any architectural decision. Covers Next.js App Router, tech stack, file conventions, and data layer. Use ONLY for the hajaina-fashion-website project.
---

# Haj'Aina — Architecture

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **React**: 19
- **Styling**: Tailwind CSS 3.4 + `tailwindcss-animate` + CSS variables (shadcn/ui pattern)
- **UI Components**: shadcn/ui (Radix UI primitives + `class-variance-authority` + `clsx` + `tailwind-merge`)
- **Animations**: GSAP 3.13 + ScrollTrigger + `@gsap/react`
- **Fonts**: Geist Sans/Mono (via `geist` package) + Meliora Script (custom `@font-face`) + Times New Roman (serif
  headings)
- **Icons**: `lucide-react`
- **Forms**: `react-hook-form` + `zod` + `@hookform/resolvers`
- **Charts**: `recharts`
- **3D Models**: `@google/model-viewer` (GLB files)
- **Maps**: `maplibre-gl`
- **AI**: OpenRouter (Gemini 2.5 Flash) for chat/image gen + Decart AI for image-to-image editing
- **PDF**: `@react-pdf/renderer`
- **QR Codes**: `qrcode` + `qrcode.react`
- **Webcam**: `react-webcam`
- **Theming**: `next-themes`
- **Toasts**: `sonner`
- **Drawer**: `vaul`
- **Command palette**: `cmdk`
- **Date picker**: `react-day-picker` + `date-fns`
- **Carousel**: `embla-carousel-react`
- **Type animation**: `typed.js`

## Project Structure

```
hajaina-fashion-website/
├── app/
│   ├── layout.tsx              # Root layout (Geist fonts, metadata)
│   ├── page.tsx                # Homepage (hero, collections, designers, etc.)
│   ├── globals.css             # Global CSS (tailwind, custom animations, scrollbar)
│   ├── fonts.css               # Custom @font-face (Meliora Script)
│   ├── api/
│   │   ├── chat/route.ts       # POST → OpenRouter (Gemini) for AI chat/image
│   │   └── live-edit/route.ts  # POST → Decart AI for image-to-image
│   ├── (website)/              # Public pages (route group, no layout wrapper)
│   │   ├── collections/        # Collection listing + [id] detail
│   │   ├── stylistes/          # Designers listing + [id] detail
│   │   ├── ethique/            # Foundation/ethics page
│   │   ├── recyclage/          # Recycling program
│   │   ├── magazine/           # Blog articles
│   │   ├── login/              # Auth page
│   │   ├── depot-vetements/    # Clothing deposit
│   │   └── mes-commandes/      # Order tracking (stub)
│   └── (dashboard)/            # Authenticated pages (route group)
│       ├── dashboard/          # User dashboard (grid of feature cards)
│       ├── wardrobe/           # Wardrobe manager (gallery, upload, planner, AI)
│       ├── shop/               # Shop CRUD + [id] detail
│       ├── blog/               # Blog management
│       ├── chat/               # AI style advisor
│       ├── collaborations/     # Collaboration projects + create
│       ├── expositions/        # Online exhibitions + [id]
│       ├── shopping-cart/      # Cart
│       ├── notifications/      # Notifications
│       ├── user-profile/       # Profile
│       ├── settings/           # Account settings
│       └── studio/             # Analytics (stub)
├── animations/
│   ├── config.ts               # GSAP + ScrollTrigger registration
│   ├── constants.ts            # DEFAULT_NAMESPACES list
│   ├── hook.ts                 # useAnimationHook (dynamic import timelines)
│   ├── index.ts                # useAnimation public API
│   ├── utils.ts                # loadTimelines (dynamic import by namespace)
│   └── timelines/              # One file per animation section
│       ├── header.ts           # Header slide-down (conditional on pathname)
│       ├── heroSection.ts      # Logo → image → title → text → button sequence
│       ├── collectionSection.ts
│       ├── designersSection.ts
│       ├── collaborationsSection.ts
│       ├── ethiqueSection.ts
│       ├── recyclageSection.ts
│       ├── newsletterSection.ts
│       └── qrcodeSection.ts
├── components/
│   ├── header.tsx              # HeaderDesktop + HeaderMobile + default Header
│   ├── footer.tsx              # Footer (black, 4-column grid)
│   ├── custom-cursor.tsx       # GSAP-powered custom cursor (mix-blend-difference)
│   ├── Assistant.tsx           # Floating chat button → ImageGenerator
│   ├── image-generator.tsx     # AI image generation form (→ /api/chat)
│   ├── qr-code-generator.tsx   # QR code component
│   ├── theme-provider.tsx      # next-themes provider wrapper
│   ├── ui/                     # shadcn/ui components (~50 components)
│   │   ├── button.tsx          # CVA variants: default/destructive/outline/secondary/ghost/link
│   │   ├── card.tsx, badge.tsx, input.tsx, dialog.tsx, ...
│   │   ├── manaja-button.tsx   # Custom "Manaja" bid button (toggle state)
│   │   ├── custom-dropdown.tsx # Custom Dropdown/DropdownItem/DropdownSeparator
│   │   ├── custom-map.tsx      # MapLibre wrapper
│   │   ├── map.tsx             # Map component
│   │   ├── modal.tsx           # Modal component
│   │   ├── social-button.tsx   # Social login button
│   │   └── ...
│   └── wardrobe/               # Wardrobe feature components
│       ├── wardrobe-gallery.tsx
│       ├── wardrobe-upload.tsx # Drag-and-drop upload (min 4 photos for 3D)
│       ├── outfit-planner.tsx  # Calendar-based outfit planner
│       └── ai-analysis.tsx     # AI wardrobe insights (color, sustainability, etc.)
├── data/                       # Static JSON data files
│   ├── collections.json
│   ├── stylistes.json
│   ├── fondation-data.json     # Foundation values + impacts
│   ├── collaboration-data.json
│   └── articles.json
├── hooks/
│   ├── use-chat.tsx            # Chat hook
│   └── use-mobile.tsx          # Mobile detection
├── lib/
│   └── utils.ts                # cn() helper (clsx + tailwind-merge)
├── types/
│   ├── global.d.ts             # Global type declarations
│   └── model-viewer.d.ts       # Model Viewer type declarations
└── tailwind.config.ts          # Tailwind v3 config with shadcn/ui theme
```

## Routing Convention

- **Route Groups** `(website)` and `(dashboard)` separate public vs authenticated areas
- No shared layout file inside route groups — each page imports `<Header />` and `<Footer />` independently
- Dynamic routes use `[id]` pattern (e.g., `collections/[id]/page.tsx`)
- Page wrapper pattern: `<div className="min-h-screen bg-white text-black pt-20">` (pt-20 for fixed header)

## Authentication

- **localStorage-based**: `isLoggedIn`, `userRole`, `userEmail`
- No server-side auth — client reads localStorage, redirects to `/login` if not logged in
- Header conditionally shows auth buttons vs login link

## API Routes

### `POST /api/chat`

- Proxies to OpenRouter (`google/gemini-2.5-flash-image-preview`)
- Accepts `{ prompt, imageUrl? }`
- Returns OpenRouter response (includes `choices[0].message.images`)
- Uses `OPENROUTER_API_KEY` env var

### `POST /api/live-edit`

- Proxies to Decart AI (`lucy-pro-i2i`)
- Accepts FormData: `prompt`, `resolution`, `data` (image blob)
- Returns base64-encoded image
- Uses `DECART_API_KEY` env var

## Data Layer

- Static JSON files in `data/` directory imported directly in components
- No database — all data is client-side or hardcoded
- Wardrobe data is React state (not persisted)

## Key Conventions

- All page components are `"use client"` (client-side rendering)
- Import alias: `@/` maps to project root
- Component naming: PascalCase files, default exports for pages
- shadcn/ui components live in `components/ui/` — use `cn()` from `@/lib/utils` for class merging
- Currency: Ariary (Ar) — Malagasy franc
- Language: French (fr-FR) for UI copy
