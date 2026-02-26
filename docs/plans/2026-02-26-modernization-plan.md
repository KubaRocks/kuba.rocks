# kuba.rocks Modernization — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite kuba.rocks as a Next.js 16 App Router site with Tailwind v4, fully static data (JSON5 + MDX), dark mode, and a complete visual redesign.

**Architecture:** React Server Components for all content pages. Single client boundary for the contact form and mobile nav toggle. Data loaded from local JSON5/MDX files at render time. Contact form via Server Action + Postmark.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, MDX, JSON5, Zod, Postmark, react-icons

**Design doc:** `docs/plans/2026-02-26-modernization-design.md`

---

## Task 1: Project Foundation

Remove old source code and dependencies. Set up new package.json, TypeScript config, and directory structure.

**Files:**
- Delete: `src/` (entire old source tree)
- Delete: `prisma/` (schema + migrations, NOT before extracting data in Task 3)
- Delete: `scripts/`
- Delete: `.idea/`
- Delete: `docker-compose.yaml`
- Delete: `next.config.mjs` (old config)
- Delete: `next-env.d.ts`
- Delete: `.eslintrc.json`
- Rewrite: `package.json`
- Rewrite: `tsconfig.json`
- Create: `src/app/.gitkeep` (placeholder for directory structure)

**Step 1: Extract seed data before deletion**

Copy seed data files to a temporary location so they're available for Task 3:

```bash
cp -r prisma/initial /tmp/kuba-rocks-seed-data
```

**Step 2: Remove old source code**

```bash
rm -rf src/ prisma/ scripts/ .idea/ docker-compose.yaml next.config.mjs next-env.d.ts .eslintrc.json .prettierrc.json
```

**Step 3: Write new package.json**

```json
{
  "name": "kuba.rocks",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Step 4: Install dependencies**

```bash
npm install next@latest react@latest react-dom@latest
npm install tailwindcss @tailwindcss/postcss postcss
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install json5 zod postmark react-icons
npm install -D typescript @types/node @types/react @types/react-dom @types/mdx eslint eslint-config-next
```

**Step 5: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@/data/*": ["./data/*"],
      "@/content/*": ["./content/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.mdx"],
  "exclude": ["node_modules"]
}
```

**Step 6: Create directory structure**

```bash
mkdir -p src/app src/app/resume src/app/contact
mkdir -p src/components/layout src/components/home src/components/resume src/components/contact
mkdir -p src/lib
mkdir -p content data
```

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: strip old stack, set up Next.js 16 + Tailwind v4 foundation"
```

---

## Task 2: Next.js + Tailwind v4 + MDX Config

Set up PostCSS, Tailwind v4 with `@theme` and dark mode, MDX integration, and Next.js config.

**Files:**
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `next.config.ts`
- Create: `mdx-components.tsx` (project root)

**Step 1: Create postcss.config.mjs**

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**Step 2: Create globals.css with Tailwind v4 @theme and dark mode tokens**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors — light mode defaults, dark overrides via CSS custom properties */
  --color-background: #fafafa;
  --color-foreground: #0a0a0a;
  --color-muted: #737373;
  --color-muted-foreground: #a3a3a3;
  --color-border: #e5e5e5;
  --color-card: #ffffff;
  --color-card-foreground: #0a0a0a;
  --color-accent: #dc2626;
  --color-accent-foreground: #ffffff;

  /* Fonts — will be overridden by next/font CSS variables */
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  /* Layout */
  --width-content: 1280px;
}

/*
 * Dark mode — system preference.
 * Override CSS custom properties that Tailwind tokens reference.
 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0a0a0a;
    --color-foreground: #fafafa;
    --color-muted: #a3a3a3;
    --color-muted-foreground: #737373;
    --color-border: #262626;
    --color-card: #171717;
    --color-card-foreground: #fafafa;
    --color-accent: #ef4444;
    --color-accent-foreground: #ffffff;
  }
}

/* Base resets */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-background);
  color: var(--color-foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

> **Note:** These are starter design tokens. They will be refined when the `frontend-design` skill is invoked during page implementation tasks. The colors above are neutral placeholders.

**Step 3: Create next.config.ts**

```ts
// next.config.ts
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

**Step 4: Create mdx-components.tsx at project root**

```tsx
// mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {};
}
```

