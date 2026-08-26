import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { cn, formatProjectDate } from '@/lib/utils'
import { Tag } from './Tag'
import type { Project } from '@/types/content'

interface ProjectCardProps {
  project: Project
  reverse?: boolean
}

export function ProjectCard({ project, reverse }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-md rounded-xl sm:py-md transition-colors duration-300 hover:bg-surface lg:p-md lg:flex-row lg:items-start lg:gap-lg',
        reverse && 'lg:flex-row-reverse'
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-project-image shrink-0 overflow-hidden rounded-lg lg:w-(--size-project-image-w) lg:h-(--size-project-image-h)">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-eyebrow font-semibold uppercase tracking-wider text-accent-yellow">
            {project.category}
          </span>
          <span className="font-mono text-detail font-normal text-text-muted">
            {formatProjectDate(project.date)}
          </span>
        </div>

        <h3 className="text-title-sm font-display font-semibold uppercase text-accent-teal">
          {project.title}
        </h3>

        <p className="font-display text-body font-normal text-text-tertiary">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-(--spacing-tag-gap)">
          {project.techStack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>

        <div className="mt-sm flex items-center gap-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="font-mono text-body font-semibold text-accent-teal hover:underline"
          >
            View Case Study
          </Link>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the live version of ${project.title}`}
              className="text-accent-teal transition-opacity hover:opacity-80"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}