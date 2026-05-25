# 🌕 CelestialVista — Nature & Sky Photography Gallery Website

## Project Overview

Build a **stunning, immersive photography gallery website** called **CelestialVista** that showcases curated collections of the moon, eclipses, nature scenes, and other celestial/natural phenomena. The website should feel like stepping into a premium digital art museum — dark, atmospheric, cinematic, and breathtaking.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript (strict mode) |
| Framework | React 18+ (with hooks) |
| Styling | Tailwind CSS v3+ |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (see Typography section) |
| Build Tool | Vite |
| State Management | React Context API + useState/useReducer |

---

## Design Vision & Aesthetic

### Theme
**Dark Cosmic Luxury** — Think NASA meets Vogue. Deep space blacks, midnight blues, silver moons, and bursts of aurora green and eclipse amber. The UI must feel like you're peering through a telescope at the universe.

### Color Palette (CSS Variables)
```css
--color-void: #020408;          /* deepest background */
--color-cosmos: #060d1a;        /* card backgrounds */
--color-nebula: #0a1628;        /* secondary surfaces */
--color-stardust: #1a2a4a;      /* borders, dividers */
--color-moonbeam: #c8d8f0;      /* primary text */
--color-silver: #8899bb;        /* secondary text */
--color-eclipse: #f4a623;       /* accent/highlight - warm amber */
--color-aurora: #00e5a0;        /* secondary accent - teal green */
--color-supernova: #ff6b6b;     /* alert/badge color */
--color-twilight: #7c3aed;      /* purple for nature category */
```

### Typography
- **Display / Hero Font**: `Cormorant Garamond` (serif, elegant, editorial) — for titles and headings
- **UI Font**: `DM Sans` (clean, modern geometric) — for navigation, labels, buttons
- **Caption Font**: `Space Mono` (monospace) — for photo metadata, coordinates, timestamps

### Motion Philosophy
- Page transitions: smooth fade + slight upward drift (300ms ease-out)
- Image cards: scale up subtly on hover (1.03x) with shadow bloom
- Hero section: parallax starfield effect with floating moon
- Loading: skeleton shimmer in dark blue tones
- Gallery filter: smooth layout shift animation when categories change
- Cursor: custom circular cursor that reacts to hoverable elements

---

## Website Structure & Pages

### 1. Global Layout Components

#### `Navbar.tsx`
- Fixed top navigation bar with **glassmorphism** effect (backdrop-blur-md, semi-transparent dark background)
- Left: Logo — a crescent moon icon + "CelestialVista" in Cormorant Garamond
- Center: Navigation links — `Home`, `Gallery`, `Collections`, `About`, `Contact`
- Right: Search icon button + `Explore` CTA button (amber gradient)
- On mobile: hamburger menu with full-screen overlay drawer
- Active link underlined with a thin amber line
- Scrolling behavior: navbar becomes more opaque as user scrolls down

#### `Footer.tsx`
- Dark background with subtle star-pattern SVG overlay
- 4-column layout: Logo + tagline | Navigation links | Collections | Social links
- Bottom bar: copyright + "Built with ♥ for the universe"
- Social icons: Instagram, Twitter/X, Pinterest, YouTube

---

### 2. Home Page (`/`) — `HomePage.tsx`

#### Hero Section
- **Full-viewport height** (100vh) hero section
- **Background**: Animated starfield (100+ tiny white dots using CSS/canvas animation, slowly drifting upward)
- **Centerpiece**: A large, photorealistic moon image (high-res PNG/WEBP) with a soft golden glow halo effect using box-shadow and radial gradient
- **Headline** (Cormorant Garamond, 96px desktop / 48px mobile):
  > "Where the Sky Meets  
  > the Soul"
- **Subheadline** (DM Sans, 20px, --color-silver):
  > "A curated gallery of the moon, eclipses, and nature's most breathtaking moments"
