import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubSectionHeading } from "@/components/ui/SubSectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project, SubSectionHeadingContent } from '@/types/content'

interface ProjectsProps {
  projects: Project[]
  heading: SubSectionHeadingContent
}

export function Projects({ projects, heading }: ProjectsProps) {
  return (
    <div className="w-full bg-background lg:py-xl">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        <SectionHeading number="02" title="Projects" />
        <div className="mt-xl">
          <SubSectionHeading {...heading} align="center" />

          {projects.length === 0 ? (
            <p className="mt-lg text-center font-display text-text-muted">
              More projects coming soon.
            </p>
          ) : (
            <div className="flex flex-col gap-xl mt-xl">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  reverse={i % 2 === 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
