// app/(site)/writeups/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { WRITEUP_SLUGS_QUERY, WRITEUP_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { CaseStudyBody } from '@/components/ui/CaseStudyBody'
import { formatProjectDate } from '@/lib/utils'
import type { Writeup } from '@/types/content'

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(WRITEUP_SLUGS_QUERY)
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const writeup = await client.fetch<Writeup>(WRITEUP_BY_SLUG_QUERY, { slug })
  if (!writeup) return {}

  return {
    title: `${writeup.title} — Girik Nohani`,
    description: writeup.excerpt || `A writeup by Girik Nohani: ${writeup.title}`,
    openGraph: {
      title: writeup.title,
      description: writeup.excerpt || `A writeup by Girik Nohani: ${writeup.title}`,
    },
  }
}

export default async function WriteupPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const writeup = await client.fetch<Writeup>(WRITEUP_BY_SLUG_QUERY, { slug })

  if (!writeup) notFound()

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-xs font-mono text-detail text-text-tertiary transition-colors hover:text-accent-teal"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>

        <div className="mt-lg flex flex-col gap-sm">
          <span className="font-mono text-detail text-text-muted">
            {formatProjectDate(writeup.publishedDate)}
          </span>

          <h1 className="font-display text-title-lg font-semibold uppercase text-accent-teal">
            {writeup.title}
          </h1>

          {writeup.excerpt && (
            <p className="max-w-3xl font-display text-body text-text-tertiary">
              {writeup.excerpt}
            </p>
          )}
        </div>

        <div className="mt-xl">
          <CaseStudyBody value={writeup.writeupBody} />
        </div>
      </div>
    </main>
  )
}