- **CTAs**: Two buttons side by side:
  - Primary: "Explore Gallery" → `/gallery` (amber background, dark text)
  - Secondary: "View Collections" → `/collections` (outlined, white text)
- **Scroll indicator**: Animated bouncing chevron at bottom center

#### Featured Categories Section
- Section title: "Discover Our Collections" (centered, Cormorant Garamond)
- **4 large cards** in a 2×2 grid (desktop) / single column (mobile), each card:
  - Full-bleed background image (relevant high-quality nature/space photo)
  - Dark gradient overlay from bottom
  - Category name in large white serif text
  - Number of photos badge (top-right corner, amber)
  - Arrow icon bottom-right
  - Hover: image zooms in slightly, overlay darkens, text translates up
  - Categories:
    1. 🌕 **Moon Phases** — "Witness the lunar cycle in all its glory"
    2. 🌑 **Eclipses** — "Total, partial, and annular eclipses captured"
    3. 🌲 **Nature Scenes** — "Earth's landscapes at their most magnificent"
    4. ✨ **Night Sky** — "Stars, galaxies, and the Milky Way"

#### Stats Bar
- Full-width dark section with 4 animated counters:
  - `2,400+` Photos
  - `48` Collections  
  - `12` Photographers
  - `190` Countries Represented
- Numbers animate up from 0 when scrolled into view (Intersection Observer)

#### Featured Photos Strip
- Horizontal scrollable row of 8 featured photos
- Each photo is a 300×400px card with title + category tag
- Smooth horizontal scroll with arrow navigation buttons
- Photos have a subtle golden border on hover

#### Newsletter Section
- Centered section: "Get Celestial Updates"
- Email input + Subscribe button
- "Join 12,000+ sky gazers" social proof text

---

### 3. Gallery Page (`/gallery`) — `GalleryPage.tsx`

#### Filter Bar (sticky below navbar)
- Horizontal scrollable pill buttons for categories:
  - All | Moon | Eclipse | Nature | Night Sky | Sunrise/Sunset | Storms | Forests | Oceans | Mountains | Auroras
- Active filter: amber background, dark text
- Inactive: dark outlined pills
- Sort dropdown (top-right): Newest | Most Liked | Most Viewed | A-Z

#### Masonry/Grid Layout
- **Masonry grid** (Pinterest-style) with 3 columns on desktop, 2 on tablet, 1 on mobile
- Each photo card contains:
  - Image (various aspect ratios preserved)
  - On hover: smooth overlay slides up from bottom showing:
    - Photo title (white, Cormorant Garamond)
    - Photographer name with avatar
    - Like button (heart icon) + count
    - Category tag (colored pill)
    - Download/Save icon buttons
- **Infinite scroll**: Load 24 photos, then fetch next 24 on scroll to bottom
- Loading skeleton: animated gray shimmer cards

#### Lightbox Modal
- When a photo is clicked, open a full-screen lightbox:
  - Dark backdrop (95% opacity)
  - Image centered, max 90vh height
  - Left/right arrow navigation between photos
  - Top-right: Close (X), Download, Share, Like buttons
  - Bottom panel: Photo title, photographer, date, location, camera settings (Space Mono font)
  - Keyboard navigation: ← → arrows, Escape to close
  - Swipe gestures on mobile

---

### 4. Collections Page (`/collections`) — `CollectionsPage.tsx`

#### Hero Banner
- Full-width banner with rotating background images (auto-slideshow every 5s)
- Title: "Curated Collections"
- Subtitle: "Handpicked series that tell a story"

#### Collections Grid
- 3-column grid (desktop) of Collection Cards
- Each collection card:
  - Cover image (landscape 16:9)
  - Overlaid: Collection title, number of photos, short description
  - Tags row at bottom (e.g., "Moon", "Night", "2024")
  - "View Collection →" link
