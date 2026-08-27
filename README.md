# Girik Nohani — Portfolio Website

A single-page scrolling portfolio site for Girik Nohani, a cybersecurity and digital forensics professional. Built with full self-service content editing so Girik can update text, images, projects, writeups, and testimonials without ever needing a developer or a redeploy.

**Live site:** https://personal-website-three-theta-48.vercel.app

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3 (App Router) |
| CMS | Sanity v6 (embedded Studio at `/studio`) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| Language | TypeScript |
| Email | Resend (contact form) |
| Hosting | Vercel Hobby (free tier) |

---

## Project Structure

```
app/
├─ (site)/                  ← public-facing routes
│  ├─ layout.tsx
│  ├─ page.tsx               ← single scrolling homepage
│  ├─ projects/[slug]/       ← case study pages
│  └─ writeups/[slug]/       ← writeup detail pages
├─ api/
│  └─ revalidate/            ← Sanity webhook receiver (ISR)
├─ components/
│  ├─ layout/                ← Nav, Footer, MobileStatusBar
│  ├─ sections/               ← one file per homepage section
│  └─ ui/                     ← shared reusable pieces
├─ studio/
│  └─ [[...tool]]/            ← embedded Sanity Studio route
studio/
└─ schemaTypes/               ← all Sanity document schemas
lib/
├─ sanity/                    ← client, image URL builder, GROQ queries
├─ social-icons.tsx
├─ section-headings-defaults.ts
└─ utils.ts
types/
└─ content.ts                 ← single source of truth for content shapes
```

---

## Local Development

**Requirements:** Node.js 20+

```bash
# Install dependencies
npm install

# Copy env template and fill in real values (see Environment Variables below)
cp .env.example .env.local

# Run the dev server
npm run dev:webpack
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/studio` for the CMS.

> ⚠️ **Always use the `:webpack` script variants** (`dev:webpack` / `build:webpack`), never the default `next dev` / `next build`. The embedded Sanity Studio has a known incompatibility with Turbopack that causes it to fail silently or show a blank page. This applies locally and in production — see [Deployment](#deployment) below.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project connection (`13n4q1pi`) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_WEBHOOK_SECRET` | Verifies incoming Sanity revalidation webhooks |
| `RESEND_API_KEY` | Sends contact form emails |

Real values live only in `.env.local` (gitignored) and in Vercel's Environment Variables dashboard — never commit real secrets.

---

## Content Editing (for Girik)

1. Go to `/studio` on the live site and log in with your Sanity account.
2. Edit any section — About, Education, Certifications, Skills, Experience, Projects, Testimonials, Writeups, Contact settings.
3. Click **Publish**.
4. The live site updates automatically within a few seconds — no redeploy, no downtime.

**A few things worth knowing:**
- Editing content is instant and safe to do anytime. Adding a *new type* of content or changing how a section is structured requires a code change from a developer — that's different from day-to-day editing.
- Don't regenerate the webhook secret in Sanity without also updating it in Vercel's environment variables, or live content updates will silently stop working until both sides match again.
- Sanity's free plan has no automated backups. Run this occasionally (monthly is plenty), especially before any large content change:
  ```bash
  npx sanity dataset export production backup-$(date +%Y-%m-%d).tar.gz
  ```

---

## How Zero-Downtime Editing Works

1. Content is edited and published in Sanity Studio.
2. Sanity fires a webhook to `/api/revalidate`.
3. The signature is verified using `SANITY_WEBHOOK_SECRET`.
4. Next.js runs `revalidatePath()` for the homepage, and additionally for the specific `/projects/[slug]` or `/writeups/[slug]` page if that's what changed.
5. The page regenerates in the background within seconds. The site never goes down and never needs a rebuild for content changes — only actual code/design changes require a real deployment.

---

## Deployment (Vercel)

The project is connected to this GitHub repo via Vercel's Git integration, deployed under Girik's Vercel account.

**Critical build setting:** In Vercel → Project Settings → Build & Development Settings, the Build Command **must be overridden** to:
```
npm run build:webpack
```
The default `next build` uses Turbopack, which breaks the embedded Sanity Studio at `/studio`. This override must be re-verified after any change to Vercel's project settings or Git integration, since it can silently reset.

**Required Sanity dashboard configuration** (outside the codebase, easy to miss):
- **CORS Origins** (Manage → API → CORS Origins): must include both `http://localhost:3000` and the production Vercel URL, with credentials allowed.
- **Webhook** (Manage → API → Webhooks): points to `https://<production-url>/api/revalidate`, method `POST`, triggers on Create/Update/Delete, projection `{_type, "slug": slug.current}`, with the **Secret** field set to match `SANITY_WEBHOOK_SECRET` exactly — without this, Sanity won't sign requests and the endpoint will reject them.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev:webpack` | Local dev server (Studio-safe) |
| `npm run build:webpack` | Production build (Studio-safe — always use this, not `next build`) |
| `npm run start` | Serve a production build locally |
| `npx sanity schema extract && npx sanity typegen generate` | Regenerate TypeScript types after a schema change |

---

## Known Limitations / Deferred Items

- No syntax highlighting for code blocks in case study/writeup bodies yet (deferred — would need shiki or Prism).
- Sanity toolchain has a handful of moderate/high npm audit findings in transitive dependencies (`js-yaml`/`smol-toml`), not exploitable through the live site. Fixing requires a breaking Sanity version upgrade — deferred to its own session.
- `eslint-config-next` + current `eslint` combination has a known circular-JSON crash in certain lint configurations — deferred, doesn't affect the build or runtime.

---

## License

Private project built for Girik Nohani. Not licensed for reuse.