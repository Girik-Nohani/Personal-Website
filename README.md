# Girik Nohani — Portfolio Website

A self-service, content-editable personal portfolio for Girik Nohani (cybersecurity / digital forensics). Built so every piece of content — projects, writeups, testimonials, availability status, section copy — can be managed independently through an embedded Sanity Studio, with zero-downtime updates and no redeploys required for content changes.

## Tech Stack

- **Framework:** Next.js 16.3 (App Router)
- **CMS:** Sanity v6, embedded Studio at `/studio`
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`)
- **Language:** TypeScript
- **Email:** Resend (contact form)
- **Hosting:** Vercel
- **Icons:** `lucide-react` (UI icons), `react-icons/fa6` (brand/social icons)
- **Fonts:** Jost (`font-display`), Exo 2 (`font-mono`), Roboto (`font-sans`)

## Features

- Single scrolling homepage: Hero, About, Education, Certifications, Skills, Experience, Projects, Writeups, Testimonials, Contact
- Standalone case study pages (`/projects/[slug]`) and writeup pages (`/writeups/[slug]`), both rendering rich Portable Text content (headings, lists, bold/italic/underline, links, images, code blocks, dividers)
- Fully self-service content editing — every section, list, and singleton is Sanity-editable, with hardcoded fallback defaults so the site never breaks if a document isn't published yet
- Zero-downtime publishing via an on-demand ISR revalidation webhook (`/api/revalidate`) — content edits go live within seconds, no rebuild or redeploy
- Contact form with server-side validation, rate limiting, and honeypot spam protection, delivered via Resend

## ⚠️ Important: Development & Build Commands

This project **must** use the `--webpack` flag for both dev and build. There is a known incompatibility between Sanity Studio's embedded editor and Next.js's default Turbopack bundler.

```bash
npm run dev:webpack     # NOT `npm run dev` — Studio will not work correctly under Turbopack
npm run build:webpack   # NOT `npm run build` — required for production builds too
npm run start
```

If deploying to Vercel, the **Build Command must be manually overridden** in Project Settings → Build & Development Settings to `npm run build:webpack`. Vercel's default (`next build`) will not work correctly for this project.

## Getting Started

**Requirements:** Node.js 20+

```bash
# 1. Clone and install
git clone <repo-url>
cd personal-website
npm install

# 2. Set up environment variables
cp .env.example .env.local
# fill in the real values — see Environment Variables below

# 3. Run the dev server
npm run dev:webpack
```

Open [http://localhost:3000](http://localhost:3000) for the site, and [http://localhost:3000/studio](http://localhost:3000/studio) for the CMS.

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project connection |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_API_TOKEN` | Read token for server-side fetches |
| `SANITY_WEBHOOK_SECRET` | Verifies incoming revalidation webhooks |
| `RESEND_API_KEY` | Sends contact form emails |
| `CONTACT_RECIPIENT_EMAIL` | Fallback recipient if not set via `contactSettings` in Studio |

See `.env.example` for the template. Never commit `.env.local` — it's gitignored, and should stay that way.

## Editing Content

All content lives in Sanity Studio at `/studio`, gated by Sanity account login (no separate password). Editing and publishing content is instant and requires no code changes or redeploy. Adding a **new content type** or changing a **field structure**, however, requires editing the schema files under `studio/schemaTypes/` and a real deploy — that's a developer task, not something to do from inside Studio alone.

After any schema change:
```bash
npx sanity schema extract && npx sanity typegen generate
```

## Backups

Sanity's free tier has no automated backups. Run this periodically (and always before a major content change):
```bash
npx sanity dataset export production backup-$(date +%Y-%m-%d).tar.gz
```

## Project Structure
app/
├─ (site)/ # Public-facing routes
│ ├─ page.tsx # Homepage — assembles all sections
│ ├─ projects/[slug]/ # Case study pages
│ ├─ writeups/[slug]/ # Writeup pages
│ └─ layout.tsx
├─ components/
│ ├─ layout/ # Nav, Footer, MobileStatusBar
│ ├─ sections/ # One component per homepage section
│ └─ ui/ # Shared building blocks (cards, headings, etc.)
├─ studio/[[...tool]]/ # Embedded Sanity Studio
└─ api/
├─ revalidate/ # ISR webhook receiver
└─ contact/ # Contact form → Resend

studio/
└─ schemaTypes/ # All Sanity schema definitions

lib/
├─ sanity/ # Client + GROQ queries
└─ section-headings-defaults.ts # Fallback content if Studio singleton isn't published

types/
└─ content.ts # Shared TypeScript interfaces (schema ⟷ frontend contract)

## Deployment

Hosted on Vercel. Content changes deploy themselves automatically via the revalidation webhook — only code/schema changes require a real deploy through Git push.

---

Private project — all rights reserved.