- Collections to include:
  1. **Blood Moon Chronicles** — 48 photos of red lunar eclipses worldwide
  2. **Total Eclipse 2024** — The Great American Eclipse captured in 120 photos
  3. **Lunar Phases: A Complete Year** — Full 12-month cycle documented
  4. **Midnight Forests** — Dark, moody forest photography at night
  5. **Ocean Meets Sky** — Where the horizon disappears
  6. **Aurora Borealis: Iceland** — Northern lights over glaciers
  7. **Desert Moonrise** — Sahara and Atacama under moonlight
  8. **Thunderstorm Gallery** — Electric storms from around the world
  9. **Mountain Silhouettes** — Peaks at dusk and dawn

---

### 5. Individual Collection Page (`/collections/:slug`) — `CollectionDetailPage.tsx`

- Hero: Large banner with collection title, description, photo count
- Photographer credits section
- Full masonry grid of all photos in the collection
- "Related Collections" section at bottom (3 cards)

---

### 6. About Page (`/about`) — `AboutPage.tsx`

- Mission statement: "CelestialVista exists to celebrate the impossible beauty of our natural world — from the craters of the moon to the canopy of ancient forests."
- Team section: 3-4 photographer profiles with avatar, name, specialty, social links
- Timeline of the project history
- Partner/sponsor logos row

---

### 7. Contact Page (`/contact`) — `ContactPage.tsx`

- Split layout: Left = contact info + social links | Right = contact form
- Form fields: Name, Email, Subject (dropdown: Submit Photo, Collaboration, General), Message
- Submit button with loading spinner state
- Success message with confetti animation on submit

---

## Reusable Components

### `PhotoCard.tsx`
Props:
```typescript
interface PhotoCardProps {
  id: string;
  src: string;
  title: string;
  category: string;
  photographer: string;
  likes: number;
  isLiked: boolean;
  onLike: (id: string) => void;
  onClick: (id: string) => void;
}
```

### `CategoryPill.tsx`
Props: `label`, `isActive`, `onClick`, `count?`

### `Lightbox.tsx`
Full-screen modal. Props: `photos[]`, `initialIndex`, `isOpen`, `onClose`

### `SkeletonCard.tsx`
Animated shimmer placeholder. Props: `height`, `width`

### `AnimatedCounter.tsx`
Props: `targetValue`, `duration`, `suffix`

### `StarField.tsx`
Canvas-based or CSS animated background with 150+ stars of varying sizes and opacity.

### `MoonGlow.tsx`
SVG/div component rendering a moon with radial glow effect. Props: `phase` (full/crescent/half), `size`, `glowColor`

---

## Data & Types

### TypeScript Interfaces

```typescript
// types/index.ts

export interface Photo {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnailSrc: string;
  category: PhotoCategory;
  tags: string[];
  photographer: Photographer;
  location: string;
  dateTaken: string;
  likes: number;
  views: number;
  width: number;
  height: number;
  cameraSettings?: CameraSettings;
  collectionIds: string[];
}

export type PhotoCategory =
  | "moon"
  | "eclipse"
  | "nature"
  | "night-sky"
  | "sunrise-sunset"
  | "storms"
  | "forests"
  | "oceans"
  | "mountains"
  | "auroras";

export interface Photographer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  instagram?: string;
  website?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  photoIds: string[];
  tags: string[];
  createdAt: string;
  featured: boolean;
}

export interface CameraSettings {
  camera: string;
  lens: string;
  iso: number;
  aperture: string;
  shutterSpeed: string;
  focalLength: string;
}
```

### Mock Data
Create a `data/mockData.ts` file with at least:
- 60 mock photo objects (use Unsplash URLs for nature/space/moon: `https://source.unsplash.com/featured/?moon`, etc.)
- 9 collection objects
- 4 photographer profiles

---

## Routing Structure

```typescript
// App.tsx
<BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/gallery" element={<GalleryPage />} />
    <Route path="/collections" element={<CollectionsPage />} />
    <Route path="/collections/:slug" element={<CollectionDetailPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  <Footer />
</BrowserRouter>
```

