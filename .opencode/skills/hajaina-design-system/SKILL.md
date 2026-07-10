---
name: hajaina-design-system
description: Use when creating or modifying UI components, styles, themes, typography, colors, spacing, or any visual aspect of the Haj'Aina project. Covers the shadcn/ui design tokens, Tailwind theme, CSS custom properties, and component styling conventions. Use ONLY for the hajaina-fashion-website project.
---

# Haj'Aina — Design System

## Color System

### CSS Variables (HSL-based, shadcn/ui pattern)

```css
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 255, 255, 255;
  --purple-500-rgb: 168, 85, 247;
  --cyan-500-rgb: 6, 182, 212;
}
```

All semantic colors are defined as `hsl(var(--xxx))` in Tailwind config:

- `background`, `foreground`
- `card` / `card-foreground`
- `popover` / `popover-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border`, `input`, `ring`
- `chart-1` through `chart-5`
- `sidebar-*` variants

### Brand Colors (Hardcoded in components)

| Usage               | Color                                 | Where                                  |
|---------------------|---------------------------------------|----------------------------------------|
| **Hero background** | `#0b0b0b`                             | Hero section                           |
| **Primary CTA**     | `bg-green-700` / `hover:bg-green-600` | Hero button "Explorer les Collections" |
| **Black sections**  | `bg-black text-white`                 | Ethique, Footer, dark sections         |
| **Light sections**  | `bg-gray-50`                          | Marquee, Collections, Recyclage        |
| **Accent green**    | `bg-green-600`                        | ManajaButton clicked state             |
| **Scanner green**   | `bg-green-300`                        | QR scanner line                        |
| **White**           | `bg-white`                            | Most page backgrounds                  |

### Color Palette Summary

- **Primary**: Black (`#000`) and White (`#fff`) — monochrome base
- **Accent**: Green 700/600 for CTAs and interactive states
- **Neutral**: Gray scale (50, 100, 200, 300, 400, 500, 600, 700, 800)
- **Status**: Blue-50/600 (info), Orange-50/600 (warning), Green-500 (success/sustainability)

## Typography

### Font Stacks

| Role       | Font            | Source                    | Usage                                      |
|------------|-----------------|---------------------------|--------------------------------------------|
| **Sans**   | Geist Sans      | `geist` package           | Default body text, UI elements             |
| **Mono**   | Geist Mono      | `geist` package           | Code/monospace contexts                    |
| **Serif**  | Times New Roman | System                    | `.serif-font` class — all headings, titles |
| **Script** | Meliora         | Custom `@font-face` (OTF) | `.font-meliora` — hero tagline only        |

### Typography Scale

```css
/* Global heading defaults */
h1, h2, h3, h4, h5, h6 {
  font-weight: 200;        /* extralight */
  letter-spacing: 0.05em;
  line-height: 1.2;
}
```

### Font Weight Convention

- **extralight (200)**: All headings — the signature look
- **font-light (300)**: Body text, descriptions, labels — dominant weight
- **font-normal (400)**: Only used sparingly (ManajaButton clicked state)
- **font-medium (500)**: Never used for display text
- **font-semibold/bold**: Avoided entirely — never appears in the design

### Letter Spacing Convention

- **tracking-[0.2em]**: Hero titles, section titles — ultra-wide
- **tracking-[0.15em]**: Nav links, badges, labels
- **tracking-[0.1em]**: Buttons, subtitles, secondary text
- **tracking-[0.05em]**: Tagline, body text

### Text Sizes

- Hero title: `text-4xl sm:text-5xl md:text-8xl`
- Section titles: `text-4xl md:text-5xl` or `text-5xl md:text-6xl`
- Subtitles: `text-xl md:text-2xl`
- Body: `text-base md:text-lg`
- Labels/Badges: `text-xs` or `text-sm`
- Navigation: `text-xs`

## Spacing & Layout

### Container Pattern

```tsx
<div className="container mx-auto px-6">
```

- `container` = max-width utility
- `mx-auto` = centered
- `px-6` = horizontal padding (1.5rem)

### Section Pattern

```tsx
<section className="py-24 bg-gray-50">  {/* Light sections */}
<section className="py-24 bg-black text-white">  {/* Dark sections */}
<section className="py-24">  {/* Default white */}
```

- `py-24` = 6rem vertical padding (standard section spacing)
- `py-28` = 7rem (marquee section)
- `py-32` = 8rem (ethique hero)