**Step 5: Create minimal root layout to verify setup**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kuba.rocks",
  description: "Full-Stack Developer & Team Leader",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Step 6: Create minimal home page to verify setup**

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-accent">kuba.rocks</h1>
    </main>
  );
}
```

**Step 7: Verify — run dev server, confirm Tailwind works**

```bash
npm run dev
```

Expected: Page loads at localhost:3000 showing "kuba.rocks" in red (accent color). Check both light and dark mode by toggling OS preference.

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: configure Tailwind v4, MDX, and Next.js with dark mode tokens"
```

---

## Task 3: Data Migration

Create all JSON5 data files and MDX content from the existing seed data. Ensure static assets are in `public/`.

**Files:**
- Create: `data/testimonials.json5`
- Create: `data/clients.json5`
- Create: `data/experience.json5`
- Create: `data/education.json5`
- Create: `data/technologies.json5`
- Create: `content/bio.mdx`
- Verify: `public/` has all logos, photos, CV

**Reference files:** Read data from `/tmp/kuba-rocks-seed-data/` (copied in Task 1) and from the live site at https://kuba.rocks for any content not in the seed files (e.g., bio text, technology descriptions).

**Step 1: Create data/testimonials.json5**

Read `prisma/initial/testimonials.json` (from git history or temp copy). Convert to JSON5 format. Each entry: `{ name, title, photo, content }`. Remove `id`, `hidden`, `createdAt` fields. Keep the `authorPhoto` paths pointing to files in `public/testimonials/`.

**Step 2: Create data/clients.json5**

Read `prisma/initial/clients.json`. Convert to JSON5. Each entry: `{ name, logo }`. Remove `id`, `hidden`, `createdAt`. Logo paths point to `public/clients/`.

**Step 3: Create data/experience.json5**

Read `prisma/initial/experience.json`. Convert to JSON5. Each entry: `{ company, title, description, highlights, startDate, endDate }`. Dates as ISO strings. `endDate` is `null` for current positions.

**Step 4: Create data/education.json5**

Read `prisma/initial/education.json`. Convert to JSON5. Each entry: `{ institution, title, description, date }`. Date as ISO string.

**Step 5: Create data/technologies.json5**

Extract from `src/components/home/Technologies.tsx` (git history). The current technologies are:

```json5
[
  {
    name: "TypeScript",
    description: "Strongly typed programming language that builds on JavaScript."
  },
  {
    name: "React",
    description: "A library for building user interfaces — SPAs, mobile apps, and server-rendered applications."
  },
  {
    name: "JavaScript",
    description: "The backbone of modern web development, from SPAs to server-side with Node.js."
  },
  {
    name: "Next.js",
    description: "The React framework for production — server rendering, static generation, and TypeScript support."
  }
]
```

**Step 6: Create content/bio.mdx**

Extract the hero bio text from `src/pages/index.tsx` (git history) or scrape from https://kuba.rocks. The current bio mentions family (wife, daughter), hobbies (basketball, comics), and coffee obsession.

```mdx
I'm a **Full-Stack Developer** and **Team Leader** based in Warsaw, Poland,
with over {yearsOfExperience} years of commercial experience.

When I'm not coding, I spend time with my wife and daughter,
play basketball, read comics, and drink way too much coffee.
```

