// lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2025-02-01'

if (!projectId) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Set it in .env.local — see .env.example.'
  )
}

// useCdn: false — we rely on on-demand ISR (revalidatePath via the Sanity
// webhook, see app/api/revalidate in Phase 5) rather than time-based
// freshness, so every fetch that does run should return the latest
// published content rather than a possibly-stale CDN-cached copy.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // Only needed if the dataset is private. This project's dataset is
  // public (default for a single-editor portfolio, see build plan §3.1),
  // so SANITY_API_TOKEN is optional — included for forward-compatibility.
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
})