# kuba.rocks Modernization Design

## Summary

Complete redesign and tech stack migration of kuba.rocks personal portfolio site. Moving from Next.js 12 + Prisma + Styled Components to Next.js 15 (App Router) + Tailwind v4 with fully static data. Same 3-page structure (Home, Resume, Contact), fresh visual design, dark mode support.

## Target Stack

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Data:** JSON5 files (structured data) + MDX (rich text content)
- **Contact form:** Server Action + Postmark email
- **Validation:** Zod
- **Deployment:** Vercel (existing)
- **Dark mode:** System preference via `prefers-color-scheme`

## Project Structure

```
kuba-rocks/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata, nav, footer)
│   │   ├── page.tsx            # Home page (server component)
│   │   ├── resume/
│   │   │   └── page.tsx        # Resume page (server component)
│   │   ├── contact/
│   │   │   ├── page.tsx        # Contact page
│   │   │   └── action.ts       # Server Action for Postmark email
│   │   ├── globals.css         # Tailwind v4 imports + @theme config
│   │   └── not-found.tsx       # 404 page
│   ├── components/
│   │   ├── layout/             # Header, Footer, Nav, Logo
│   │   ├── home/               # Hero, Technologies, Testimonials, Clients, FunFacts
│   │   ├── resume/             # ResumeItem, Timeline
│   │   └── contact/            # ContactForm (client component)
│   └── lib/
│       ├── data.ts             # JSON5/MDX file reading utilities
│       └── email.ts            # Postmark client
├── content/
│   └── bio.mdx                 # About/bio rich text content
├── data/
│   ├── testimonials.json5
│   ├── clients.json5
│   ├── experience.json5
│   ├── education.json5
│   └── technologies.json5
├── public/                     # Static assets (logos, photos, CV PDF)
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Data Layer

### JSON5 files (structured collections)

**testimonials.json5** — 4 entries:
- name, title, photo (path), content

**clients.json5** — 21 entries:
- name, logo (path)

**experience.json5** — 9 entries:
- company, title, description, highlights[], startDate, endDate (nullable)

**education.json5** — 15 entries:
- institution, title, description, date

**technologies.json5** — tech stack entries:
- name, description

### MDX files (rich text)

**content/bio.mdx** — hero bio text, supports embedded React components if needed.

### Data loading

Utility functions in `src/lib/data.ts` that read and parse JSON5 files using the `json5` npm package. Called directly in server components at render time. No API layer, no client-side data fetching.

## Pages

### Home (`/`)
- Hero section with bio (from MDX), name, title, CV download, contact CTA
- Technologies section
- Testimonials grid
- Clients showcase
- Fun Facts (years of experience, working hours, coffee consumed, GitHub repos — calculated at render time from dates, same logic as current `useFunFacts`)

### Resume (`/resume`)
- Two-column layout: Experience + Education
- Timeline-style entries from JSON5 data

### Contact (`/contact`)
- Contact form (client component using `useActionState`)
- Contact details / social links
- No Google Maps (removed)

### 404 (`/not-found`)
- Custom not-found page

## Contact Form

- Client component with `"use client"`
- `useActionState` (React 19) to call Server Action
- Zod validation: name (string), email (email), message (string, min 10), mapleSyrup (honeypot, must be empty)
- Server Action in `src/app/contact/action.ts` calls Postmark API
- Returns `{ success: true }` or `{ error: "message" }`
- Environment variables: `POSTMARK_SERVER_TOKEN`, `MAIL_FROM`, `MAIL_TO`

## Styling

- Tailwind v4 with CSS-first configuration (`@theme` block in `globals.css`)
- Design tokens (colors, fonts, spacing) as CSS custom properties
- Dark mode via `prefers-color-scheme` media strategy (follows OS setting)
- Responsive: mobile-first with Tailwind default breakpoints (`sm`, `md`, `lg`, `xl`)
- Max content width: ~1280px
- Fonts loaded via `next/font`
- Visual design to be explored during implementation (complete redesign)

## Dependency Changes

### Removed (no replacement)
- Prisma + MySQL (replaced by JSON5/MDX files)
- tRPC (server components read files directly)
- NextAuth (no auth needed)
- Jotai (no client state management)
- React Query (no async client data fetching)
- Styled Components (replaced by Tailwind v4)
- Google Maps React (dropped)
- dayjs (use native Intl or simple math)
- SuperJSON (was for tRPC)

### Kept
- `postmark` — email sending for contact form
- `zod` — contact form validation
- `react-icons` — icons

### New
- `json5` — parse JSON5 data files
- `@next/mdx` + `@mdx-js/react` — MDX support
- `@tailwindcss/postcss` — Tailwind v4

## Data Migration

- Extract content from `prisma/initial/` seed files
- Scrape live site (https://kuba.rocks) for any missing data
- Write into JSON5/MDX files
- Copy static assets (logos, photos, CV PDF) to `public/`
