"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types/content";

interface SkillAccordionItemProps {
  category: SkillCategory;
  defaultOpen?: boolean;
}

export function SkillAccordionItem({
  category,
  defaultOpen = false,
}: SkillAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `skill-panel-${category.id}`;

  return (
    <div className="w-full max-w-(--size-skills-card-max-w) mx-auto rounded-(--radius-skills-card) bg-surface-alt p-md">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className=" flex w-full items-center gap-sm text-left
                    rounded-(--radius-skills-header) border border-accent-teal
                  bg-surface-alt px-sm sm:px-md py-sm
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt"
      >
        {/* Toggle indicator: chevron (closed) morphs into a small teal cross (open) */}
        <span className="relative shrink-0 h-(--size-skills-arrow) w-(--size-skills-arrow)">
          <ChevronDown
            className={cn(
              "absolute inset-0 m-auto text-text-primary transition-all duration-300 ease-in-out motion-reduce:transition-none",
              open
                ? "opacity-0 scale-50 rotate-180"
                : "opacity-100 scale-100 rotate-0",
            )}
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute left-1/2 top-1/2 h-(--size-skills-toggle-bar-h) w-(--size-skills-toggle-bar-w) -translate-x-1/2 -translate-y-1/2 rounded-full",
              "origin-center transition-all duration-300 ease-in-out motion-reduce:transition-none",
              open
                ? "rotate-45 opacity-100 bg-accent-teal"
                : "rotate-0 opacity-0 bg-accent-yellow",
            )}
          />
          <span
            className={cn(
              "absolute left-1/2 top-1/2 h-(--size-skills-toggle-bar-h) w-(--size-skills-toggle-bar-w) -translate-x-1/2 -translate-y-1/2 rounded-full",
              "origin-center transition-all duration-300 ease-in-out motion-reduce:transition-none",
              open
                ? "-rotate-45 opacity-100 bg-accent-teal"
                : "rotate-0 opacity-0 bg-accent-yellow",
            )}
          />
        </span>

        {/* Title + subtitle */}
        <span className="flex flex-1 flex-col min-w-0">
          <span className="font-display font-semibold text-title-sm text-accent-teal truncate">
            {category.categoryName}
          </span>
          {category.description && (
            <span className="scrollbar-none block overflow-x-auto whitespace-nowrap font-mono font-light text-detail text-text-tertiary">
              {category.description}
            </span>
          )}
        </span>

        {/* Right gradient line — desktop only, avoids crowding at narrow widths */}
        <span
          className="hidden md:block h-(--size-skills-toggle-bar-h) w-skills-line shrink-0 bg-linear-to-r from-accent-yellow to-accent-teal"
          aria-hidden="true"
        />
      </button>

      {/* Grid 0fr→1fr trick: animates height without measuring scrollHeight in JS */}
      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <ul className="mt-md space-y-xs pl-sm">
            {category.skills.map((skill) => (
              <li
                key={skill.name}
                className="font-mono font-normal text-body text-text-tertiary list-disc list-inside"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