**Step 7: Verify static assets in public/**

Check that `public/` contains:
- `public/clients/` — all 21 client logo SVGs
- `public/testimonials/` — testimonial author photos
- `public/cv.pdf` — downloadable CV
- Favicons

```bash
ls public/clients/ public/testimonials/
```

If any assets are missing, download them from https://kuba.rocks.

**Step 8: Commit**

```bash
git add data/ content/
git commit -m "feat: migrate all content to JSON5 and MDX files"
```

---

## Task 4: Data Loading Library

Create typed utility functions to load and parse JSON5 data files. Add tests.

**Files:**
- Create: `src/lib/data.ts`
- Create: `src/lib/types.ts`
- Create: `src/lib/__tests__/data.test.ts` (if vitest/jest is added, otherwise test via build)

**Step 1: Create src/lib/types.ts**

```ts
export interface Testimonial {
  name: string;
  title: string;
  photo: string;
  content: string;
}

export interface Client {
  name: string;
  logo: string;
}

export interface Experience {
  company: string;
  title: string;
  description: string | null;
  highlights: string[];
  startDate: string;
  endDate: string | null;
}

export interface Education {
  institution: string;
  title: string;
  description: string | null;
  date: string;
}

export interface Technology {
  name: string;
  description: string;
}
```

**Step 2: Create src/lib/data.ts**

```ts
import { readFileSync } from "fs";
import { join } from "path";
import JSON5 from "json5";
import type {
  Testimonial,
  Client,
  Experience,
  Education,
  Technology,
} from "./types";

const dataDir = join(process.cwd(), "data");

function loadJSON5<T>(filename: string): T {
  const raw = readFileSync(join(dataDir, filename), "utf-8");
  return JSON5.parse(raw);
}

export function getTestimonials(): Testimonial[] {
  return loadJSON5<Testimonial[]>("testimonials.json5");
}

export function getClients(): Client[] {
  return loadJSON5<Client[]>("clients.json5");
}

export function getExperience(): Experience[] {
  return loadJSON5<Experience[]>("experience.json5");
}

export function getEducation(): Education[] {
  return loadJSON5<Education[]>("education.json5");
}

export function getTechnologies(): Technology[] {
  return loadJSON5<Technology[]>("technologies.json5");
}
```

**Step 3: Create src/lib/fun-facts.ts**

```ts
export function getYearsOfExperience(): number {
  const start = new Date(2004, 6, 1); // July 2004
  const now = new Date();
  return Math.floor(
    (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );
}

export function getWorkingHours(): number {
  const start = new Date(2005, 7, 1); // August 2005
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return months * 140;
}

export function getCoffeeConsumed(): number {
  const start = new Date(2010, 2, 1); // March 2010
  const now = new Date();
  const days = Math.floor(
    (now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.round(days * 1.5);
}

export const GITHUB_REPOS = 41;
```

**Step 4: Verify — import in home page and confirm data loads**

Temporarily update `src/app/page.tsx`:

```tsx
import { getTestimonials, getClients } from "@/lib/data";

export default function Home() {
  const testimonials = getTestimonials();
  const clients = getClients();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Data check</h1>
      <p>{testimonials.length} testimonials, {clients.length} clients</p>
    </main>
  );
}
```

```bash
npm run dev
```

Expected: Page shows "4 testimonials, 21 clients".

**Step 5: Commit**

```bash
git add src/lib/
git commit -m "feat: add typed data loading utilities for JSON5 and fun facts"
```

---

## Task 5: Root Layout + Fonts

Set up the root layout with `next/font`, global metadata, and the page shell structure.

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "kuba.rocks — Full-Stack Developer",
    template: "%s | kuba.rocks",
  },
  description:
    "Kuba Florczuk — Full-Stack Developer and Team Leader based in Warsaw, Poland.",
  metadataBase: new URL("https://kuba.rocks"),
  openGraph: {
    title: "kuba.rocks — Full-Stack Developer",
    description:
      "Kuba Florczuk — Full-Stack Developer and Team Leader based in Warsaw, Poland.",
    url: "https://kuba.rocks",
    siteName: "kuba.rocks",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
```

> **Note:** The `geist` font package must be installed: `npm install geist`. If a different font is chosen during the design phase, update this file accordingly.

**Step 2: Install geist font**

```bash
npm install geist
```

**Step 3: Verify fonts load**

```bash
npm run dev
```

Expected: Text renders in Geist Sans. Check via browser dev tools that `--font-geist-sans` CSS variable is set.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add root layout with Geist fonts and metadata"
```

---

## Task 6: Layout Components — Header, Footer, Navigation

Build the persistent layout shell: header with navigation, footer with social links. Mobile nav toggle is a client component.

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/nav.tsx`
- Create: `src/components/layout/mobile-nav.tsx` (client component)
- Create: `src/components/layout/footer.tsx`
- Modify: `src/app/layout.tsx` (add Header + Footer)

> **IMPORTANT — Visual Design:** Before building these components, invoke the `frontend-design` skill with the context: "Design a header, navigation, and footer for a personal developer portfolio site (kuba.rocks). 3 pages: Home, Resume, Contact. Include dark mode support. Style: complete redesign, surprise the user." Use the resulting design to guide the Tailwind classes. The code below is structural — the exact classes will be determined by the design.

**Step 1: Create src/components/layout/nav.tsx**

Server component with navigation links. Exact styling from design phase.

```tsx
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-muted hover:text-foreground transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export { navItems };
```

**Step 2: Create src/components/layout/mobile-nav.tsx**

Client component for mobile hamburger menu.

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "./nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2"
        aria-label="Toggle menu"
      >
        {/* Hamburger icon — use react-icons or inline SVG */}
        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
        <span className="block w-6 h-0.5 bg-foreground" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 3: Create src/components/layout/header.tsx**

