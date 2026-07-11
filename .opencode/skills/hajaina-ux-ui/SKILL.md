---
name: hajaina-ux-ui
description: Use when working on animations, interactions, page layouts, transitions, custom cursor, GSAP timelines, scroll effects, marquee, or any UX/UI behavior in the Haj'Aina project. Covers the GSAP animation system, component interaction patterns, responsive layouts, and the custom cursor. Use ONLY for the hajaina-fashion-website project.
---

# Haj'Aina — UX/UI Patterns

## Animation System (GSAP)

### Architecture

The animation system is modular and namespace-based:

1. **`animations/config.ts`** — Registers GSAP + ScrollTrigger + useGSAP
2. **`animations/constants.ts`** — Lists all default namespaces (section names)
3. **`animations/utils.ts`** — `loadTimelines()` dynamically imports `./timelines/{namespace}`
4. **`animations/hook.ts`** — `useAnimationHook()` loads timelines based on provided namespaces
5. **`animations/index.ts`** — `useAnimation(namespaces)` public API, wraps in `useGSAP`

### Usage Pattern

Every page/component that needs animations calls:

```tsx
import { useAnimation } from "@/animations";

export default function MyPage() {
  useAnimation(["heroSection", "collectionSection"]);
  // ...
}
```

Each namespace maps to a file in `animations/timelines/{namespace}.ts` that exports a default function. The function
receives `pathname` (optional) and creates GSAP animations.

### Timeline Files

| Namespace               | File                       | Trigger                 | Animation                                                                                                               |
|-------------------------|----------------------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `header`                | `header.ts`                | On load                 | Slide-down from y:-400 (homepage only, delay 2.2s), instant show (other pages)                                          |
| `heroSection`           | `heroSection.ts`           | On load                 | Sequence: logo fade-in/scale → logo fade-out/up → hero-image slide-in → title slide-up → subtext → description → button |
| `collectionSection`     | `collectionSection.ts`     | ScrollTrigger `top 80%` | Staggered fade-in-up (h2, separator, p, cards)                                                                          |
| `designersSection`      | `designersSection.ts`      | ScrollTrigger `top 80%` | Staggered fade-in-up (h2, separator, p, star, cards)                                                                    |
| `collaborationsSection` | `collaborationsSection.ts` | ScrollTrigger `top 80%` | Staggered fade-in-up (cards, h2, separator, p, button)                                                                  |
| `ethiqueSection`        | `ethiqueSection.ts`        | ScrollTrigger `top 80%` | Staggered **slide-from-left** (x:-60) — h2, separator, p, links, spans                                                  |
| `recyclageSection`      | `recyclageSection.ts`      | ScrollTrigger `top 80%` | Staggered **slide-from-left** (x:-60) — h2, h3, p, steps, button                                                        |
| `newsletterSection`     | `newsletterSection.ts`     | ScrollTrigger `top 80%` | Staggered fade-in-up (h2, separator, p)                                                                                 |
| `qrcodeSection`         | `qrcodeSection.ts`         | ScrollTrigger `top 80%` | Staggered fade-in-up (QR scanner content)                                                                               |

### GSAP Animation Patterns

**ScrollTrigger fade-in-up:**

```ts
gsap.from(".section-class h2, .section-class p", {
  scrollTrigger: { trigger: ".section-class", start: "top 80%" },
  y: 60, opacity: 0, autoAlpha: 0,
  duration: 1, stagger: 0.1-0.2, ease: "power2.out",
});
```

**ScrollTrigger slide-from-left (ethique/recyclage):**

```ts
gsap.from(".section-class h2, .section-class p", {
  scrollTrigger: { trigger: ".section-class", start: "top 80%" },
  x: -60, opacity: 0, autoAlpha: 0,
  duration: 1, stagger: 0.1-0.18, ease: "power2.out",
});
```

**Hero entrance sequence:**

```ts
timeline
  .fromTo(".main-logo", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.2 })
  .to(".main-logo", { autoAlpha: 0, scale: 0.8, top: -50, duration: 0.8 })
  .from(".hero-image", { scale: 0.8, x: -400, autoAlpha: 0, duration: 1 })
  .from(".hero-title", { y: 100, autoAlpha: 0, duration: 1, delay: 1.4 }, "-=2.2")
  .from(".hero-subtext", { y: 60, autoAlpha: 0, duration: 0.8 }, "-=0.6")
  .from(".hero-description", { y: 40, autoAlpha: 0, duration: 0.8 }, "-=0.6")
  .from(".hero-button", { scale: 0.9, autoAlpha: 0, duration: 0.6 }, "-=0.4");
```

### Adding a New Animation

1. Create `animations/timelines/yourSection.ts`
2. Export a default function that calls `configuredGsap.from(...)` with ScrollTrigger
3. Use the section's CSS class as trigger (e.g., `.your-section`)
4. Register the namespace in `animations/constants.ts` if it should be default-loaded
5. Call `useAnimation(["yourSection"])` in the page component

## Custom Cursor

**File:** `components/custom-cursor.tsx`

