import { SubSectionHeading } from '@/components/ui/SubSectionHeading'
import { SkillAccordionItem } from '@/components/ui/SkillAccordionItem'
import type { SkillCategory, SubSectionHeadingContent } from '@/types/content'

interface SkillsProps {
  categories: SkillCategory[]
  heading: SubSectionHeadingContent
}

export function Skills({ categories, heading }: SkillsProps) {
  return (
    <div className="bg-surface w-full lg:py-xl">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-xl py-xl">
        <SubSectionHeading {...heading} align="center" accentSlash />

        {categories.length === 0 ? (
          <p className="mt-lg text-center text-text-muted">More to come soon.</p>
        ) : (
          <div className="flex flex-col gap-md">
            {categories.map((category, i) => (
              <SkillAccordionItem key={category.id} category={category} defaultOpen={i === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}