```tsx
import Link from "next/link";
import { Nav } from "./nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="relative border-b border-border">
      <div className="mx-auto flex max-w-[var(--width-content)] items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          kuba<span className="text-accent">.rocks</span>
        </Link>
        <Nav />
        <MobileNav />
      </div>
    </header>
  );
}
```

**Step 4: Create src/components/layout/footer.tsx**

```tsx
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { href: "https://github.com/KubaRocks", icon: FaGithub, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/kubaflorczuk/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/kuba_rocks/",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://twitter.com/KubaRocks",
    icon: FaXTwitter,
    label: "X (Twitter)",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[var(--width-content)] flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} kuba.rocks
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted hover:text-foreground transition-colors"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

**Step 5: Update src/app/layout.tsx to include Header and Footer**

Add `<Header />` and `<Footer />` wrapping `{children}` in the body.

**Step 6: Verify — navigate between pages, check mobile nav**

```bash
npm run dev
```

Expected: Header with logo + nav links visible. Footer with social icons. Mobile hamburger works on small viewport.

**Step 7: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add header, navigation, footer layout components"
```

---

## Task 7: Home Page — Hero + Technologies

Build the hero section (with MDX bio) and technologies section.

**Files:**
- Create: `src/components/home/hero.tsx`
- Create: `src/components/home/technologies.tsx`
- Modify: `src/app/page.tsx`

> **IMPORTANT — Visual Design:** Invoke the `frontend-design` skill to design the hero section and technologies grid. The hero is the first thing visitors see — it sets the tone for the entire redesign.

**Step 1: Create src/components/home/hero.tsx**

```tsx
import Link from "next/link";
import { getYearsOfExperience } from "@/lib/fun-facts";

export function Hero() {
  const years = getYearsOfExperience();

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <p className="text-accent font-mono text-sm mb-4">
          Full-Stack Developer &amp; Team Leader
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Kuba Florczuk
        </h1>
        <p className="text-xl text-muted max-w-2xl mb-8">
          Based in Warsaw, Poland with over {years} years of commercial
          experience. When I&apos;m not coding, I spend time with my wife and
          daughter, play basketball, read comics, and drink way too much coffee.
        </p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center rounded-lg border border-border px-6 py-3 font-medium hover:bg-card transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create src/components/home/technologies.tsx**

```tsx
import { getTechnologies } from "@/lib/data";