### Section Header Pattern

```tsx
<div className="text-center mb-20">
  <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">
    Title
  </h2>
  <div className="w-32 h-px bg-black mx-auto mb-8" />  {/* Separator line */}
  <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
    Description
  </p>
</div>
```

### Grid Patterns

- **3-column**: `grid md:grid-cols-3 gap-12` (designers, collaborations)
- **2-column**: `grid md:grid-cols-2 gap-16` (ethique, recyclage, hero)
- **4-column**: `grid md:grid-cols-2 lg:grid-cols-4 gap-12` (foundation values)
- **Card grid**: `grid md:grid-cols-2 lg:grid-cols-3 gap-12` (collections)
- **Dashboard**: `grid md:grid-cols-2 lg:grid-cols-3 gap-12`

### Separator Line

```tsx
<div className="w-32 h-px bg-black mx-auto mb-8" />
```

- `w-32` = 8rem width
- `h-px` = 1px height
- Always centered with `mx-auto`

## Component Styling Conventions

### Buttons (shadcn/ui Button)

```tsx
// Primary CTA (black)
<Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase px-8 py-3">

// Primary CTA (green - hero only)
<Button className="bg-green-700 text-white hover:bg-green-600 text-xs tracking-[0.15em] px-8 py-4 font-normal uppercase">

// Outline (dark on light)
<Button variant="outline" className="tracking-[0.1em] font-light uppercase text-xs bg-transparent">

// Outline inverted (white on dark)
<Button variant="outline" className="border-white text-white hover:bg-white hover:text-black bg-transparent font-light tracking-[0.1em] uppercase">

// Ghost (nav)
<Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase">
```

### Cards

```tsx
// Standard card (borderless, shadow on hover)
<Card className="group cursor-pointer border-0 shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden">

// Dashboard card (centered, icon in circle)
<Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
```

### Badges

```tsx
// Category badge
<Badge variant="outline" className="text-xs tracking-[0.15em] font-light uppercase border-gray-300">

// Overlay badge (on images)
<Badge className="mb-3 bg-white/20 text-white border-white/30 backdrop-blur-sm font-light tracking-wide">
```

### Images

```tsx
// Full-bleed image
<Image src="..." fill className="object-cover" />

// Image with hover scale
<Image src="..." fill className="object-cover group-hover:scale-105 transition-transform duration-700" />

// Image with gradient overlay
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-r from-white/30 via-black/20 to-[#0b0b0b]" />
```

### Inputs

```tsx
<Input className="border-gray-300 focus:border-black font-light tracking-wide" />
```

## Border Radius

```typescript
borderRadius: {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)'
}
```

## Custom CSS Classes

| Class                                           | Purpose                                                   |
|-------------------------------------------------|-----------------------------------------------------------|
| `.serif-font`                                   | `font-family: "Times New Roman", Times, serif`            |
| `.italic-font`                                  | `font-style: italic`                                      |
| `.font-meliora`                                 | Custom Meliora Script font                                |
| `.animate-fade-in`                              | Fade-in + translate-up animation                          |
| `.animate-marquee`                              | 50s infinite horizontal scroll                            |
| `.animate-marquee-slow`                         | 20s reverse marquee                                       |
| `.card-hover`                                   | Translate-up + shadow on hover                            |
| `.image-overlay`                                | Gradient overlay on hover                                 |
| `.rotating-star`                                | 4s infinite rotation with star pseudo-elements            |
| `.scanner` / `.scanned-image` / `.qrcode-frame` | QR code scan animation                                    |
| `.invert`                                       | `filter: invert(1)` — used for header on dark backgrounds |
| `.navlink.active::before`                       | Underline indicator on active nav links                   |

## Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f8f8f8; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
```

Firefox: `scrollbar-width: thin; scrollbar-color: black transparent;`

## Responsive Breakpoints

Follows Tailwind defaults:

- `sm`: 640px
- `md`: 768px (main breakpoint — desktop vs mobile)
- `lg`: 1024px
- `xl`: 1280px

**Mobile-first approach**: base styles are mobile, `md:` and `lg:` add desktop layouts.

## Theming Notes

- Dark mode is configured (`darkMode: ["class"]`) but the site is primarily light-themed
- `next-themes` is available via `theme-provider.tsx` but not actively used on most pages
- The design is essentially **light-mode only** with intentional dark sections (hero, ethique, footer)
