"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubSectionHeading } from "@/components/ui/SubSectionHeading";
import { DoubleDivider } from "@/components/ui/DoubleDivider";
import type { Testimonial, SubSectionHeadingContent } from "@/types/content";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  heading: SubSectionHeadingContent;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const AUTO_ADVANCE_MS = 5000;

export function TestimonialsCarousel({
  testimonials,
  heading,
}: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (testimonials.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setDirection("next");
      setHasAnimated(true);
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  const headingBlock = <SubSectionHeading {...heading} align="left" />;

  if (!testimonials.length) {
    return (
      <div className="w-full bg-background">
        <div className="mx-auto max-w-6xl px-6">
          {headingBlock}
          <p className="mt-lg text-text-tertiary">
            More testimonials coming soon.
          </p>
        </div>
      </div>
    );
  }

  const current = testimonials[index];

  const goNext = () => {
    setDirection("next");
    setHasAnimated(true);
    setIndex((i) => (i + 1) % testimonials.length);
    startInterval();
  };
  const goPrev = () => {
    setDirection("prev");
    setHasAnimated(true);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    startInterval();
  };

  return (
    <div className="w-full bg-surface lg:py-xl">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        {headingBlock}

        <DoubleDivider orientation="horizontal" />

        <div
          className="flex flex-col lg:flex-row lg:items-stretch"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
          }}
          tabIndex={0}
        >
          {/* Left: avatar + comment */}
          <div className="flex flex-1 flex-col gap-lg pt-xl md:pt-lg sm:flex-row sm:items-start">
            {/* Avatar with corner brackets */}
            <div className="relative aspect-square w-full shrink-0 sm:aspect-auto sm:h-(--size-testimonial-avatar) sm:w-(--size-testimonial-avatar)">
              <span className="absolute -left-2 -top-2 z-0 h-(--size-testimonial-bracket) w-(--size-testimonial-bracket) border-l-2 border-t-2 border-accent-yellow" />
              <span className="absolute -right-2 -top-2 z-0 h-(--size-testimonial-bracket) w-(--size-testimonial-bracket) border-r-2 border-t-2 border-accent-yellow" />
              <span className="absolute -left-2 -bottom-2 z-0 h-(--size-testimonial-bracket) w-(--size-testimonial-bracket) border-b-2 border-l-2 border-accent-yellow" />
              <span className="absolute -right-2 -bottom-2 z-0 h-(--size-testimonial-bracket) w-(--size-testimonial-bracket) border-b-2 border-r-2 border-accent-yellow" />
              {current.avatar ? (
                <Image
                  src={current.avatar}
                  alt={current.name}
                  fill
                  className="relative z-10 object-cover"
                />
              ) : (
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-xs bg-icon-bg">
                  <Fingerprint
                    className="h-(--size-testimonial-fallback-icon-mobile) w-(--size-testimonial-fallback-icon-mobile) text-accent-teal sm:h-(--size-testimonial-fallback-icon) sm:w-(--size-testimonial-fallback-icon)"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-eyebrow font-bold tracking-wider text-text-quaternary">
                    <span className="text-accent-yellow">&gt;</span> {getInitials(current.name)}
                  </span>
                </div>
              )}
            </div>

            <div
              key={index}
              className={cn(
                "flex flex-col gap-sm pt-xs",
                hasAnimated &&
                  (direction === "next"
                    ? "testimonial-slide-next"
                    : "testimonial-slide-prev"),
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="font-display text-body font-normal text-text-tertiary">
                {current.quote}
              </p>
              <div className="flex flex-col gap-xs">
                <p className="font-display text-title-sm font-semibold tracking-wider text-accent-teal">
                  {current.name}
                </p>
                <p className="font-mono text-detail font-semibold text-text-quaternary">
                  {current.role}
                </p>
              </div>
            </div>
          </div>

          <DoubleDivider orientation="vertical" />

          {/* Right: arrows + index */}
          <div className="mt-lg flex flex-col items-center gap-sm lg:mt-0 lg:justify-center">
            <div className="flex gap-sm">
              <button
                onClick={goPrev}
                aria-label="Previous testimonial"
                className={cn(
                  "flex h-(--size-testimonial-arrow-btn) w-(--size-testimonial-arrow-btn) items-center justify-center rounded-lg border transition-colors focus-visible:outline-none",
                  direction === "prev"
                    ? "border-text-primary text-text-primary"
                    : "border-text-muted text-text-muted",
                )}
              >
                <ChevronLeft className="h-(--size-testimonial-arrow-icon) w-(--size-testimonial-arrow-icon)" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next testimonial"
                className={cn(
                  "flex h-(--size-testimonial-arrow-btn) w-(--size-testimonial-arrow-btn) items-center justify-center rounded-lg border transition-colors focus-visible:outline-none",
                  direction === "next"
                    ? "border-text-primary text-text-primary"
                    : "border-text-muted text-text-muted",
                )}
              >
                <ChevronRight className="h-(--size-testimonial-arrow-icon) w-(--size-testimonial-arrow-icon)" />
              </button>
            </div>
            <span className="font-mono text-body font-bold text-text-muted">
              {index + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