export function Technologies() {
  const technologies = getTechnologies();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="text-3xl font-bold mb-12">What I Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech) => (
            <div key={tech.name} className="space-y-3">
              <h3 className="text-xl font-semibold">{tech.name}</h3>
              <p className="text-muted">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Update src/app/page.tsx**

```tsx
import { Hero } from "@/components/home/hero";
import { Technologies } from "@/components/home/technologies";

export default function Home() {
  return (
    <main>
      <Hero />
      <Technologies />
    </main>
  );
}
```

**Step 4: Verify**

```bash
npm run dev
```

Expected: Hero section with name, bio, buttons. Technologies grid below. Both light and dark mode.

**Step 5: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add hero and technologies sections to home page"
```

---

## Task 8: Home Page — Testimonials + Clients + Fun Facts

Complete the home page with remaining sections.

**Files:**
- Create: `src/components/home/testimonials.tsx`
- Create: `src/components/home/clients.tsx`
- Create: `src/components/home/fun-facts.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create src/components/home/testimonials.tsx**

```tsx
import Image from "next/image";
import { getTestimonials } from "@/lib/data";

export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="text-3xl font-bold mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-xl border border-border bg-background p-6"
            >
              <p className="text-muted mb-6">&ldquo;{t.content}&rdquo;</p>
              <footer className="flex items-center gap-4">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted">{t.title}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create src/components/home/clients.tsx**

```tsx
import Image from "next/image";
import { getClients } from "@/lib/data";

export function Clients() {
  const clients = getClients();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="text-3xl font-bold mb-12">Companies I&apos;ve Worked With</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create src/components/home/fun-facts.tsx**

```tsx
import {
  getYearsOfExperience,
  getWorkingHours,
  getCoffeeConsumed,
  GITHUB_REPOS,
} from "@/lib/fun-facts";

interface FunFact {
  label: string;
  value: number;
}

export function FunFacts() {
  const facts: FunFact[] = [
    { label: "Years of Experience", value: getYearsOfExperience() },
    { label: "Working Hours", value: getWorkingHours() },
    { label: "GitHub Repos", value: GITHUB_REPOS },
    { label: "Coffee Consumed", value: getCoffeeConsumed() },
  ];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact) => (
            <div key={fact.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-accent">
                {fact.value.toLocaleString()}
              </p>
              <p className="mt-2 text-muted">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 4: Update src/app/page.tsx with all sections**

```tsx
import { Hero } from "@/components/home/hero";
import { Technologies } from "@/components/home/technologies";
import { Testimonials } from "@/components/home/testimonials";
import { Clients } from "@/components/home/clients";
import { FunFacts } from "@/components/home/fun-facts";

export default function Home() {
  return (
    <main>
      <Hero />
      <Technologies />
      <Testimonials />
      <Clients />
      <FunFacts />
    </main>
  );
}
```

**Step 5: Verify**

```bash
npm run dev
```

Expected: Full home page with all 5 sections. Testimonial cards with photos. Client logos grid. Fun facts with calculated numbers.

**Step 6: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add testimonials, clients, and fun facts to home page"
```

---

## Task 9: Resume Page

Build the resume page with experience and education timelines.

**Files:**
- Create: `src/components/resume/resume-item.tsx`
- Create: `src/app/resume/page.tsx`

**Step 1: Create src/components/resume/resume-item.tsx**

```tsx
interface ResumeItemProps {
  title: string;
  subtitle: string;
  date: string;
  description?: string | null;
  highlights?: string[];
}

export function ResumeItem({
  title,
  subtitle,
  date,
  description,
  highlights,
}: ResumeItemProps) {
  return (
    <div className="relative pl-8 pb-8 border-l border-border last:pb-0">
      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-accent" />
      <p className="text-sm text-muted mb-1">{date}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-accent">{subtitle}</p>
      {description && <p className="mt-2 text-muted">{description}</p>}
      {highlights && highlights.length > 0 && (
        <ul className="mt-2 space-y-1">
          {highlights.map((h, i) => (
            <li key={i} className="text-sm text-muted">
              &bull; {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Step 2: Create src/app/resume/page.tsx**

```tsx
import type { Metadata } from "next";
import { getExperience, getEducation } from "@/lib/data";
import { ResumeItem } from "@/components/resume/resume-item";

export const metadata: Metadata = {
  title: "Resume",
};

function formatDateRange(start: string, end: string | null): string {
  const startDate = new Date(start);
  const startStr = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  if (!end) return `${startStr} — Present`;
  const endDate = new Date(end);
  const endStr = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${startStr} — ${endStr}`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ResumePage() {
  const experience = getExperience();
  const education = getEducation();

  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h1 className="text-4xl font-bold mb-16">Resume</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-8">Experience</h2>
            {experience.map((exp, i) => (
              <ResumeItem
                key={i}
                title={exp.title}
                subtitle={exp.company}
                date={formatDateRange(exp.startDate, exp.endDate)}
                description={exp.description}
                highlights={exp.highlights}
              />
            ))}
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold mb-8">Education</h2>
            {education.map((edu, i) => (
              <ResumeItem
                key={i}
                title={edu.title}
                subtitle={edu.institution}
                date={formatDate(edu.date)}
                description={edu.description}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
```

**Step 3: Verify**

```bash
npm run dev
```

Navigate to `/resume`. Expected: Two-column layout with experience (left) and education (right). Timeline dots. Correct date formatting.

**Step 4: Commit**

```bash
git add src/components/resume/ src/app/resume/
git commit -m "feat: add resume page with experience and education timelines"
```

---

## Task 10: Contact Page + Server Action

Build the contact form (client component), Zod validation, Server Action for Postmark, and contact details.

**Files:**
- Create: `src/app/contact/action.ts`
- Create: `src/lib/email.ts`
- Create: `src/components/contact/contact-form.tsx`
- Create: `src/app/contact/page.tsx`

**Step 1: Create src/lib/email.ts**

```ts
import { ServerClient } from "postmark";

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

  await client.sendEmail({
    From: process.env.MAIL_FROM!,
    To: process.env.MAIL_TO!,
    ReplyTo: email,
    Subject: `🤘 Message from ${name} — kuba.rocks contact form`,
    HtmlBody: `
      <h2>New message from kuba.rocks</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `,
    MessageStream: "outbound",
  });
}
```

**Step 2: Create src/app/contact/action.ts**

```ts
"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  mapleSyrup: z.string().max(0, "Bot detected"),
});

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    mapleSyrup: formData.get("mapleSyrup") as string,
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await sendContactEmail(result.data);
    return { success: true };
  } catch {
    return { error: "Failed to send message. Please try again." };
  }
}
```

**Step 3: Create src/components/contact/contact-form.tsx**

```tsx
"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/action";

const initialState: ContactState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-xl font-semibold mb-2">Message sent!</p>
        <p className="text-muted">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-500">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none resize-y"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-sm text-red-500">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="mapleSyrup"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-8 py-3 text-accent-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

**Step 4: Create src/app/contact/page.tsx**

```tsx
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: "Contact",
};

const contactLinks = [
  { href: "mailto:hello@kuba.rocks", icon: MdEmail, label: "hello@kuba.rocks" },
  {
    href: "https://github.com/KubaRocks",
    icon: FaGithub,
    label: "KubaRocks",
  },
  {
    href: "https://www.linkedin.com/in/kubaflorczuk/",
    icon: FaLinkedin,
    label: "kubaflorczuk",
  },
  {
    href: "https://twitter.com/KubaRocks",
    icon: FaXTwitter,
    label: "@KubaRocks",
  },
];

export default function ContactPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-muted mb-16 max-w-2xl">
          Have a project in mind or want to say hello? Drop me a message.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ContactForm />

          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Other ways to reach me</h2>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

**Step 5: Create .env.local (do NOT commit)**

```
POSTMARK_SERVER_TOKEN=your-token-here
MAIL_FROM=noreply@kuba.rocks
MAIL_TO=hello@kuba.rocks
```

**Step 6: Verify**

```bash
npm run dev
```

Navigate to `/contact`. Expected: Form renders with name, email, message fields. Submit shows validation errors for empty fields. Honeypot field is invisible. Success state renders after submission (will fail in dev without valid Postmark token, but the UI flow should work).

**Step 7: Commit**

```bash
git add src/app/contact/ src/lib/email.ts src/components/contact/
git commit -m "feat: add contact page with server action and Postmark email"
```

---

## Task 11: 404 Page

**Files:**
- Create: `src/app/not-found.tsx`

**Step 1: Create src/app/not-found.tsx**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-accent">404</h1>
      <p className="mt-4 text-xl text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Go home
      </Link>
    </main>
  );
}
```

**Step 2: Verify**

```bash
npm run dev
```

Navigate to `/nonexistent`. Expected: 404 page with large "404" text and link home.

**Step 3: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add custom 404 page"
```

