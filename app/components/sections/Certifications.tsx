"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SubSectionHeading } from "@/components/ui/SubSectionHeading";
import type { Certification, SubSectionHeadingContent } from "@/types/content";

interface CertificationsProps {
  certifications: Certification[];
  heading: SubSectionHeadingContent;
}

const ROTATE_INTERVAL_MS = 7000;

const CORNER_CLASSES = [
  "-left-px -top-px rounded-tl-md border-l-2 border-t-2",
  "-right-px -bottom-px rounded-br-md border-r-2 border-b-2",
];

export function Certifications({
  certifications,
  heading,
}: CertificationsProps) {
  const sorted = useMemo(
    () => certifications.slice().sort((a, b) => a.order - b.order),
    [certifications],
  );

  const [activeId, setActiveId] = useState(sorted[0]?._id ?? "");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = sorted.find((c) => c._id === activeId) ?? sorted[0];

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (sorted.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveId((current) => {
        const i = sorted.findIndex((c) => c._id === current);
        const nextIndex = i === -1 ? 0 : (i + 1) % sorted.length;
        return sorted[nextIndex]._id;
      });
    }, ROTATE_INTERVAL_MS);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    startInterval();
  };

  return (
    <div className="bg-background lg:py-xl">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        <SubSectionHeading align="center" {...heading} />

        {!sorted.length ? (
          <p className="mt-lg text-center text-text-muted">
            More certifications coming soon.
          </p>
        ) : (
          <div className="mt-xl grid grid-cols-1 gap-sm lg:grid-cols-[1fr_1.3fr] lg:items-stretch lg:gap-md">
            {/* List column */}
            <ul className="flex flex-col gap-sm lg:max-h-cert-list lg:overflow-y-auto lg:scrollbar-none lg:scroll-fade-y lg:py-scroll-fade-inset">
              {sorted.map((cert) => {
                const isActive = cert._id === active._id;
                return (
                  <li key={cert._id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(cert._id)}
                      aria-current={isActive}
                      className={cn(
                        "w-full rounded-r-lg border-l-4 px-md py-sm text-left transition-colors duration-500 ease-in-out",
                        isActive
                          ? "border-l-accent-teal bg-surface-alt"
                          : "border-l-transparent bg-surface hover:bg-surface-alt/60",
                      )}
                    >
                      <p
                        
                        className={cn(
                          "font-display text-body",
                          isActive
                            ? "font-semibold text-accent-teal"
                            : "font-normal text-text-tertiary",
                        )}
                      >
                        {cert.title}
                      </p>
                      <p
                        className={cn(
                          "mt-xs font-mono text-detail",
                          isActive ? "text-text-tertiary" : "text-text-muted",
                        )}
                      >
                        {isActive
                          ? `${cert.issuer} · ${cert.year}`
                          : cert.issuer}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Detail column */}
            <div
              key={active._id}
              aria-live="polite"
              aria-atomic="true"
              className="relative rounded-lg border border-accent-teal/15 bg-surface p-md motion-safe:animate-cert-content-fade"
            >
              {CORNER_CLASSES.map((pos, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute hidden h-8 w-8 border-accent-teal motion-safe:block motion-safe:animate-bracket-corner",
                    pos,
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}

              <div className="h-full overflow-y-auto scrollbar-none scroll-fade-y py-scroll-fade-inset lg:max-h-cert-list">
                <span className="inline-block py-1 font-mono text-detail font-bold tracking-wide text-text-quaternary">
                  {active.issuer.toUpperCase()} · {active.year}
                </span>
                <h4
                  title={active.title}
                  className="mt-sm font-display text-title-sm font-semibold text-accent-teal"
                >
                  {active.title}
                </h4>
                <p className="mt-sm font-display text-body font-normal text-text-tertiary">
                  {active.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
