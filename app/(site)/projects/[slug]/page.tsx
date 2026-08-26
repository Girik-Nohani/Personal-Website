// app/projects/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { PROJECT_SLUGS_QUERY, PROJECT_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { SubSectionHeading } from '@/components/ui/SubSectionHeading'
import { Tag } from '@/components/ui/Tag'
import { CaseStudyBody } from '@/components/ui/CaseStudyBody'
import { formatProjectDate } from '@/lib/utils'
import type { Project } from '@/types/content'

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(PROJECT_SLUGS_QUERY)
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await client.fetch<Project>(PROJECT_BY_SLUG_QUERY, { slug })
  if (!project) return {}

  return {
    title: `${project.title} — Girik Nohani`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.coverImage],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await client.fetch<Project>(PROJECT_BY_SLUG_QUERY, { slug })

  if (!project) notFound()

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-xs font-mono text-detail text-text-tertiary hover:text-accent-teal transition-colors"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>

        <div className="relative mt-lg aspect-project-image w-full overflow-hidden rounded-lg">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-lg flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-eyebrow font-semibold uppercase tracking-wider text-accent-yellow">
              {project.category}
            </span>
            <span className="font-mono text-detail text-text-muted">
              {formatProjectDate(project.date)}
            </span>
          </div>

          <h1 className="font-display text-title-lg font-semibold uppercase text-accent-teal">
            {project.title}
          </h1>

          <p className="max-w-3xl font-display text-body text-text-tertiary">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-(--spacing-tag-gap)">
            {project.techStack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-xs inline-flex w-fit items-center gap-xs font-mono text-body font-semibold text-accent-teal hover:underline"
            >
              Visit Live Site <ExternalLink size={16} />
            </a>
          )}
        </div>

        {project.caseStudyBody?.length > 0 && (
          <div className="mt-xl">
            <SubSectionHeading
              eyebrow="Case Study"
              title={project.bodyHeading || 'Overview'}
              align="left"
            />
            <div className="mt-lg">
              <CaseStudyBody value={project.caseStudyBody} />
            </div>
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-xl grid grid-cols-1 gap-md sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-lg">
                <Image src={img.url} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}