---

## Task 12: Build Verification + Cleanup

Ensure the project builds cleanly, lint passes, and clean up any old files.

**Files:**
- Potentially modify: various files based on build errors

**Step 1: Run lint**

```bash
npm run lint
```

Fix any ESLint errors.

**Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Note any warnings and fix them.

**Step 3: Clean up any leftover old files**

Check for any old files that should have been removed in Task 1:

```bash
ls -la
```

Remove: `prisma/`, `scripts/`, `.idea/`, `docker-compose.yaml`, any old config files that weren't caught.

**Step 4: Verify .gitignore includes**

```
node_modules/
.next/
.env.local
.env*.local
```

**Step 5: Final visual check**

```bash
npm run dev
```

Walk through all pages:
- `/` — All 5 sections render, data loads correctly
- `/resume` — Experience and education columns, timeline markers
- `/contact` — Form works, validation shows, contact links visible
- `/nonexistent` — 404 page renders
- Toggle OS dark mode — all pages switch correctly

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: build verification and cleanup"
```

---

## Task 13: Visual Design Pass

> **IMPORTANT:** This task is where the "complete redesign" happens. Invoke the `frontend-design` skill to explore style guides and generate a cohesive visual design for the entire site. Apply the resulting design tokens, typography, colors, spacing, and component styling across all files.

**Scope:**
- Update `src/app/globals.css` — final color palette, typography scale, spacing for both light and dark modes
- Update all component files — apply the new design via Tailwind classes
- Font choice — potentially swap Geist for something with more personality (update layout.tsx)
- Responsive refinements — ensure all breakpoints look polished

**Step 1:** Invoke `frontend-design` skill with full context about the site (3 pages, portfolio, developer, Warsaw, redesign).

**Step 2:** Apply the resulting design system to globals.css `@theme` block.

**Step 3:** Update each component file with the new Tailwind classes.

**Step 4:** Test all pages in both light and dark mode at mobile, tablet, and desktop widths.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: apply complete visual redesign"
```