---

## State Management

```typescript
// context/GalleryContext.tsx
interface GalleryState {
  photos: Photo[];
  collections: Collection[];
  activeCategory: PhotoCategory | "all";
  sortBy: "newest" | "likes" | "views" | "alphabetical";
  likedPhotoIds: Set<string>;
  lightboxPhoto: Photo | null;
  isLightboxOpen: boolean;
  isLoading: boolean;
  searchQuery: string;
}
```

---

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#020408",
        cosmos: "#060d1a",
        nebula: "#0a1628",
        stardust: "#1a2a4a",
        moonbeam: "#c8d8f0",
        silver: "#8899bb",
        eclipse: "#f4a623",
        aurora: "#00e5a0",
        supernova: "#ff6b6b",
        twilight: "#7c3aed",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        ui: ["DM Sans", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 1.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 40px rgba(244, 166, 35, 0.3)" },
          "50%": { boxShadow: "0 0 80px rgba(244, 166, 35, 0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
```

---

## File/Folder Structure

```
celestialvista/
├── public/
│   ├── favicon.ico
│   └── og-image.jpg
├── src/
│   ├── assets/
│   │   └── fonts/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── PhotoCard.tsx
│   │   │   ├── CategoryPill.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── StarField.tsx
│   │   │   ├── MoonGlow.tsx
│   │   │   └── CollectionCard.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── FeaturedCategories.tsx
│   │       ├── StatsBar.tsx
│   │       └── NewsletterSection.tsx
│   ├── context/
│   │   └── GalleryContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── hooks/
│   │   ├── useIntersectionObserver.ts
│   │   ├── useInfiniteScroll.ts
│   │   └── useLightbox.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── CollectionsPage.tsx
│   │   ├── CollectionDetailPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── filterPhotos.ts
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Key UX Requirements

1. **Fully responsive** — mobile-first, works on 320px to 4K screens
2. **Accessibility** — ARIA labels on all interactive elements, keyboard navigable, sufficient color contrast
3. **Performance** — lazy-load all images with `loading="lazy"` and blur-up placeholder technique
4. **SEO** — proper `<title>`, `<meta description>`, Open Graph tags per page
5. **Dark mode only** — the entire site is dark-themed, no light mode toggle needed
6. **Smooth page transitions** — Framer Motion `AnimatePresence` wrapping route changes
7. **No broken states** — always show loading skeletons, empty states (with moon illustration), and error boundaries

---

## Special Visual Details

- **Hero starfield**: 150 CSS-animated stars at randomized positions, sizes (1–3px), and animation delays (0–10s), drifting upward very slowly
- **Moon glow**: Multi-layered box-shadow on the hero moon image: `0 0 60px rgba(244,166,35,0.2), 0 0 120px rgba(244,166,35,0.1), 0 0 200px rgba(200,216,240,0.05)`
- **Card hover glow**: On photo card hover, apply a subtle amber glow border using `ring-1 ring-eclipse/30 shadow-lg shadow-eclipse/10`
- **Glassmorphism navbar**: `bg-cosmos/70 backdrop-blur-md border-b border-stardust/40`
- **Gradient text**: Category titles use gradient text: `bg-gradient-to-r from-moonbeam to-eclipse bg-clip-text text-transparent`
- **Grain overlay**: Subtle CSS noise texture over hero using a pseudo-element with `background-image: url("data:image/svg+xml...")` at 5% opacity

---

## Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.24.0",
    "framer-motion": "^11.3.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Commands to Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Summary

Build **CelestialVista** — a dark, cinematic, premium photography gallery website. Stack: React 18 + TypeScript + Tailwind CSS + Framer Motion. The site must feel immersive and luxurious — like an art museum for the cosmos. Every animation, color, font, and interaction detail described above must be implemented. The result should be a production-ready, visually stunning gallery that celebrates the moon, eclipses, nature, and the night sky.