- Only shows on devices with fine pointer (`pointer: fine`)
- Uses GSAP for smooth following (0.2s duration)
- Scales up to 1.6x on hover over `button` and `a` elements
- `mix-blend-difference` for contrast effect
- SVG circle: `<circle cx="20" cy="20" r="30" fill="#f7f8fa" />`
- Hidden by default (scale: 0), appears on first mouse move
- z-index: 1000

## Marquee Section

Two animated ribbons on the homepage, tilted at opposite angles:

```tsx
{/* Grand ruban - gray bg, rotated -4deg */}
<div className="absolute top-2 -left-full w-[202%] rotate-[-4deg] z-1 bg-gray-50" />
<div className="absolute -top-1 -left-full w-[202%] rotate-[-4deg] z-9 bg-gray-400">
  <div className="flex animate-marquee whitespace-nowrap ...">
    {/* 50s infinite horizontal scroll */}
  </div>
</div>

{/* Petit ruban - black bg, rotated +4deg */}
<div className="absolute top-[50%] -left-full w-[202%] rotate-[4deg] z-3 bg-black/95 py-2">
  <div className="flex animate-marquee-slow whitespace-nowrap ...">
    {/* 20s reverse horizontal scroll */}
  </div>
</div>
```

## Header Behavior

### Desktop (`HeaderDesktop`)

- Fixed, full-width, `bg-white/95 backdrop-blur-sm`
- **Inversion**: On homepage when at top (`scrollY < viewport height`), applies `filter: invert(1)` to adapt to dark
  hero
- Logo (image) + nav links + auth buttons
- Active nav link has `::before` underline pseudo-element
- Auth: Shopping cart, bell (notifications), user dropdown

### Mobile (`HeaderMobile`)

- Fixed, hamburger menu
- Opens a slide-in panel from right (3/4 width) with backdrop blur
- Same nav links + auth actions

### Animation

- Homepage: header slides down from y:-400 with 2.2s delay (after hero sequence)
- Other pages: instant show (duration: 0)

## Page Layout Pattern

Every page follows this structure:

```tsx
<div className="min-h-screen bg-white text-black pt-20">
  <Header />
  {/* Hero section (if applicable) — usually bg-gray-50 */}
  <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
          Page Title
        </h1>
        <div className="w-32 h-px bg-black mx-auto mb-8" />
        <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
          Description
        </p>
      </div>
    </div>
  </section>
  {/* Content sections */}
  <Footer />
</div>
```

## Interaction Patterns

### Card Hover

```tsx
// Image scales up, overlay fades in, info slides up
<Card className="group cursor-pointer border-0 shadow-none hover:shadow-2xl transition-all duration-500">
  <div className="relative h-[500px] overflow-hidden">
    <Image className="object-cover group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
      {/* Info content */}
    </div>
  </div>
</Card>
```

### Button Hover

- Global: `transform: translateY(-2px)` on hover
- CTA buttons: color transition (e.g., `hover:bg-gray-800`)
- Outline buttons: fill transition (e.g., `hover:bg-black hover:text-white`)

### ManajaButton (Bid)

- Toggle between "Manaja" (black) and "300" (green) states
- Icon: `Handshake` from lucide-react

### Mobile Menu

- Slide-in from right with `transition-transform duration-300`
- Backdrop overlay: `bg-gray-50/50 backdrop-blur-xl`
- Click outside to close

### Scroll-to-Top

- Not implemented globally — smooth scrolling enabled via `scroll-behavior: smooth`

## Dashboard Feature Cards

Dashboard uses a consistent card pattern:

```tsx
<Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
  <CardContent className="p-8">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Icon className="h-8 w-8 text-black" />
    </div>
    <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Title</h3>
    <p className="text-gray-600 font-light leading-relaxed mb-6">Description</p>
    <Link href="/path">
      <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
        Accéder
      </Button>
    </Link>
  </CardContent>
</Card>
```

## Wardrobe Tabs

Tab navigation pattern used in wardrobe page:

```tsx
<button className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all ${
  activeTab === "tab"
    ? "bg-black text-white"
    : "bg-white text-black hover:bg-gray-100 border border-gray-200"
}`}>
```

## QR Code Scanner Animation

CSS-only animation on the homepage:

- `.scanner` — horizontal green line scanning vertically (3s infinite)
- `.scanned-image` — image reveal synced with scan
- `.qrcode-frame` — frame overlay synced inversely
- Uses `filter: brightness()` and `filter: blur()` for scan effect

## Responsive Design Strategy

- **Mobile-first**: Base styles are mobile
- **md breakpoint (768px)**: Switch to desktop layouts (grid, side-by-side)
- **Header**: Completely separate desktop/mobile components
- **Hero**: Stacks vertically on mobile, 45%/55% split on desktop
- **Grids**: 1 col mobile → 2-3 col desktop
- **Typography**: Smaller on mobile via `text-4xl md:text-5xl md:text-6xl` pattern
- **Padding**: `px-6` standard, `md:px-12 lg:px-20` for hero
